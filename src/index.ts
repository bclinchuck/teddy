import express from 'express';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import SimplePeer, { SignalData } from 'simple-peer';
import wrtc from '@koush/wrtc';
import DetectionService from './detection';

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '../public/gesture.html'));
});

io.on('connection', async (socket) => {
  console.log('Client connected');

  const peer = new SimplePeer({ initiator: false, trickle: false, wrtc });

  const detectionService = new DetectionService();
  await detectionService.init();

  peer.on('signal', (data: SignalData) => {
    socket.emit('signal', data);
  });

  socket.on('signal', (data: SignalData) => {
    peer.signal(data);
  });

  peer.on('stream', async (stream: MediaStream) => {
    console.log('Received video stream from client');

    const videoTrack = stream.getVideoTracks()[0];
    if (!videoTrack) {
      console.error('No video track received');
      return;
    }

    const imported = await import('node:stream/web');
    const MediaStreamTrackProcessor = (imported as any).MediaStreamTrackProcessor;
    const processor = new MediaStreamTrackProcessor({ track: videoTrack });
    const reader = processor.readable.getReader();

    async function processFrame() {
      const { done, value } = await reader.read();
      if (done) {
        console.log('Stream ended');
        return;
      }
      try {
        const gestures = await detectionService.detectFrame(value);
        if (gestures.length) {
          console.log('Detected gestures:', gestures.map((g: any) => g.gesture));
        }
      } catch (error) {
        console.error('Detection error:', error);
      } finally {
        value.close();
      }
      setImmediate(processFrame);
    }

    processFrame();
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

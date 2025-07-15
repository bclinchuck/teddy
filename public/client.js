const socket = io();

window.webcamStream = null;

async function startStream() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  window.webcamStream = stream; // expose globally

  document.getElementById('localVideo').srcObject = stream;

  const peer = new SimplePeer({ initiator: true, trickle: false, stream });

  peer.on('signal', (data) => {
    socket.emit('signal', data);
  });

  socket.on('signal', (data) => {
    peer.signal(data);
  });

  peer.on('connect', () => {
    console.log('WebRTC connection established');
  });
}

startStream();
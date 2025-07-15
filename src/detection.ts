import Human from '@vladmandic/human';

class DetectionService {
  private human: Human;

  constructor() {
    this.human = new Human({ gesture: { enabled: true } });
  }

  async init() {
    await this.human.load();
    await this.human.warmup();
  }

  async detectFrame(frame: VideoFrame) {
    try {
      const bitmap = await createImageBitmap(frame);
      const result = await this.human.detect(bitmap);
      bitmap.close();
      frame.close();
      return result.gesture || [];
    } catch (error) {
      console.error('Detection error:', error);
      return [];
    }
  }
  
}

export default DetectionService;
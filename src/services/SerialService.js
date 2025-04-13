class SerialService {
  constructor() {
    this.port = null;
    this.reader = null;
    this.callbacks = [];
  }

  async connect() {
    try {
      this.port = await navigator.serial.requestPort();
      await this.port.open({ baudRate: 9600 });
      this.reader = this.port.readable.getReader();
      this.startReading();
      return true;
    } catch (error) {
      console.error('Failed to connect:', error);
      return false;
    }
  }

  async disconnect() {
    if (this.reader) {
      await this.reader.cancel();
      await this.reader.releaseLock();
      this.reader = null;
    }
    if (this.port) {
      await this.port.close();
      this.port = null;
    }
  }

  async startReading() {
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      try {
        const { value, done } = await this.reader.read();
        if (done) break;

        buffer += decoder.decode(value);
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          try {
            const data = JSON.parse(line.trim());
            this.notifyCallbacks(data);
          } catch (e) {
            console.error('Failed to parse JSON:', e);
          }
        }
      } catch (error) {
        console.error('Error reading data:', error);
        break;
      }
    }
  }

  onData(callback) {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  notifyCallbacks(data) {
    this.callbacks.forEach(callback => callback(data));
  }
}

export const serialService = new SerialService();
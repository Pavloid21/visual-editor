class EventObserver {
  constructor() {
    this.observers = [];
  }

  subscribe(fn, type) {
    if (!this.observers.filter((item) => item.type === type).length) {
      this.observers.push({ callback: fn, type });
    } else {
      this.observers.forEach((item, index) => {
        if (item.type === type) {
          this.observers[index] = { callback: fn, type };
        }
      });
    }
  }

  broadcast(data) {
    this.observers.forEach((subscriber) => subscriber.callback(data));
  }
}

export const observer = new EventObserver();

export default EventObserver;

export class Terminal {
  write = jest.fn();
  writeln = jest.fn();
  onData = jest.fn();
  dispose = jest.fn();
  loadAddon = jest.fn();
  open = jest.fn();
}

export default {
  Terminal,
};

export class FitAddon {
  fit: () => void;
  dispose: () => void;

  constructor() {
    this.fit = jest.fn();
    this.dispose = jest.fn();
  }
}

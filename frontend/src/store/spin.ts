import { makeAutoObservable } from "mobx";

class Spin {
  private spin = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSpin(spin: boolean) {
    this.spin = spin;
  }

  get() {
    return this.spin;
  }
}

export default new Spin();

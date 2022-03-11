import { makeAutoObservable } from "mobx";

class Spin {
  spin = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSpin(spin: boolean) {
    this.spin = spin;
  }
}

export default new Spin();

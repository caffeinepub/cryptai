// Global trigger for opening the register modal from anywhere
let _registerCallback: (() => void) | null = null;

export function setRegisterCallback(cb: () => void) {
  _registerCallback = cb;
}

export function triggerRegister() {
  if (_registerCallback) _registerCallback();
}

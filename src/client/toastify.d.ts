/* 
  DISCLAMER:
    This is only used to get typescript happy, be aware that this is absolutely not complete.
*/

declare module "toastify-js";

interface ToastifyConfig {
  text: string = "Hi there!";
  duration: number = 3000;
  destination: string | undefined = undefined;
  newWindow: boolean = false;
  close: boolean = false;
  gravity: "top" | "bottom" = "top";
  position: "left" | "right" = "right";
  avatar: string | undefined = undefined;
  className: string | undefined = undefined;
  stopOnFocus: true = true;
  callback: Function = () => {};
  onClick: Function = () => {};
  offset: Object | undefined = undefined;
  escapeMarkup: boolean = true;
  style: Object | undefined = undefined;
  oldestFirst: boolean = true;
}

class ToastifyClass {
  showToast(): any;
}

function Toastify(config: ToastifyConfig): any;

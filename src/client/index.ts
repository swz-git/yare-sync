import { colorlog } from "./tools";
import main from "./main";

colorlog("Loaded yare-sync", "color:orange");

//@ts-ignore
globalThis.loadcheckinterval = setInterval(() => {
  // @ts-ignore
  // console.log(globalThis.update_code, globalThis.editor);
  if (
    // // @ts-ignore
    // globalThis.update_code != undefined &&
    // // @ts-ignore
    // globalThis.editor != undefined &&
    document.readyState === "complete"
  ) {
    //@ts-ignore
    clearInterval(globalThis.loadcheckinterval);
    main.bind(globalThis)();
  }
}, 50);

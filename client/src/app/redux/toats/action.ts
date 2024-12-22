import actionNames from "./actionname";
interface SingletoastSample {
  icon: any;
  header: string;
  description: string;
}
export function singleToastActive(info: SingletoastSample) {
  return {
    type: actionNames.TOAST_ACTIVE,
    payload: info,
  };
}

export function singleToastDeactive() {
  return {
    type: actionNames.TOAST_DEACTIVE,
    payload: {
      icon: null,
      header: null,
      description: null,
    },
  };
}

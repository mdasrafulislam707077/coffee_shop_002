import actionname from "./actionname";
import toastState from "./state";

export function singleToastReducer(state = toastState, action) {
  switch (action.type) {
    case actionname.TOAST_ACTIVE:
      return {
        ...state,
        toastActive: true,
        icon: action?.payload?.icon,
        header: action?.payload?.header,
        description: action?.payload?.description,
      };
    case actionname.TOAST_DEACTIVE:
      return {
        ...state,
        toastActive: false,
        icon: action?.payload?.icon,
        header: action?.payload?.header,
        description: action?.payload?.description,
      };

    default:
      return state;
  }
}

import userAction from "../action/action";
export default function injectUserInfo(info) {
  return {
    type: userAction.INJECT_USER_INFO,
    info: info,
  };
}

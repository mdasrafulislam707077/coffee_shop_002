import userAction from "../action/action";
export default function removeUserInfo() {
  return {
    type: userAction.REMOVE_USER_INFO,
    info: { email: null, name: null },
  };
}

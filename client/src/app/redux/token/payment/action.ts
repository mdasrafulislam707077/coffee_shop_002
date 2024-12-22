import tokenName from "./actionName";
export function injectToken(listOfToken) {
  return {
    type: tokenName.ALL_TOKEN_INJECT,
    list: listOfToken,

  };
}

export function activeToken(activeToken) {
  return {
    type: tokenName.ACTIVE_TOKEN,
    activeToken: activeToken,
  };
}
export function removeAllToken(activeToken) {
  return {
    type: tokenName.ALL_REMOVE_LIST,
  };
}

export function removeToken() {
  return {
    type: tokenName.REMOVE_TOKEN,
    remove_token: {},
  };
}

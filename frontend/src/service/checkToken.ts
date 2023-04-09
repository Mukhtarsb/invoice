export function checkToken() {
  let key = "currentToken";

  let token = localStorage.getItem(key);
  if (token) {
    return true;
  } else {
    return false;
  }
}

export function setToken(token: string) {
  localStorage.setItem("currentToken", JSON.stringify(token));
}

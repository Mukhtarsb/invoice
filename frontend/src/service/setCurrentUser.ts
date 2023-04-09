export function setCurrentUser(loginName: string, password: string) {
  localStorage.setItem(
    "currentUser",
    JSON.stringify({ loginName: loginName, password: password })
  );
}

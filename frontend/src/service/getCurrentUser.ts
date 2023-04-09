export function getCurrentUser() {
  let user = localStorage.getItem("currentUser");
  if (user) {
    return JSON.parse(localStorage.getItem("currentUser") || "");
  }
  return null;
}

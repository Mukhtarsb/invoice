export function getAccountsList() {
  let item = localStorage.getItem("accountsList");
  if (item) {
    return JSON.parse(localStorage.getItem("accountsList") || "");
  }
  return null;
}

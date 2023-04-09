export function setAccountsList(accountsList: {}[]) {
  localStorage.accountsList = JSON.stringify(accountsList);
}

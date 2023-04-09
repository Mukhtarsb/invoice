export function getInvoices() {
  let data = localStorage.getItem("invoices");
  if (data) {
    return JSON.parse(localStorage.getItem("invoices") || "");
  }
  return null;
}

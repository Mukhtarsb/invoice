export function setInvoice(invoice: object) {
  let invoicesData = localStorage.getItem("invoices");
  if (!invoicesData) {
    let invoices = [];
    invoices.unshift(invoice);
    localStorage.setItem("invoices", JSON.stringify(invoices));
  } else {
    let invoices = JSON.parse(localStorage.getItem("invoices") || "");
    invoices.unshift(invoice);
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }
}

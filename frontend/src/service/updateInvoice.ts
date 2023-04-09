import { IData } from "../components/item/item";
import { getInvoices } from "./getInvoices";

export const updateInvoice = (invoice: any) => {
  const invoices = getInvoices();
  invoices.forEach((elem: IData, index: number) => {
    if (elem.id === invoice.id) {
      elem.createdAt = invoice.createdAt;
      elem.paymentDue = invoice.paymentDue;
      elem.description = invoice.description;
      elem.paymentTerms = invoice.paymentTerms;
      elem.clientName = invoice.clientName;
      elem.clientEmail = invoice.clientEmail;
      elem.status = invoice.status;
      elem.senderAddress.street = invoice.senderAddress.street;
      elem.senderAddress.city = invoice.senderAddress.city;
      elem.senderAddress.postCode = invoice.senderAddress.postCode;
      elem.senderAddress.country = invoice.senderAddress.country;
      elem.clientAddress.street = invoice.clientAddress.street;
      elem.clientAddress.city = invoice.clientAddress.city;
      elem.clientAddress.postCode = invoice.clientAddress.postCode;
      elem.clientAddress.country = invoice.clientAddress.country;
      elem.items = invoice.items;
      elem.total = invoice.total;
    }
  });
  localStorage.setItem("invoices", JSON.stringify(invoices));
};

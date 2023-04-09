import { IData } from "../components/item/item";
import { getInvoices } from "./getInvoices";

export const updateStatusInvoice = (invoice: IData) => {
  const invoices = getInvoices();
  invoices.forEach((elem: IData) => {
    if (elem.id === invoice.id) {
      elem.status = "paid";
    }
  });
  localStorage.setItem("invoices", JSON.stringify(invoices));
};

export const updateStatusInvoicePending = (invoice: IData) => {
  const invoices = getInvoices();
  invoices.forEach((elem: IData) => {
    if (elem.id === invoice.id) {
      elem.status = "pending";
    }
  });
  localStorage.setItem("invoices", JSON.stringify(invoices));
};

export const updateStatusInvoiceDraft = (invoice: IData) => {
  const invoices = getInvoices();
  invoices.forEach((elem: IData) => {
    if (elem.id === invoice.id) {
      elem.status = "draft";
    }
  });
  localStorage.setItem("invoices", JSON.stringify(invoices));
};

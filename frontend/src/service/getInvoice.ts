import { IData } from "../components/item/item";
import { getInvoices } from "./getInvoices";

export function getInvoice(id: string) {
  const invoices = getInvoices();
  const invoice = invoices.filter((invoice: IData) => invoice.id === id);
  console.log(invoice);
  return invoice[0];
}

import { IData } from "../components/item/item";

export function getCheckedInvoices(status: string) {
  let data = localStorage.getItem("invoices");
  if (data) {
    let dataArray = JSON.parse(localStorage.getItem("invoices") || "");

    if (status === "total") {
      return dataArray;
    }

    if (status === "paid and pending") {
      return dataArray.filter(
        (invoice: IData) =>
          invoice.status === "paid" || invoice.status === "pending"
      );
    }
    if (status === "paid and draft") {
      return dataArray.filter(
        (invoice: IData) =>
          invoice.status === "paid" || invoice.status === "draft"
      );
    }
    if (status === "pending and draft") {
      return dataArray.filter(
        (invoice: IData) =>
          invoice.status === "pending" || invoice.status === "draft"
      );
    }
    if (status === "pending") {
      return dataArray.filter((invoice: IData) => invoice.status === "pending");
    }
    if (status === "paid") {
      return dataArray.filter((invoice: IData) => invoice.status === "paid");
    }
    if (status === "draft") {
      return dataArray.filter((invoice: IData) => invoice.status === "draft");
    }

    return dataArray;
  }
  return null;
}

// export const getCheckedInvoices2 = async (status: string) => {
//   try {
//     const response = await fetch(`https://localhost/invoice/status=${status}`);
//     if (!response.ok) {
//       console.log("error");
//     } else {
//       const data = await response.json();

//       return data;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

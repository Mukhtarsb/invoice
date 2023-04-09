import { IData } from "../components/item/item";
import { getInvoices } from "./getInvoices";

export const deleteInvoice = (id: string) => {
  const invoices = getInvoices();
  invoices.forEach((elem: IData, index: number) => {
    if (elem.id === id) {
      invoices.splice(index, 1);
    }
  });
  localStorage.setItem("invoices", JSON.stringify(invoices));
};

// export const deleteInvoice = async (id: string) => {
//   try {
// let response = await fetch(`https://localhost:8080/invoice/${invoice.id}`, {
//   method: "DELETE",
//   headers: {
//     "Content-Type": "application/json;charset=utf-8",
//   },
// });

//     if (!response.ok) {
//       console.log("error");
//     } else {
//       const result = await response.json();

//       return result.message;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

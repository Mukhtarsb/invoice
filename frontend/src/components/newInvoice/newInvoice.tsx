import "../invoices/invoices.css";
import { generateID } from "../../utils/generateID";
import { setInvoice } from "../../service/setInvoice";
import { getInvoices } from "../../service/getInvoices";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback } from "react";

interface IForm {
  createdAt: string;
  description: string;
  paymentTerms: string;
  clientName: string;
  clientEmail: string;
  senderAddressStreet: string;
  senderAddressCity: string;
  senderAddressPostCode: string;
  senderAddressCountry: string;
  clientAddressStreet: string;
  clientAddressCity: string;
  clientAddressPostCode: string;
  clientAddressCountry: string;
}

const schema = z.object({
  createdAt: z.string().min(1, { message: "Invalid date" }),
  description: z.string().min(1, { message: "Invalid description" }),
  paymentTerms: z.string().min(1, { message: "Invalid payment terms" }),
  clientName: z.string().min(1, { message: "Invalid Client name" }),
  clientEmail: z.string().email({ message: "Invalid Client email" }),
  senderAddressStreet: z.string().min(1, { message: "Invalid address" }),
  senderAddressCity: z.string().min(1, { message: "Invalid city" }),
  senderAddressPostCode: z.string().min(6, { message: "Invalid post code" }),
  senderAddressCountry: z.string().min(1, { message: "Invalid country" }),
  clientAddressStreet: z.string().min(1, { message: "Invalid Client street" }),
  clientAddressCity: z.string().min(1, { message: "Invalid Client city" }),
  clientAddressPostCode: z
    .string()
    .min(1, { message: "Invalid Client post code" }),
  clientAddressCountry: z
    .string()
    .min(1, { message: "Invalid Client country" }),
});

const NewInvoice = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: zodResolver(schema),
  });

  const itemListHandler = (event: { [x: string]: any; currentTarget: any }) => {
    event = event || window.event;
    const elem = event.target || event.srcElement;
    const name = elem.nodeName;
    if (name === "path") {
      const li = elem.closest("li");
      li.remove();
    }
  };

  const addItemHandler = (e: { preventDefault: () => void }) => {
    e?.preventDefault();
    const ul = document.getElementById("itemList");
    const li = document.createElement("li");
    li.classList.add("itemList");
    li.innerHTML = `<input type="text" name="itemName" required></input>
    <input type="number" name="itemQuantity" required ></input>
    <input type="number" name="itemPrice" required></input>
    <input readonly type="text" name="itemTotal" required></input>
    <div className="icon">
      <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
          fill="#888EB0"
          fillRule="nonzero"
        />
      </svg>
    </div>`;
    ul?.append(li);
  };

  const onSubmit = useCallback((data: IForm) => {
    console.log(data);

    const ul = document.getElementById("itemList");
    const liList = ul?.querySelectorAll("li");

    let array = [];
    let total = 0;

    if (liList) {
      for (let i = 0; i < liList?.length; i++) {
        const inputs = liList[i].querySelectorAll("input");
        const item = {
          itemName: inputs[0].value,
          itemQuantity: Number(inputs[1].value),
          itemPrice: Number(inputs[2].value),
          itemTotal: Number(inputs[1].value) * Number(inputs[2].value),
        };
        total += item.itemTotal;
        array.push(item);
      }
    }

    const id = generateID();
    let date2 = 0;

    const date = data.createdAt?.toString();
    if (date) {
      const date1 = Date.parse(date);
      if (data.paymentTerms)
        date2 = date1 + Number(data.paymentTerms) * 86400000;
    }

    const date3 = new Date(date2);
    const year = date3.getFullYear();
    const month = date3.getMonth() + 1;
    const day = date3.getDate();

    let month2 = month.toString();
    if (month < 10) {
      month2 = "0" + month2;
      console.log(month2);
    }

    let day2 = day.toString();
    if (day < 10) {
      day2 = "0" + day2;
    }

    const obj = {
      id: id,
      createdAt: data.createdAt,
      paymentDue: `${year}-${month2}-${day2}`,
      description: data.description,
      paymentTerms: data.paymentTerms,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      status: "pending",
      senderAddress: {
        street: data.senderAddressStreet,
        city: data.senderAddressCity,
        postCode: data.senderAddressPostCode,
        country: data.clientAddressCountry,
      },
      clientAddress: {
        street: data.clientAddressStreet,
        city: data.clientAddressCity,
        postCode: data.clientAddressPostCode,
        country: data.clientAddressCountry,
      },
      items: array,
      total: total,
    };

    setInvoice(obj);
    console.log(getInvoices());

    const modal = document.querySelector("#modal");
    modal?.classList.toggle("translate");
    const overlay = document.querySelector("#overlay");
    overlay?.classList.toggle("active");
    window.location.reload();
  }, []);

  const draftHandler = () => {
    const add = document.getElementById("address") as HTMLInputElement;
    const address = add?.value;

    const c = document.getElementById("city") as HTMLInputElement;
    const city = c?.value;

    const post = document.getElementById("postCode") as HTMLInputElement;
    const postCode = post?.value;

    const coun = document.getElementById("country") as HTMLInputElement;
    const country = coun?.value;

    const cn = document.getElementById("clientName") as HTMLInputElement;
    const clientName = cn?.value;

    const ce = document.getElementById("clientEmail") as HTMLInputElement;
    const clientEmail = ce?.value;

    const ca = document.getElementById("clientAddress") as HTMLInputElement;
    const clientAddress = ca?.value;

    const cc = document.getElementById("clientCity") as HTMLInputElement;
    const clientCity = cc?.value;

    const cp = document.getElementById("clientPostCode") as HTMLInputElement;
    const clientPostCode = cp?.value;

    const cCountry = document.getElementById(
      "clientCountry"
    ) as HTMLInputElement;
    const clientCountry = cCountry?.value;

    const iDate = document.getElementById("invoiceDate") as HTMLInputElement;
    const invoiceDate = iDate?.value;

    const t = document.getElementById("term") as HTMLInputElement;
    const term = t?.value;

    const p = document.getElementById("project") as HTMLInputElement;
    const project = p?.value;

    const ul = document.getElementById("itemList");
    const liList = ul?.querySelectorAll("li");

    let array = [];
    let total = 0;

    if (liList) {
      for (let i = 0; i < liList?.length; i++) {
        const inputs = liList[i].querySelectorAll("input");
        const item = {
          itemName: inputs[0].value,
          itemQuantity: Number(inputs[1].value),
          itemPrice: Number(inputs[2].value),
          itemTotal: Number(inputs[1].value) * Number(inputs[2].value),
        };
        total += item.itemTotal;
        array.push(item);
      }
    }

    const id = generateID();
    let date2 = 0;

    const date = invoiceDate?.toString();
    if (date) {
      const date1 = Date.parse(date);
      if (term) date2 = date1 + Number(term) * 86400000;
    }

    const date3 = new Date(date2);
    const year = date3.getFullYear();
    const month = date3.getMonth() + 1;
    const day = date3.getDate();

    let month2 = month.toString();
    if (month < 10) {
      month2 = "0" + month2;
      console.log(month2);
    }

    let day2 = day.toString();
    if (day < 10) {
      day2 = "0" + day2;
    }

    const obj = {
      id: id,
      createdAt: invoiceDate,
      paymentDue: `${year}-${month2}-${day2}`,
      description: project,
      paymentTerms: term,
      clientName: clientName,
      clientEmail: clientEmail,
      status: "draft",
      senderAddress: {
        street: address,
        city: city,
        postCode: postCode,
        country: country,
      },
      clientAddress: {
        street: clientAddress,
        city: clientCity,
        postCode: clientPostCode,
        country: clientCountry,
      },
      items: array,
      total: total,
    };

    setInvoice(obj);
    console.log(getInvoices());

    const modal = document.querySelector("#modal");
    modal?.classList.toggle("translate");
    const overlay = document.querySelector("#overlay");
    overlay?.classList.toggle("active");
    window.location.reload();
  };

  const discardHandler = () => {
    const modal = document.querySelector("#modal");
    modal?.classList.toggle("translate");
    const overlay = document.querySelector("#overlay");
    overlay?.classList.toggle("active");
  };

  return (
    <div id="modal" className="modal">
      <div className="modalTitle">Create Invoice</div>
      <div className="createInvoice">
        <p className="modalSubtitle">Bill form</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="modalInputTitle">Street address</p>
          <input
            {...register("senderAddressStreet")}
            type="text"
            id="address"
            className="modalInput"
          />

          <div className="modalInputsGroup">
            <div>
              <p className="modalInputTitle">City</p>
              <input {...register("senderAddressCity")} type="text" id="city" />
            </div>
            <div>
              <p className="modalInputTitle">Post Code</p>
              <input
                {...register("senderAddressPostCode")}
                type="text"
                id="postCode"
              />
            </div>
            <div>
              <p className="modalInputTitle">Country</p>
              <input
                {...register("senderAddressCountry")}
                type="text"
                id="country"
              />
            </div>
          </div>
          <p className="modalSubtitle">Bill form</p>
          <p className="modalInputTitle">Client`s Name</p>
          <input
            {...register("clientName")}
            type="text"
            id="clientName"
            className="modalInput"
          />
          <p className="modalInputTitle">Client`s Email</p>
          <input
            {...register("clientEmail")}
            type="text"
            id="clientEmail"
            className="modalInput"
          />
          <p className="modalInputTitle">Street address</p>
          <input
            {...register("clientAddressStreet")}
            type="text"
            id="clientAddress"
            className="modalInput"
          />
          <div className="modalInputsGroup">
            <div>
              <p className="modalInputTitle">City</p>
              <input
                {...register("clientAddressCity")}
                type="text"
                id="clientCity"
              />
            </div>
            <div>
              <p className="modalInputTitle">Post Code</p>
              <input
                {...register("clientAddressPostCode")}
                type="text"
                id="clientPostCode"
              />
            </div>
            <div>
              <p className="modalInputTitle">Country</p>
              <input
                {...register("clientAddressCountry")}
                type="text"
                id="clientCountry"
              />
            </div>
          </div>
          <div className="modalInputsGroup2">
            <div>
              <p className="modalInputTitle">Invoice Date</p>
              <input {...register("createdAt")} type="date" id="invoiceDate" />
              {!!errors.createdAt && <p>{errors.createdAt.message}</p>}
            </div>
            <div>
              <p className="modalInputTitle">Payment Terms</p>
              <select
                {...register("paymentTerms")}
                id="term"
                className="modalSelect"
              >
                <option value="1">Net 1 day</option>
                <option value="7">Net 7 day</option>
                <option value="14">Net 14 day</option>
                <option value="30">Net 30 day</option>
              </select>
              {!!errors.paymentTerms && <p>{errors.paymentTerms.message}</p>}
            </div>
          </div>
          <p className="modalInputTitle">Project / Description</p>
          <input
            {...register("description")}
            type="text"
            id="project"
            className="modalInput"
          />
          {!!errors.description && <p>{errors.description.message}</p>}
          <h3 className="itemListTitle">Item List</h3>
          <div className="itemHeader">
            <p>Item Name</p>
            <p>Qty</p>
            <p>Price</p>
            <p className="total">Total</p>
          </div>

          <ul id="itemList" onClick={itemListHandler}></ul>

          <button className="addNewItem" onClick={addItemHandler}>
            + Add New Item
          </button>
          <div className="buttons">
            <button className="discard" type="button" onClick={discardHandler}>
              Discard
            </button>
            <div>
              <button className="draft" onClick={draftHandler} type="button">
                Save as Draft
              </button>
              <button className="saveAndSend" type="submit">
                Save & Send
              </button>
            </div>
          </div>

          {!!errors.clientName && <p>{errors.clientName.message}</p>}
          {!!errors.clientEmail && <p>{errors.clientEmail.message}</p>}
          {!!errors.senderAddressStreet && (
            <p>{errors.senderAddressStreet.message}</p>
          )}
          {!!errors.senderAddressCity && (
            <p>{errors.senderAddressCity.message}</p>
          )}
          {!!errors.senderAddressPostCode && (
            <p>{errors.senderAddressPostCode.message}</p>
          )}
          {!!errors.clientAddressStreet && (
            <p>{errors.clientAddressStreet.message}</p>
          )}
          {!!errors.clientAddressCity && (
            <p>{errors.clientAddressCity.message}</p>
          )}
          {!!errors.clientAddressPostCode && (
            <p>{errors.clientAddressPostCode.message}</p>
          )}
          {!!errors.clientAddressCountry && (
            <p>{errors.clientAddressCountry.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewInvoice;

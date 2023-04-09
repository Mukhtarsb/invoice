import { useParams } from "react-router-dom";
import "./editInvoice.css";
import { getInvoice } from "../../service/getInvoice";
import { FormEvent } from "react";
import { updateInvoice } from "../../service/updateInvoice";

const EditInvoice = () => {
  const { string } = useParams();

  let items = [
    {
      itemName: "",
      itemQuantity: 0,
      itemPrice: 0,
      itemTotal: 0,
    },
  ];

  let invoice = {
    id: "",
    createdAt: "",
    paymentDue: "",
    description: "",
    paymentTerms: "",
    clientName: "",
    clientEmail: "",
    status: "",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: [],
    total: 0,
  };
  if (string) {
    console.log(string);
    invoice = getInvoice(string);
    console.log(invoice.items);
    items = invoice.items;
    console.log("items: " + items);
  }

  const itemListHandler = (event: { [x: string]: any; currentTarget: any }) => {
    event = event || window.event;
    const elem = event.target || event.srcElement;
    const name = elem.nodeName;
    if (name === "path") {
      const li = elem.closest("li");
      li.remove();
    }
  };

  const editCancelHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const modal = document.querySelector(".modal");
    modal?.classList.remove("translate");
    const overlay = document.querySelector(".deleteOverlay");
    overlay?.classList.remove("active");
    console.log(modal);
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

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const address = formData.get("address");
    const city = formData.get("city");
    const postCode = formData.get("postCode");
    const country = formData.get("country");
    const clientName = formData.get("clientName");
    const clientEmail = formData.get("clientEmail");
    const clientAddress = formData.get("clientAddress");
    const clientCity = formData.get("clientCity");
    const clientPostCode = formData.get("clientPostCode");
    const clientCountry = formData.get("clientCountry");
    const invoiceDate = formData.get("invoiceDate");
    const term = formData.get("term");
    const project = formData.get("project");

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
      id: invoice.id,
      createdAt: invoiceDate,
      paymentDue: `${year}-${month2}-${day2}`,
      description: project,
      paymentTerms: term,
      clientName: clientName,
      clientEmail: clientEmail,
      status: invoice.status,
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

    updateInvoice(obj);

    const modal = document.querySelector(".modal");
    modal?.classList.remove("translate");
    const overlay = document.querySelector(".deleteOverlay");
    overlay?.classList.remove("active");
    window.location.reload();
  };

  return (
    <div id="modal" className="modal">
      <div className="modalTitle">Edit #{string}</div>
      <div className="createInvoice">
        <div className="modalSubtitle">Bill form</div>
        <form onSubmit={submitHandler}>
          <p className="modalInputTitle">Street address</p>
          <input
            type="text"
            name="address"
            className="modalInput"
            required
            defaultValue={invoice.senderAddress.street}
          />

          <div className="modalInputsGroup">
            <div>
              <p className="modalInputTitle">City</p>
              <input
                type="text"
                name="city"
                required
                defaultValue={invoice.senderAddress.city}
              />
            </div>
            <div>
              <p className="modalInputTitle">Post Code</p>
              <input
                type="text"
                name="postCode"
                required
                defaultValue={invoice.senderAddress.postCode}
              />
            </div>
            <div>
              <p className="modalInputTitle">Country</p>
              <input
                type="text"
                name="country"
                required
                defaultValue={invoice.senderAddress.country}
              />
            </div>
          </div>
          <div className="modalSubtitle">Bill form</div>
          <p className="modalInputTitle">Client`s Name</p>
          <input
            type="text"
            name="clientName"
            className="modalInput"
            defaultValue={invoice.clientName}
            required
          />
          <p className="modalInputTitle">Client`s Email</p>
          <input
            type="text"
            name="clientEmail"
            className="modalInput"
            defaultValue={invoice.clientEmail}
            required
          />
          <p className="modalInputTitle">Street address</p>
          <input
            type="text"
            name="clientAddress"
            className="modalInput"
            defaultValue={invoice.clientAddress.street}
            required
          />
          <div className="modalInputsGroup">
            <div>
              <p className="modalInputTitle">City</p>
              <input
                type="text"
                name="clientCity"
                required
                defaultValue={invoice.clientAddress.city}
              />
            </div>
            <div>
              <p className="modalInputTitle">Post Code</p>
              <input
                type="text"
                name="clientPostCode"
                required
                defaultValue={invoice.clientAddress.postCode}
              />
            </div>
            <div>
              <p className="modalInputTitle">Country</p>
              <input
                type="text"
                name="clientCountry"
                required
                defaultValue={invoice.clientAddress.country}
              />
            </div>
          </div>
          <div className="modalInputsGroup2">
            <div>
              <p className="modalInputTitle">Invoice Date</p>
              <input
                type="date"
                name="invoiceDate"
                required
                defaultValue={invoice.createdAt}
              />
            </div>
            <div>
              <p className="modalInputTitle">Payment Terms</p>
              <select
                name="term"
                className="modalSelect"
                defaultValue={invoice.paymentTerms}
              >
                <option value="1">Net 1 day</option>
                <option value="7">Net 7 day</option>
                <option value="14">Net 14 day</option>
                <option value="30">Net 30 day</option>
              </select>
            </div>
          </div>
          <p className="modalInputTitle">Project / Description</p>
          <input
            type="text"
            name="project"
            className="modalInput"
            required
            defaultValue={invoice.description}
          />
          <h3 className="itemListTitle">Item List</h3>
          <div className="itemHeader">
            <p>Item Name</p>
            <p>Qty</p>
            <p>Price</p>
            <p className="total">Total</p>
          </div>

          <ul id="itemList" onClick={itemListHandler}>
            <div>
              {items.map(
                (
                  elem: {
                    itemName: string;
                    itemQuantity: number;
                    itemPrice: number;
                    itemTotal: number;
                  },
                  index: number
                ) => {
                  console.log("elemmm " + elem);
                  return (
                    <li className="itemList" key={index}>
                      <input
                        type="text"
                        name="itemName"
                        required
                        defaultValue={elem.itemName}
                      />

                      <input
                        type="number"
                        name="itemQuantity"
                        required
                        defaultValue={elem.itemQuantity}
                      />

                      <input
                        type="number"
                        name="itemPrice"
                        required
                        defaultValue={elem.itemPrice}
                      />

                      <input
                        readOnly
                        type="text"
                        name="itemTotal"
                        required
                        defaultValue={invoice.total}
                      />

                      <div className="icon">
                        <svg
                          width="13"
                          height="16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                            fill="#888EB0"
                            fillRule="nonzero"
                          />
                        </svg>
                      </div>
                    </li>
                  );
                }
              )}
            </div>
          </ul>

          <button className="addNewItem" onClick={addItemHandler}>
            + Add New Item
          </button>
          <div className="editButtons">
            <div>
              <button
                className="editCancel"
                onClick={editCancelHandler}
                type="button"
              >
                Cancel
              </button>
              <button className="savingChange" type="submit">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInvoice;

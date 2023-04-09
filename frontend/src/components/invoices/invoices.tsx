import "./invoices.css";
import arrow from "./icon-arrow-down.svg";
import Item from "../item/item";
import NewInvoice from "../newInvoice/newInvoice";
import { useState } from "react";

const Invoices = () => {
  const [status, setStatus] = useState("all");

  const clickHandler = () => {
    const modal = document.querySelector("#modal");
    modal?.classList.toggle("translate");
    const overlay = document.querySelector("#overlay");
    overlay?.classList.toggle("active");
  };

  const overlayHandler = () => {
    clickHandler();
  };

  const filterHandler = () => {
    console.log("filter");
    const dropdown = document.querySelector("#dropdown");
    console.log(dropdown);
    dropdown?.classList.toggle("active");
    const arrow = document.querySelector("#arrow");
    arrow?.classList.toggle("rotate");
  };

  const statusHandler = () => {
    const paid = document.querySelector("#paid") as HTMLInputElement;
    const pending = document.querySelector("#pending") as HTMLInputElement;
    const draft = document.querySelector("#draft") as HTMLInputElement;
    if (paid?.checked && pending?.checked && draft?.checked) {
      setStatus(() => "total");
    } else if (paid?.checked && pending?.checked) {
      setStatus(() => "paid and pending");
    } else if (paid?.checked && draft?.checked) {
      setStatus(() => "paid and draft");
    } else if (pending?.checked && draft?.checked) {
      setStatus(() => "pending and draft");
    } else if (paid?.checked) {
      setStatus(() => "paid");
    } else if (pending?.checked) {
      setStatus(() => "pending");
    } else if (draft?.checked) {
      setStatus(() => "draft");
    } else {
      setStatus(() => "total");
    }
  };

  return (
    <>
      <section className="invoice">
        <div className="invoiceList">
          <div className="invoiceHeader">
            <div className="invoiceHeaderLeft">
              <div className="invoiceTitle">Invoices</div>
              <div className="invoicesCount"></div>
            </div>
            <div className="invoiceHeaderRight">
              <div className="invoiceFilter" onClick={filterHandler}>
                Filter by status
                <img
                  id="arrow"
                  className="arrow"
                  src={arrow}
                  alt="arrow"
                  width={11}
                  height={7}
                />
              </div>
              <div id="dropdown" className="dropdown">
                <div>
                  <input
                    type="checkbox"
                    name="paid"
                    id="paid"
                    onClick={statusHandler}
                  ></input>
                  <label htmlFor="paid">Paid</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="pending"
                    id="pending"
                    onClick={statusHandler}
                  ></input>
                  <label htmlFor="pending">Pending</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="draft"
                    id="draft"
                    onClick={statusHandler}
                  ></input>
                  <label htmlFor="draft">Draft</label>
                </div>
              </div>
              <button className="button" onClick={clickHandler}>
                <div className="circle">+</div>
                New Invoice
              </button>
            </div>
          </div>
          <Item status={status} />
        </div>
      </section>
      <NewInvoice />
      <div id="overlay" className="overlay" onClick={overlayHandler}></div>
    </>
  );
};
export default Invoices;

import { useNavigate, useParams } from "react-router-dom";
import "./invoiceDetails.css";
import { getInvoice } from "../../service/getInvoice";
import { IData } from "../item/item";
import {
  updateStatusInvoice,
  updateStatusInvoiceDraft,
  updateStatusInvoicePending,
} from "../../service/updateStatusInvoice";
import { deleteInvoice } from "../../service/deleteInvoice";
import EditInvoice from "../editInvoice/editInvoice";
import { useState } from "react";

const InvoiceDetails = () => {
  const navigate = useNavigate();
  const { string } = useParams();

  console.log(string);

  let invoice: IData | undefined;
  if (string) {
    invoice = getInvoice(string);
  }

  const [status, setStatus] = useState(invoice?.status);

  const clickHandler = () => {
    window.history.go(-1);
  };

  const markAsPaidHandler = () => {
    if (invoice) {
      updateStatusInvoice(invoice);
      setStatus(() => "paid");
    }
  };

  const markAsPendingHandler = () => {
    if (invoice) {
      updateStatusInvoicePending(invoice);
      setStatus(() => "pending");
    }
  };

  const markAsDraftHandler = () => {
    if (invoice) {
      updateStatusInvoiceDraft(invoice);
      setStatus(() => "draft");
    }
  };

  const deleteHandler = () => {
    if (invoice) {
      deleteInvoice(invoice.id);
      navigate("/");
    }
  };

  const editHandler = () => {
    const modal = document.querySelector(".modal");
    modal?.classList.toggle("translate");
    const overlay = document.querySelector(".deleteOverlay");
    overlay?.classList.toggle("active");
  };

  const cancelHandler = () => {
    openModalHandler();
  };

  const openModalHandler = () => {
    const modal = document.querySelector(".deleteModal");
    modal?.classList.toggle("active");
    const overlay = document.querySelector(".deleteOverlay");
    overlay?.classList.toggle("active");
  };

  const deleteOverlayHandler = () => {
    const modal = document.querySelector(".modal");
    modal?.classList.remove("translate");
    const overlay = document.querySelector(".deleteOverlay");
    overlay?.classList.remove("active");
  };

  return (
    <div className="invoiceDetailsContainer">
      <div className="invoiceDetails">
        <div className="goBack" onClick={clickHandler}>
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.342.886L2.114 5.114l4.228 4.228"
              stroke="#9277FF"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
          <span>Go Back</span>
        </div>
        <div className="menu">
          <div className="leftSide">
            <div className="statusText">Status</div>
            <div className="statusValue">
              <div className="dot"></div>
              {invoice?.status}
            </div>
          </div>
          <div className="rightSide">
            <div>
              <button className="edit" onClick={editHandler}>
                Edit
              </button>
              <button className="delete" onClick={openModalHandler}>
                Delete
              </button>
            </div>

            {status === "paid" ? (
              <button className="markAsPending" onClick={markAsPendingHandler}>
                Mark as pending
              </button>
            ) : (
              ""
            )}
            {status === "pending" ? (
              <div>
                <button className="markAsDraft" onClick={markAsDraftHandler}>
                  Mark as draft
                </button>
                <button className="markAsPaid" onClick={markAsPaidHandler}>
                  Mark as paid
                </button>
              </div>
            ) : (
              ""
            )}
            {status === "draft" ? (
              <button className="markAsPending" onClick={markAsPendingHandler}>
                Mark as pending
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="menu2">
          <div className="details">
            <div className="billFrom">
              <div className="billInfo">
                <div className="billName">{invoice?.id}</div>
                <p>{invoice?.description}</p>
              </div>
              <div className="billAddress">
                <p>{invoice?.senderAddress.street}</p>
                <p>{invoice?.senderAddress.city}</p>
                <p>{invoice?.senderAddress.postCode}</p>
                <p>{invoice?.senderAddress.country}</p>
              </div>
            </div>
          </div>
          <div className="invoiceInfo">
            <div className="invoiceDateInfo">
              <div>
                <p>Invoice Date</p>
                <div className="invoiceDate">{invoice?.createdAt}</div>
              </div>
              <div>
                <p>Payment Due</p>
                <div className="invoiceDate">{invoice?.paymentDue}</div>
              </div>
            </div>
            <div className="invoiceDateInfo">
              <p>Bill to</p>
              <div className="clientName">{invoice?.clientName}</div>
              <p>{invoice?.clientAddress.street}</p>
              <p>{invoice?.clientAddress.city}</p>
              <p>{invoice?.clientAddress.postCode}</p>
              <p>{invoice?.clientAddress.country}</p>
            </div>

            <div className="invoiceDateInfo">
              <p>Sent to</p>
              <div className="clientName">{invoice?.clientEmail}</div>
            </div>
          </div>
          <div className="itemList1">
            <table>
              <thead>
                <tr>
                  <th className="textLeft">Item Name</th>
                  <th className="textCenter">QTY.</th>
                  <th className="textRight">Price</th>
                  <th className="textRight">Total</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {invoice?.items.map(
                    (
                      elem: {
                        itemName: string;
                        itemQuantity: number;
                        itemPrice: number;
                        itemTotal: number;
                      },
                      index: number
                    ) => {
                      return (
                        <tr key={index}>
                          <td>{elem?.itemName}</td>
                          <td className="textCenter">{elem?.itemQuantity}</td>
                          <td className="textRight">{elem?.itemPrice}</td>
                          <td className="textRight">{elem?.itemTotal}</td>
                        </tr>
                      );
                    }
                  )}
                </>
              </tbody>
            </table>
          </div>
          <div className="amount">
            <div className="amountDue">Amount Due</div>
            <div className="amountTotal">{invoice?.total}</div>
          </div>
        </div>
      </div>
      <div className="deleteModal">
        <div className="confirm">Confirm Deletion</div>
        <div className="deleteText">
          Are you sure you want to delete invoice #XM9141? This action cannot be
          undone.
        </div>
        <div className="deleteButtons">
          <button className="cancel" onClick={cancelHandler}>
            Cancel
          </button>
          <button className="delete2" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
      <div className="deleteOverlay" onClick={deleteOverlayHandler}></div>

      <EditInvoice />
    </div>
  );
};

export default InvoiceDetails;

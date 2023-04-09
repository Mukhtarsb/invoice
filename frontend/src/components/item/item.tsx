import { useNavigate } from "react-router-dom";
import "./item.css";
import noItems from "./noItems.png";
import { getCheckedInvoices } from "../../service/getCheckedInvoices";

export interface IData {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: string;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: [];
  total: number;
}

const Item = ({ status }: any) => {
  const navigate = useNavigate();

  let data: IData[] = getCheckedInvoices(status);

  const count = document.querySelector(".invoicesCount");
  console.log(count);

  if (count) {
    count.innerHTML =
      data.length > 1
        ? `There are ${data.length} ${status} invoices`
        : `There is ${data.length} ${status} invoice`;
  }

  const clickHandler = (event: { currentTarget: any }) => {
    const { currentTarget } = event;
    const id = currentTarget.id;
    navigate(`/invoice/${id}`);
  };

  return data ? (
    <div>
      {data.map((elem, index: number) => {
        // return <div key={index}>{elem.id}</div>;
        return (
          <div
            key={elem.id}
            id={elem.id}
            className="item"
            onClick={clickHandler}
          >
            <div className="itemName">
              <span>#</span>
              {elem.id}
            </div>
            <div className="itemRightSide">
              <div className="itemDate">{elem.paymentDue}</div>
              <div className="itemClient">{elem.clientName}</div>
              <div className="itemTotal">{elem.total}</div>
            </div>

            <div className="itemStatus">
              <div className="dot"></div>
              <div>{elem.status}</div>
            </div>
            <div className="itemArrow">
              <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1l4 4-4 4"
                  stroke="#7C5DFA"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="noItemsContainer">
      <img src={noItems} alt="No Items"></img>
      <div>
        <p className="noItemsTitle">There is nothing here</p>
        <p className="noItemsText">
          Create an invoice by clicking the New Invoice button and get started
        </p>
      </div>
    </div>
  );
};

export default Item;

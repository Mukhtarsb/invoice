import { ChangeEvent } from "react";
import { FocusEvent } from "react";
import { Link } from "react-router-dom";
import { registerAccount } from "../../service/registerAccount";
import "./registrationForm.css";
import { useNavigate } from "react-router-dom";
import spinner from "./spinner.svg";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    currentTarget.style.borderBottom = "2px solid #6991f3";
    let pattern = /[^@]+@[a-zA-Z]+\.[a-zA-Z]{2,3}/;

    if (pattern.test(currentTarget.value)) {
      currentTarget.style.borderBottomColor = "green";
      currentTarget.style.color = "#8a8a8a";
    } else {
      currentTarget.style.borderBottomColor = "orange";
    }
  };

  const loginNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    currentTarget.style.borderBottom = "2px solid #6991f3";
    let pattern = /[a-zA-Z0-9_-]{3,15}/;
    let b = currentTarget.value.split("").every((elem) => elem.match(/\d/));
    if (pattern.test(currentTarget.value)) {
      if (!b) {
        currentTarget.style.borderBottomColor = "green";
        currentTarget.style.color = "#8a8a8a";
      } else {
        currentTarget.style.borderBottomColor = "orange";
      }
    } else {
      currentTarget.style.borderBottomColor = "orange";
    }
  };

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    currentTarget.style.borderBottom = "2px solid #6991f3";
    let pattern = /\S{8,30}/;
    const b = currentTarget.value.split("").some((elem) => /\d/.test(elem));
    const c = currentTarget.value.split("").some((elem) => /\W/.test(elem));
    if (pattern.test(currentTarget.value)) {
      if (b && c) {
        currentTarget.style.borderBottomColor = "green";
        currentTarget.style.color = "#8a8a8a";
      } else {
        currentTarget.style.borderBottomColor = "orange";
      }
    } else {
      currentTarget.style.borderBottomColor = "orange";
    }
  };

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    if (currentTarget.style.borderBottomColor === "green") {
      currentTarget.style.borderBottom = "0.5px solid green";
    } else {
      currentTarget.style.borderBottom = "2px solid red";
    }
  };

  const submitHandler = () => {
    const spinner = document.querySelector(".spinner");
    spinner?.classList.remove("inactive");
    const inputs = document.querySelectorAll("input");
    if (checkForm(inputs)) {
      let account = {
        email: inputs[0].value,
        username: inputs[1].value,
        password: inputs[2].value,
      };

      registerAccount(account);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }

    function checkForm(inputs: NodeListOf<HTMLInputElement>) {
      let count = 0;
      for (let i = 0; i < inputs.length; i++) {
        if (
          inputs[i].style.borderBottomColor !== "green" ||
          inputs[i].style.borderBottomColor === ""
        ) {
          inputs[i].style.borderBottom = "2px solid red";
          inputs[i].classList.add("changeColor");
          inputs[i].style.color = "red";
        } else {
          count++;
        }
      }
      if (count === inputs.length) {
        return true;
      } else {
        return false;
      }
    }
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      submitHandler();
    }
  };

  return (
    <div className="container-registration">
      <div className="registration">
        <div className="title-registration">Регистрация</div>
        <span data-descr="Латинские буквы, может содержать спецсимволы и цифры, обязательно должна быть «собачка» (@), без пробелов">
          <input
            className="email"
            type="email"
            placeholder="email"
            onChange={emailHandler}
            onBlur={blurHandler}
            onKeyDown={keyDownHandler}
            required
          />
        </span>
        <div className="line"></div>
        <span data-descr="От 3 до 15 символов, латиница. Без пробелов, без спецсимволов, кроме нижнего подчеркивания и дефиса. Может содержать числа, но не полностью состоять из них.">
          <input
            className="loginName"
            type="text"
            placeholder="Login"
            onChange={loginNameHandler}
            onBlur={blurHandler}
            onKeyDown={keyDownHandler}
            required
          />
        </span>
        <div className="line"></div>

        <span data-descr="От 8 до 30 символов, обязательно хотя бы один спецсимвол и цифра.">
          <input
            className="password"
            type="password"
            placeholder="Password"
            onChange={passwordHandler}
            onBlur={blurHandler}
            onKeyDown={keyDownHandler}
            required
          />
        </span>
        <div className="line"></div>

        <button className="button-registration" onClick={submitHandler}>
          Registration
        </button>

        <div className="registration-text">
          <span>Already a client? </span>
          <Link to="/login"> Login here.</Link>
        </div>
      </div>
      <div className="spinner inactive">
        <img src={spinner} alt="download" />
      </div>
    </div>
  );
};

export default RegistrationForm;

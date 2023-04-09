import "./loginForm.css";
import { getAccountsList } from "../../service/getAccountsList";
import { setCurrentUser } from "../../service/setCurrentUser";
import { setToken } from "../../service/setToken";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/login";
import spinner from "./spinner.svg";

const LoginForm = () => {
  const navigate = useNavigate();

  const signHandler = () => {
    const spinner = document.querySelector(".spinner");
    spinner?.classList.remove("inactive");
    const displayLoginMessage = document.querySelector(".login-message");
    const inputs = document.querySelectorAll("input");

    const account = {
      username: inputs[0].value,
      password: inputs[1].value,
    };

    login(account)
      .then(() => {
        setCurrentUser(inputs[0].value, inputs[1].value);
        if (!displayLoginMessage?.classList.contains("inactive")) {
          displayLoginMessage?.classList.add("inactive");
        }
        inputs[0].value = "";
        inputs[1].value = "";
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch(() => {
        const displayLoginMessage = document.querySelector(".login-message");
        displayLoginMessage?.classList.remove("inactive");
      });
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      signHandler();
    }
  };

  return (
    <div className="container-login">
      <div className="login">
        <div className="login-header">
          <div className="login-title">Log in</div>
          <div className="login-message inactive">
            Invalid username or password
          </div>
        </div>
        <input
          className="login-loginName"
          type="text"
          placeholder="Login"
          onKeyDown={keyDownHandler}
        />
        <div className="line"></div>
        <input
          className="login-password"
          type="password"
          placeholder="Password"
          onKeyDown={keyDownHandler}
        />
        <div className="line"></div>
        <button className="button-login" onClick={signHandler}>
          Войти
        </button>
        <div className="login-text">
          <span>Not yet a client?</span>
          <Link to="/registration">Sign up here</Link>
        </div>
      </div>
      <div className="spinner inactive">
        <img src={spinner} alt="download" />
      </div>
    </div>
  );
};

export default LoginForm;

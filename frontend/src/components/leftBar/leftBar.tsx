import "./leftBar.css";
import logo from "./logo.png";
import path from "./path.png";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../service/getCurrentUser";
import { checkToken } from "../../service/checkToken";
import { useNavigate } from "react-router-dom";

const LeftBar = () => {
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (checkToken()) {
      const user = getCurrentUser();
      const letter = user.loginName.charAt(0).toUpperCase();
      setAvatar(() => letter);
    } else {
    }
  }, []);

  const avatarHandler = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentToken");
    setAvatar(() => "");
    navigate("/login");
  };

  return (
    <div className="left">
      <div className="logo">
        <img
          className="logoImage"
          src={logo}
          alt="logo"
          width={37}
          height={35}
        />
        <div className="retangle"></div>
      </div>
      <div className="icons">
        <div className="theme">
          <img
            //   className={styles.logoImage}
            src={path}
            alt="path"
            width={18}
            height={18}
          />
        </div>
        <div className="avatar" onClick={avatarHandler}>
          {avatar ? (
            <div className="avatarLogo">{avatar}</div>
          ) : (
            <div className="avatarLogo">
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="User / User_02">
                  <path
                    id="Vector"
                    d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftBar;

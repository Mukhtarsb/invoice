import { useEffect } from "react";

export const login = (account: any) => {
  //   useEffect(() => {
  const registerUser = async (account: any) => {
    try {
      let response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: account.username,
          password: account.password,
        }),
      });

      if (!response.ok) {
        console.log("error");
      } else {
        const result = await response.json();
        console.log(result);

        return result;
      }
    } catch (err) {
      console.log(err);
    }
  };
  registerUser(account);
};

login({ username: "Avatar2", password: "123456" });

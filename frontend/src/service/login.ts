import { setToken } from "./setToken";

export const login = async (account: any) => {
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
      throw new Error();
    } else {
      const result = await response.json();
      setToken(result.token);
      console.log(result.token);

      return result;
    }
  } catch (err) {
    console.log("Invalid user");
    throw new Error();
  }
};

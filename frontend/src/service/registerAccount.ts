export const registerAccount = (account: any) => {
  console.log(account);
  const register = async (account: any) => {
    try {
      let response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: account.email,
          username: account.username,
          password: account.password,
        }),
      });

      if (!response.ok) {
        console.log("error");
      } else {
        const result = response;
        console.log(result);

        return result;
      }
    } catch (err) {
      console.log(err);
    }
  };

  register(account);
};

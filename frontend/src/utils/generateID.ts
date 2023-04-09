export function generateID() {
  const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  let id = [];

  for (let i = 0; i < 2; i++) {
    id.push(symbols.charAt(Math.floor(Math.random() * symbols.length)));
  }
  for (let i = 0; i < 4; i++) {
    id.push(digits.charAt(Math.floor(Math.random() * digits.length)));
  }

  return id.join("");
}

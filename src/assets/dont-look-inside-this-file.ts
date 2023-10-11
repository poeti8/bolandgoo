export const processLogoClick = (count: number) => {
  if (count === 8) {
    alert("نکن");
  }
  if (count === 18) {
    alert("بسه 😡");
  }
  if (count === 24) {
    alert("داری سایت رو خراب میکنی 😟");
  }
  if (count === 32) {
    alert("نهههههههههه 😭");
    window.document.body.innerHTML = "";
  }
};

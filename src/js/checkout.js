import { qs, loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

function sendForm(checkout) {
  const url = "http://server-nodejs.cit.byui.edu:3000/checkout/";

  const firstName = qs("#txtFirstName").value;
  const lastName = qs("#txtLastName").value;
  const streetAddress = qs("#txtStreetAddress").value;
  const city = qs("#txtCity").value;
  const state = qs("#txtState").value;
  const zipCode = qs("#txtZipCode").value;
  const creditCardNumber = qs("#txtCreditCardNumber").value;
  const expirationDateMonth = qs("#txtExpirationDateMonth").value;
  const expirationDateYear = qs("#txtExpirationDateYear").value;
  const securityCode = qs("#txtSecurityCode").value;

  let payload = {
    orderDate: new Date().toISOString(),
    fname: firstName,
    lname: lastName,
    street: streetAddress,
    city: city,
    state: state,
    zip: zipCode,
    cardNumber: creditCardNumber,
    expiration: `${expirationDateMonth}/${expirationDateYear}`,
    code: securityCode,
    items: [],
    orderTotal: checkout.total,
    shipping: checkout.shippingPrice,
    tax: checkout.tax,
  };
  checkout.list.forEach((item) => {
    payload.items.push({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity,
    });
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  fetch(url, options);
}

loadHeaderFooter();

let checkout = new CheckoutProcess();
qs("#order-summary").innerHTML = checkout.html;

qs("#btnFormSubmit").addEventListener("click", sendForm(checkout));

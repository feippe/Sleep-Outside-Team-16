import {
  qs,
  qsa,
  loadHeaderFooter,
  setLocalStorage,
  alertMessage,
} from "./utils.mjs";
import { sendForm } from "./ExternalServices.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

function makeDataAndSendForm(chckt) {
  const url = "//server-nodejs.cit.byui.edu:3000/checkout/";
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
    orderTotal: chckt.total,
    shipping: chckt.shippingPrice,
    tax: chckt.tax,
  };
  chckt.list.forEach((item) => {
    payload.items.push({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity,
    });
  });

  try {
    sendForm(url, "POST", payload).then(function (result) {
      setLocalStorage("so-cart", []);
      location.href = `/checkout/success.html?oid=${result.orderId}`;
    });
  } catch (err) {
    alertMessage(err);
  }
}

loadHeaderFooter();

let checkout = new CheckoutProcess();
qs("#order-summary").innerHTML = checkout.html;

qs("#btnFormSubmit").addEventListener("click", (event) => {
  qsa(".alertMessage").forEach((e) => {
    qs("main").removeChild(e);
  });

  let form = qs("#form-checkout");
  event.preventDefault();
  const status = form.checkValidity();

  let inputsToValidate = qsa("input[required]", form);
  inputsToValidate.forEach((element) => {
    if (!element.validity.valid) {
      let info = element.getAttribute("data-info");
      alertMessage(`The ${info} value is incorrect or is missing.`);
    }
  });

  form.reportValidity();
  if (status) {
    makeDataAndSendForm(checkout);
  }
});

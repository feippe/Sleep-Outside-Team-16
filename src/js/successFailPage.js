import { qs, getParam, loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

const orderId = getParam("oid");
qs("#orderId").textContent = `#${orderId}`;

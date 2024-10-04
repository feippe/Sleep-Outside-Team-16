// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function qsa(selector, parent = document) {
  return parent.querySelectorAll(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export function renderListWithTemplate(templateFn, parentElement, list, position='afterbegin', clear=false){
  const htmlTemplate = list.map(templateFn);
  if(htmlTemplate!=null){
    if(clear){ parentElement.innerHTML=''; }
    parentElement.insertAdjacentHTML(position, htmlTemplate.join(''));
  }
}

export async function renderWithTemplate(partialFileName, parentElement, fnCallBack=null, position='afterbegin', clear=false){
  const template = await getTemplateFromFile(partialFileName);
  if(clear){ parentElement.innerHTML=''; }
  parentElement.insertAdjacentHTML(position, template);
  if(fnCallBack!==null){ fnCallBack(); }
}

async function getTemplateFromFile(file) {
  const path = `/partials/${file}.html`;
  return await fetch(path).then((data) => data.text());
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function loadHeaderFooter(){
  renderWithTemplate('header',qs('#header'), renderSuperscript);
  renderWithTemplate('footer',qs('#footer'));
}

export function renderSuperscript() {
  const cart = qs(".cart a");
  let cartQty = getLocalStorage("so-cart").length;
  let sup = qs("sup", cart);
  if (!sup) {
    // Si no existe, crea nuevo <sup>
    sup = document.createElement("sup");
    cart.insertBefore(sup, cart.lastChild);
  }
  // Actualiza el contenido del <sup>
  sup.innerHTML = cartQty;
}
import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(){
        this.subtotal = 0;
        this.quantity = 0;
        this.shippingPrice = 0;
        this.tax = 0;
        this.total = 0;
        this.html = "";
        this.list = [];
        this.init();
    }

    init(){
        const cartItems = getLocalStorage("so-cart");
        this.list = cartItems;
        this.calculateValues();
        this.getHtml();
    }

    calculateValues(){
        this.list.forEach((item) => {
            //console.log(item.quantity);
            this.subtotal += item.FinalPrice * item.quantity;
            this.quantity += item.quantity;
        });
        
        this.shippingPrice = ((this.quantity - 1) * 2) + 10;
        this.tax = Math.round(6 * this.subtotal / 100);
        this.total = this.subtotal + this.tax + this.shippingPrice;
    }

    getHtml(){
        this.html = this.orderSummaryTemplate(this.subtotal, this.shippingPrice, this.tax, this.total);
    }

    orderSummaryTemplate(subtotal, shipping, tax, total) {
        const template = `<section class='order-summary'>
        <div class='order-summary-line'>
            <span class='order-summary-line-description'>Subtotal</span>
            <span class='order-summary-line-value'>$${subtotal.toFixed(2)}</span>
        </div>
        <div class='order-summary-line'>
            <span class='order-summary-line-description'>Shipping estimate</span>
            <span class='order-summary-line-value'>$${shipping.toFixed(2)}</span>
        </div>
        <div class='order-summary-line'>
            <span class='order-summary-line-description'>Tax</span>
            <span class='order-summary-line-value'>$${tax.toFixed(2)}</span>
        </div>
        <div class='order-summary-line'>
            <span class='order-summary-line-description'>Order total</span>
            <span class='order-summary-line-value'>$${total.toFixed(2)}</span>
        </div>
        </section>`;
        return template;
    }

}
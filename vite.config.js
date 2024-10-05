import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        listing: resolve(__dirname, "src/product-listing/index.html"),
        header_template: resolve(__dirname, "src/partials/header.html"),
        footer_template: resolve(__dirname, "src/partials/footer.html"),
      },
    },
  },
});

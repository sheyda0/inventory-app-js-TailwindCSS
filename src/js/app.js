import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
    CategoryView.setApp();
    ProductView.setApp();
    CategoryView.createCategoriesList();
    ProductView.createProductList(ProductView.products);
});
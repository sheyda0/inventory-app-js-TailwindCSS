import Storage from "./Storage.js";

const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#product-category");
const addNewProductBtn = document.querySelector("#add-new-product");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");

class ProductView {
    constructor() {
        addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
        searchInput.addEventListener("input", (e) => this.searchProducts(e));
        selectedSort.addEventListener("change", (e) => this.sortProducts(e));
        // deleteProductBtn.addEventListener("click", (e) => this.deleteProduct(e));
        this.products = [];
    }

    addNewProduct(e) {
        e.preventDefault();
        const title = productTitle.value;
        const quantity = productQuantity.value;
        const category = productCategory.value;
        if (!title || !quantity || !category) return;
        Storage.saveProducts({ title, quantity, category });
        this.products = Storage.getAllProducts();
        this.createProductList(this.products);
    }

    setApp() {
        this.products = Storage.getAllProducts();
    }

    createProductList(products) {
        let result = "";
        products.forEach((element) => {
            const selectedCategory = Storage.getAllCategories().find((c) => c.id == element.category);
            result += `
            <div class="flex items-center justify-between mb-2">
                <span class="text-slate-400">${element.title}</span>
                <div class="flex items-center gap-x-3">
                    <span class="text-slate-400"></span>
                    <span class="text-slate-400 text-sm">${new Date().toLocaleDateString("fa-IR")}</span>
                    <span class="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-2xl">${selectedCategory.title}</span>
                    <span class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2border-slate-300 text-slate-300">${element.quantity}</span>
                    <button class="delete-product border px-2 py-0.5 rounded-2xl border-red-400 text-red-400" data-product-id="${element.id}" >delete</button>
                </div>
            </div>`;
        });
        const productsDOM = document.getElementById("products-list");
        productsDOM.innerHTML = result;

        const deleteBtns = [...document.querySelectorAll(".delete-product")];
        deleteBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => this.deleteProduct(e));
        });
    }

    searchProducts(e) {
        const value = e.target.value.trim().toLowerCase();
        const filteredProducts = this.products.filter((p) => {
            return p.title.toLowerCase().includes(value);
        });
        console.log(this.products);
        this.createProductList(filteredProducts);
    }

    sortProducts(e) {
        const value = e.target.value;
        this.products = Storage.getAllProducts(value);
        this.createProductList(this.products);
    }

    deleteProduct(e) {
        const productId = e.target.dataset.productId;
        Storage.deleteProduct(productId);
        this.products = Storage.getAllProducts();
        this.createProductList(this.products);
    }
}

export default new ProductView();
const products = [{
        id: 1,
        title: "react.js",
        category: "frontend",
        createdAt: "2021-10-31T15:02:00.411Z"
    },
    {
        id: 2,
        title: "node.js",
        category: "backend",
        createdAt: "2021-10-31T15:03:23.556Z"
    },
    {
        id: 3,
        title: "vue.js",
        category: "frontend",
        createdAt: "2021-11-01T10:47:26.889Z"
    },
];

const categories = [{
        id: 1,
        title: "frontend",
        description: "frontend of applications",
        createdAt: "2021-11-01T10:47:26.889Z"
    },
    {
        id: 2,
        title: "backend",
        description: "backend of applications",
        createdAt: "2021-10-01T10:47:26.889Z"
    }
];

export default class Storage {
    // getAll categories
    // save category
    // add new category

    static getAllCategories() {
        const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
        // sort => descending
        const sortedCategories = savedCategories.sort((a, b) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        });
        return sortedCategories;
    }

    static saveCategory(categoryToSave) {
        const savedCategories = Storage.getAllCategories();
        const existedItem = savedCategories.find((c) => c.id === categoryToSave.id);
        if (existedItem) {
            existedItem.title = categoryToSave.title;
            existedItem.description = categoryToSave.description;
        } else {
            categoryToSave.id = new Date().getTime();
            categoryToSave.createdAt = new Date().toISOString();
            savedCategories.push(categoryToSave);
        }
        localStorage.setItem("category", JSON.stringify(savedCategories));
    }

    static getAllProducts(sort = "newest") {
        const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
        return savedProducts.sort((a, b) => {
            if (sort === "newest") {
                return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
            } else if (sort === "oldest") {
                return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            }
        });
    }

    static saveProducts(productToSave) {
        const savedProducts = Storage.getAllProducts();
        const existedItem = savedProducts.find((p) => p.id === productToSave.id);
        if (existedItem) {
            existedItem.title = productToSave.title;
            existedItem.quantity = productToSave.quantity;
            existedItem.category = productToSave.category;
        } else {
            productToSave.id = new Date().getTime();
            productToSave.createdAt = new Date().toISOString();
            savedProducts.push(productToSave);
        }
        localStorage.setItem("products", JSON.stringify(savedProducts));
    }

    static deleteProduct(id) {
        const savedProducts = Storage.getAllProducts();
        const filteredProducts = savedProducts.filter((p) => p.id !== parseInt(id));
        localStorage.setItem("products", JSON.stringify(filteredProducts));
    }
}
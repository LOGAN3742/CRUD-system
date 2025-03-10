let btnDark = document.getElementById("btnDark");

btnDark.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    document.getElementById("form").classList.toggle("dark");
    btnDark.classList.toggle("dark");

    document.querySelectorAll('h1').forEach(h => h.classList.toggle("dark"));

    let moonIcon = document.getElementById("moon");
    let sunIcon = document.getElementById("sun");

    if (moonIcon.style.display === "none") {
        moonIcon.style.display = "inline";
        sunIcon.style.display = "none";
    } else {
        moonIcon.style.display = "none";
        sunIcon.style.display = "inline";
    }
});

let products = [];
let editId = null;

function addProduct() {
    let name = document.getElementById("productName").value.trim();
    let priceInput = document.getElementById("productPrice").value.trim();
    let price = priceInput ? parseFloat(priceInput) : NaN;
    let category = document.getElementById("productCategory").value.trim();

    if (name === "" || isNaN(price) || category === "") {
        alert('Please fill in all fields!');
        return;
    }

    if (editId !== null) {
        products = products.map(product => 
            product.id === editId ? { id: editId, name, price, category } : product
        );
        editId = null;
    } else {
        let product = {
            id: Date.now(),
            name: name,
            price: price,
            category: category
        };
        products.push(product);
    }

    displayProduct();
    countProduct();
    resetForm();
}

function displayProduct() {
    let tableBody = document.getElementById("productTable");
    tableBody.innerHTML = "";

    products.forEach((product) => {
        let row = `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>
                <button class="btn" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function countProduct() {
    document.getElementById("countProduct").innerHTML = `Total Products: ${products.length}`;
}

function editProduct(id) {
    let product = products.find((pro) => pro.id === id);
    if (!product) return; // تأكد أن المنتج موجود

    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productCategory").value = product.category;

    editId = id;
}

function deleteProduct(id) {
    products = products.filter((product) => product.id !== id);
    displayProduct();
    countProduct();
}

function resetForm() {
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productCategory").value = "";
}

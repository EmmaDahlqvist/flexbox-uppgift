let carts = document.querySelectorAll(".add-cart");

let products = [ //produkter
	{
		name: "Dröm",
		tag: "dream-pc",
		price: 15900,
		inCart: 0
	},
	{
		name: "Gaming",
		tag: "gaming-pc",
		price: 11200,
		inCart: 0
	},
	{
		name: "Arbete",
		tag: "work-pc",
		price: 8500,
		inCart: 0
	},
	{
		name: "All around",
		tag: "all-around-pc",
		price: 9050,
		inCart: 0
	}
]

for (let i = 0; i < carts.length; i++) { //funktion vid klick av knapp lägg till i kundvagn
	carts[i].addEventListener("click", () => {
		cartNumbers(products[i]);
		totalCost(products[i]);
	})
}

function removeItem() {
	let removeItemClass = document.querySelectorAll(".remove-items");
	let item = localStorage.getItem("productsInCart");
	items = JSON.parse(item);
	let itemIndex = 1;

	products.splice(itemIndex, 1);

	localStorage.setItem("productsInCart", JSON.stringify(items));
	console.log("removed item");
	if (removeItemClass) {
		for (let i = 0; i < removeItemClass; i++) { //funktion vid klick av knapp lägg till i kundvagn
			console.log("hej");
			removeItemClass[i].addEventListener("click", () => {
				products[i].inCart -= 1;
				console.log("hej");
			})
		}
	}
}

function onLoadCartNumers() { //kommer visa rätt antal produkter oavsett page refresh
	let productNumbers = localStorage.getItem("cartNumbers");

	if (productNumbers) {
		document.querySelector(".cart span").textContent = productNumbers;
	}
}

function cartNumbers(product) { //ändrar antal produkter vid klick
	let productNumbers = localStorage.getItem("cartNumbers");
	productNumbers = parseInt(productNumbers);
	if (productNumbers) {
		localStorage.setItem("cartNumbers", productNumbers + 1);
		document.querySelector(".cart span").textContent = productNumbers + 1;
	} else {
		localStorage.setItem("cartNumbers", 1);
		document.querySelector(".cart span").textContent = 1;
	}
	setItems(product);
}

function setItems(product) {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);

	if (cartItems != null) {
		if (cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].inCart += 1;
	} else {
		product.inCart = 1;
		cartItems = {
			[product.tag]: product
		}
	}
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
	let cartCost = localStorage.getItem("totalCost");
	console.log("price", cartCost);

	if (cartCost != null) {
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost +
			product.price);
	} else {
		localStorage.setItem("totalCost", product.price);
	}
}

function displayCart() {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector(".products");
	let cartCost = localStorage.getItem("totalCost");

	if (cartItems && productContainer) {
		productContainer.innerHTML = ' ';
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += `
            <div class="product">
            <div class="product-title">
                <ion-icon name="close-circle-outline" class="remove-items" onclick="removeItem()"></ion-icon>
                <img src="./img/${item.tag}.jpg">
                <span> ${item.name}</span>
                </div>
                <div class="price">${item.price}.00 kr</div>
                <div class="quantity">
                <ion-icon name="caret-back-outline"></ion-icon><span>${item.inCart}</span><ion-icon name="caret-forward-outline"></ion-icon>
                </div>
                <div class="total">
                ${item.inCart*item.price}.00 kr
                </div>
            </div>
        `;
		});
		productContainer.innerHTML += `
        <div class="basket-total-container">
            <h4 class="basket-total-title">
            Totalt: ${cartCost}.00 kr
            </h4>
        `
	}

}

function cartAnimation() {
	let dropdown = document.getElementsByClassName("dropdown-content")[4];
	dropdown.style.display = "none";
	dropdown.style.animation = "none";

	setTimeout(function () {
		dropdown.style.animation = "cartAnimation 5s 1";
		dropdown.style.display = "flex";
	}, 10);
	setTimeout(function () {
		dropdown.style.display = "none";
	}, 5000);
}

//Körs även vid refresh page
onLoadCartNumers();
displayCart();
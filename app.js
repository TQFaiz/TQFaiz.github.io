let getProducts=async()=>{
    let products=await fetch("https://dummyjson.com/products");
    let response=await products.json();
    localStorage.setItem("products", JSON.stringify(response.products))
    productsRendering(response.products);
}

let productsRendering=(data)=>{
    let ProductsRow=document.getElementById("productsRow");
    data.forEach(p => {
        let product=document.createElement("div");
        product.classList.add("col-3");
        product.classList.add("my-2");
        product.innerHTML=`
        <div class="product-border border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <img src="${p.thumbnail}" alt="" class="w-100">
        <h5 class="ms-2">${p.title}</h5>
        <div class="stars ms-2 text-warning">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
        </div>
        <p class="ms-2">${p.rating}</p>
        <p class="ms-2 fw-folder h5">${p.price}$</p>
        <p class=ms-2>${p.description}</p>
        <a href="./details.html?pid=${p.id}"><i class="bi bi-info-circle-fill"></i></a>
        <button class="btn btn-dark m-2" onclick="addToCart(${p.id})">Add to cart <i class="bi bi-cart-plus"></i></button>

    </div>`;
    ProductsRow.appendChild(product);

    });
}
getProducts();
let cart=[];
let addToCart=(id)=>{
    event.preventDefault();
    let product=JSON.parse(localStorage.getItem("products"));
    cart.push(product[id]);
    console.log(product[id]);
// alert("product add " + id);
renderCartItems();
};
let renderCartItems = () => {
    document.getElementById("cartItems").innerHTML = "";
    let cartItems = document.getElementById("cartItems");
    cart.forEach(product => {
        cartItems.innerHTML= `
            <div class="d-flex justify-content-between">
                <img src="${product.thumbnail}" class="w-25" alt="">
                <h5 class="mt-3">${product.title}</h5>
                <p class="mt-3">${product.price}$</p>
                <i class="bi bi-x mt-3"></i>
               
                
             </div>  `;
    });
    console.log(cart);
}
let subtotal=document.querySelector(".subtotal")
function renderSubTotal(){
    let totalPrice=0, totalItems=0;
    cart.forEach(item => {
        totalPrice+=item.price*item.numberOfUnits;
        totalItems+=item.numberOfUnits
    });
    subtotal.innerHTML=`<div class="subtotal">
    
    Subtotal(${totalItems} items): ${totalPrice.toFixed(2)}$;
  </div>`
}


function scrollWin(x, y) {
    window.scrollBy(x, y);
  }
// console.log(cart);


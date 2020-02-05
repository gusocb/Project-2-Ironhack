function getProduct(){
  //Add products to list
  let barcode = document.getElementById('barcode');
  if(!barcode.value) return;
  const errorMessage = document.getElementById("errorMessage")
  errorMessage.classList.add('hidden')
  fetch(`/search?barcode=${barcode.value}`).then(res=>res.json()).then(product=>{
    if (!product) {
      errorMessage.classList.remove('hidden')
      errorMessage.innerHTML = 'Este producto no existe'
      return;
    }

    if (product.stock <= 0) {
      errorMessage.classList.remove('hidden')
      errorMessage.innerHTML = 'Este producto no está disponible'
      return;
    }
    const productList = document.getElementById('show-product')
    const productDiv = document.createElement('div')
    productDiv.id = product._id
    productDiv.innerHTML = 
      `${product.name} <br>
      $<span class="price">${product.price}</span> <br>
      Cantidad: <span class="add" onclick="changeQuant(1, '${product._id}')">+</span><span class="quantity">1</span><span class="substract" onclick="changeQuant(-1, '${product._id}')">-</span>
      Stock: <span class="stock">${product.stock}</span>
      <span onclick="deleteProduct('${product._id}')"class="borrar">X</span>`
    productList.appendChild(productDiv)
    //Clean barcode value for next operation
    barcode.value = null;
    calculateTotal()
  })
}

function calculateTotal(){
  let total =0;

  const prices =  document.getElementsByClassName('price');
  const quantities =  document.getElementsByClassName('quantity');
  for (let i = 0; i < prices.length ; i++) {
    total +=(parseInt(prices[i].innerHTML)*parseInt(quantities[i].innerHTML));
  }
  //Add total to view
  totalSpan = document.getElementById('total')
  totalSpan.innerHTML = `Total: $${total}`  
}

function changeQuant(value, id) {
  const div = document.getElementById(id);
  let quantity = null;
  let stock = null;
  for (let i = 0; i < div.childNodes.length; i++) {
    if (div.childNodes[i].className == "quantity") {
      quantity = div.childNodes[i];
    }
    if (div.childNodes[i].className == "stock") {
      stock = div.childNodes[i];
    }
  }

  if (!quantity) return;

  let newQuant = parseInt(quantity.innerHTML) + value;

  if (newQuant <= 0) {
    newQuant = 0;
  }
  if (newQuant > parseInt(stock.innerHTML)) {
    newQuant = parseInt(stock.innerHTML)
  }
  quantity.innerHTML = newQuant;
  calculateTotal()
}

function deleteProduct(id) {
  const div = document.getElementById(id);
  div.parentNode.removeChild(div)
  calculateTotal()
}

function checkout() {
  
}
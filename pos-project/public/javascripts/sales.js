let prices = [];

function getProduct(){
  //Add products to list
  let barcode = document.getElementById('barcode');
  if(!barcode.value) return;
  const errorMessage = document.getElementById("errorMessage")
  errorMessage.classList.add('hidden')
  fetch(`/search?barcode=${barcode.value}`).then(res=>res.json()).then(product=>{
    if (!product) {
      errorMessage.classList.remove('hidden')
      return;
    }
    const productList = document.getElementById('show-product')
    const productDiv = document.createElement('div')
    productDiv.innerHTML = `${product.name} <br> $<span class="price">${product.price}</span>`
    productList.appendChild(productDiv)
    //Clean barcode value for next operation
    barcode.value = null;
    //Save each price for each prodct
    priceNumber = parseInt(product.price);
    prices.push(priceNumber);
    calculateTotal()
  })
}

function calculateTotal(){
  let total =0;
  prices.forEach(ele => {
    total += ele;
  });
  //Add total to view
  totalSpan = document.getElementById('total')
  totalSpan.innerHTML = `Total: $${total}`  
}
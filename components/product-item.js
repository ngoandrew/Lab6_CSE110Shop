// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    // List item
    let product = document.createElement('li');
    product.setAttribute('class', 'product');

    // Image
    let image = document.createElement('img');
    image.setAttribute('src', this.getAttribute('image'));
    image.setAttribute('alt', this.getAttribute('title'));
    image.setAttribute('width', 200);
    image.setAttribute('class', 'pix');

    // Name
    let name = document.createElement('p');
    name.textContent = this.getAttribute('title');
    name.setAttribute('class', 'title');

    // Price
    let price = document.createElement('p');
    price.textContent = '$' + this.getAttribute('price');
    price.setAttribute('class', 'price');

    // Product button
    let button = document.createElement('button');
    let id = this.getAttribute('id');
    let count = document.getElementById('cart-count');
    if(localStorage.getItem(id)) {
      button.textContent = 'Remove from Cart';
      count.setAttribute('textContent', parseInt(++count.textContent));
    } else {
      button.textContent = 'Add to Cart';
    }
    
    button.onclick = function() {
      alert('Added to cart!'); 
      if(button.textContent == 'Add to Cart') {     
        count.setAttribute('textContent', parseInt(++count.textContent));
        button.textContent = 'Remove from Cart';
        localStorage.setItem(id, id);
      } else {
        count.setAttribute('textContent', parseInt(--count.textContent));
        button.textContent = 'Add to Cart';
        localStorage.removeItem(id);
      }
      
    };


    // Add styling
    let style = document.createElement('style');
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;

    // Attach everything to the shadow root
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(product);
    product.appendChild(image);
    product.appendChild(name);
    product.appendChild(price);
    product.appendChild(button);
  }
}

customElements.define('product-item', ProductItem);
# Product Search & Category Filter

A vanilla JavaScript feature that lets users search products via an API and filter the results by category (smartphones / mobile-accessories), with an empty state and a "no products found" message.

---

## HTML

```html
<input id="search" type="text" placeholder="Search your product">
<select name="category" id="selectCategory">
  <option value="default">Default</option>
  <option value="smartphones">Smartphones</option>
  <option value="mobile-accessories">Mobile Accessories</option>
<select>
<div id="products-container"></div>
```

---

## CSS

```css
html, body {
  height: 100%;
  width: 100%;
}

.App {
  width: 90%;
  height: 100%;
  border: 1px solid black;
  padding: 10px;
  background-color: #adffc3;
  color: black;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.product-card {
  padding: 1rem;
  border: 1px solid red;
  width: 200px;
}
```

---

## JavaScript

```javascript

const inputField = document.getElementById('search');

let products = [];
let searchedCategory = 'default';
let searchedText = '';

inputField.addEventListener('input', (e) => {
  searchedText = e.target.value;
  if (e.target.value !== '') {
    fetchProducts(e.target.value)
      .then((data) => {
        products = data.products;
        if (searchedCategory !== 'default') {
          const filteredProduct = data.products.filter((product) => {
            return product.category === searchedCategory;
          });
          console.log(e.target.value, searchedCategory)
          renderUI(filteredProduct);
        } else {
          renderUI(data.products);
        }
      })
  } else {
    products = [];
    renderUI([]);
  }
});

const fetchProducts = async (searchValue) => {
  const data = await fetch(`https://dummyjson.com/products/search?limit=125&q=${searchValue}`);
  const response = await data.json();
  return response;
};

const renderUI = (productsData) => {
  const productContainer = document.getElementById('products-container');
  productContainer.innerHTML = '';
  productContainer.classList.add('product-container');
  if (productsData.length > 0) {
    productContainer.innerHTML = productsData.map((product) => {
      return `
        <div class="product-card">
          <p>${product.title}</p>
          <p>${product.price}</p>
          <p>${product.category}</p>
        </div>
      `
    }).join('');
  } else if (searchedText === '') {
    productContainer.innerHTML = `<p>Search to see the products</p>`
  } else {
    productContainer.innerHTML = `<p>No products found</p>`
  }
};

const selectCategory = document.getElementById('selectCategory');

selectCategory.addEventListener('change', (e) => {
  searchedCategory = e.target.value;
  const filteredProduct = products.filter((product) => {
    return product.category === e.target.value;
  });
  if (searchedCategory !== 'default') {
    renderUI(filteredProduct);
  } else {
    renderUI(products);
  }
});
```

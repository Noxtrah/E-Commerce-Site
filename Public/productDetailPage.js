function fetchDataAndCreateItem(productNo) {
    fetch(`/api/item?productNo=${encodeURIComponent(productNo)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(items => {
            createItem(items);
        })
        .catch(error => {
            console.error('Error fetching items:', error);
        });
}

function createItem(item) {
    const productBrand = document.querySelector('.product-brand');
    const productName = document.querySelector('.product-name');
    const productPrice = document.querySelector('.product-price');
    const productDescription = document.querySelector('.product-description');
    const productRate = document.querySelector('.product-rate');
    const productRateCount = document.querySelector('.product-rate-count');
    const productImageContainer = document.querySelector('.product-image-container');

    // Fill the areas in HTML with the fetched data
    productBrand.textContent = item.brand;
    productName.textContent = item.name;
    productPrice.textContent = `${item.price} TL`; // Assuming price is in TL
    productDescription.textContent = item.description;
    productRate.textContent = `Rate: ${item.rate}`; // Assuming rate is in a scale of 5
    productRateCount.textContent = `Rate Count: ${item.rateCount}`;

    // Assuming item has an imageUrl property
    const productImage = document.createElement('img');
    productImage.src = item.imageUrl;
    productImage.alt = item.name; // Set alt text for accessibility
    productImageContainer.appendChild(productImage);
}

// Fetch data and create item
const urlParams = new URLSearchParams(window.location.search);
const productNo = urlParams.get('productNo');
fetchDataAndCreateItem(productNo);

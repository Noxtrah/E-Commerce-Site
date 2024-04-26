document.addEventListener("DOMContentLoaded", function() {
    // Fetch data and create item
    const urlParams = new URLSearchParams(window.location.search);
    const productNo = urlParams.get('productNo');

    if (productNo) {
        fetchDataAndCreateItem(productNo);
    } else {
        console.error('Product number is undefined');
    }
});

async function fetchDataAndCreateItem(productNo) {
    fetch(`/api/item?productNo=${encodeURIComponent(productNo)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(items => {
            console.log('Fetched items:', items);
            createItem(items);
        })
        .catch(error => {
            console.error('Error fetching items:', error);
        });
}

function createItem(item) {
    const productBrand = document.querySelector('.product-brand');
    const productBrand2 = document.querySelector('.product-brand-2');
    const productName = document.querySelector('.product-name');
    const productPrice = document.querySelector('.product-price');
    const productDescription = document.querySelector('.product-description');
    const productImageContainer = document.querySelector('.product-image-container');

    // Fill the areas in HTML with the fetched data
    productBrand.textContent = item[0].brand || 'Unknown Brand'; // Access the brand property of the first item in the array
    productName.textContent = item[0].productName || 'Unknown Product'; // Use item.productName instead of item.name
    productBrand2.textContent = item[0].brand || 'Unknown Brand';
    productPrice.textContent = `${item[0].price},00` || 'Unknown price'; // Access the price property of the first item in the array
    productDescription.textContent = item[0].description || 'Unknown description'; // Access the description property of the first item in the array
    
    const ratingContainer = document.querySelector('.product-rate');
    // Calculate the number of full stars (integer part of the rating)
    const fullStars = Math.min(Math.floor(item[0].rating), 5);

    // Check if there is a half star
    const hasHalfStar = item[0].rating % 1 >= 0.5;

    // Create full stars
    for (let i = 0; i < fullStars; i++) {
        const star = document.createElement('i');
        star.classList.add('fas', 'fa-star');
        ratingContainer.appendChild(star);
    }

    // Create half star if applicable
    if (hasHalfStar) {
        const halfStar = document.createElement('i');
        halfStar.classList.add('fas', 'fa-star-half-alt');
        ratingContainer.appendChild(halfStar);
    }

    // Create empty stars for the remaining slots
    const remainingStars = 5 - (fullStars + (hasHalfStar ? 1 : 0)); // Calculate the remaining slots
    for (let i = 0; i < remainingStars; i++) {
        const star = document.createElement('i');
        star.classList.add('far', 'fa-star');
        ratingContainer.appendChild(star);
    }

    const rateValue = item[0].rating;
    const rateValueContainer = document.querySelector('.product-rate-value');
    rateValueContainer.textContent = `${rateValue}`;


    // Set count of ratings
    const countOfRatingsContainer = document.querySelector('.product-rate-count');
    countOfRatingsContainer.textContent = `${item[0].countOfRatings}`;
    
    // Set product image
    if (item[0].imageUrl) {
        const productImage = document.createElement('img');
        productImage.src = item[0].bigImageUrl;
        productImage.alt = item[0].productName || 'Product Image'; // Access the productName property of the first item in the array
        productImageContainer.appendChild(productImage);
    } else {
        console.error('Image URL not found');
    }
}

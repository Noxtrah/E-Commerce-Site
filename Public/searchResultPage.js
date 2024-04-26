document.addEventListener("DOMContentLoaded", function() {
    const gridContainer = document.getElementById('gridContainer');
    const filterInput = document.getElementById('filterInput');
    var category = decodeURIComponent(window.location.search.split('=')[1]);
    fetchDataAndCreateGrid(category);
    setupCategoryClickHandler(category);
});

var category = decodeURIComponent(window.location.search.split('=')[1]);
const tomorrowDeliveryCheckbox = document.getElementById('tomorrow-delivery-checkbox');
tomorrowDeliveryCheckbox.addEventListener('change', function() {
    if (this.checked) {
        // Fetch items filtered by location
        const location = sessionStorage.getItem('selectedCity');
        fetchAndFilterItemsByLocation(category, location);
    } else {
        // Fetch all items
        fetchDataAndCreateGrid(category);
    }
});

    async function fetchAndFilterItemsByLocation(category, location) {
        try {
            const response = await fetch(`/api/itemsByLocation?category=${encodeURIComponent(category)}&location=${encodeURIComponent(location)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const items = await response.json();
            createGridItems(items);
        } catch (error) {
            console.error('Error fetching items by location:', error);
        }
    }

    async function fetchDataAndCreateGrid(category) {
        fetch(`/api/items?category=${encodeURIComponent(category)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(items => {
                createGridItems(items);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }

    function createGridItems(items) {
        gridContainer.innerHTML = '';
        items.forEach(item => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');

            // Image
            const image = document.createElement('img');
            image.src = item.imageUrl;
            gridItem.appendChild(image);

            // Info Container
            const infoContainer = document.createElement('div');
            infoContainer.classList.add('info-container');
            gridItem.appendChild(infoContainer);

            //HeaderContainer
            const headerContainer = document.createElement('div');
            headerContainer.classList.add('header-container');

            //Brand
            const brand = document.createElement('span');
            brand.classList.add('item-brand');
            brand.textContent = item.brand;
            headerContainer.appendChild(brand);

            //Product Name
            const productName = document.createElement('span');
            productName.classList.add('item-product-name');
            productName.textContent = item.productName;
            headerContainer.appendChild(productName);

            infoContainer.appendChild(headerContainer);

            // Rating
            const ratingContainer = document.createElement('div');
            ratingContainer.classList.add('rating-container');

            // Calculate the number of full stars (integer part of the rating)
            const fullStars = Math.min(Math.floor(item.rating), 5);

            // Check if there is a half star
            const hasHalfStar = item.rating % 1 >= 0.5;

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

            // Append the rating container to its parent element
            infoContainer.appendChild(ratingContainer);


            // Count of Ratings
            const countOfRatings = document.createElement('p');
            countOfRatings.classList.add('item-count-of-ratings');
            countOfRatings.textContent = `${item.countOfRatings}`;
            ratingContainer.appendChild(countOfRatings);
            infoContainer.appendChild(ratingContainer);

            // Price
            const price = document.createElement('p');
            price.classList.add('item-price');
            price.textContent = `${item.price} TL`;
            infoContainer.appendChild(price);

            gridItem.addEventListener('click', function() {
                // Redirect to a new HTML page and pass the item ID as a query parameter
                window.location.href = `productDetailPage.html?productNo=${item.productNo}`;
            });

            gridContainer.appendChild(gridItem);
        });
    }

function setupCategoryClickHandler(category) {
    // Get all category elements
    var categories = document.querySelectorAll('.categories');

    // Add click event listener to each category
    categories.forEach(function(cat) {
        cat.addEventListener('click', function() {
            console.log(category);
            console.log(categories);
            // Update searchInputValue with the clicked category text
            category = cat.textContent.trim();

            // Optionally, you can perform any other actions here
            
            // Log the updated searchInputValue to console (you can replace this with any other action)
            console.log("Search Input Value: ", category);
            fetchDataAndCreateGrid(category);

            // Here you can do any further actions, like redirecting to another page or making a fetch request
            // Example: window.location.href = "another_page.html?searchInputValue=" + encodeURIComponent(searchInputValue);
        });
    });
}
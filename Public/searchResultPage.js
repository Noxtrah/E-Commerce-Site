document.addEventListener("DOMContentLoaded", function() {
    const gridContainer = document.getElementById('gridContainer');
    const filterInput = document.getElementById('filterInput');

    // Sample data
    // const items = [
    //     { 
    //         imageUrl: 'https://productimages.hepsiburada.net/s/314/222-222/110000307328467.jpg/format:webp',
    //         brand: 'Nespresso',
    //         description: 'Item 1 Description',
    //         rating: 5,
    //         countOfRatings: 100,
    //         price: '4.559,00 TL'
    //     },
    //     { 
    //         imageUrl: 'url_for_item_2.jpg',
    //         description: 'Item 2 Description',
    //         rating: 4,
    //         countOfRatings: 80,
    //         price: '$40'
    //     },
    //     // Add more items here...
    // ];
    var category = decodeURIComponent(window.location.search.split('=')[1]);
    console.log(category);
    
    function fetchDataAndCreateGrid() {
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
    
    // Initial grid creation
    fetchDataAndCreateGrid();

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

            gridContainer.appendChild(gridItem);
        });
    }

    // Filter items based on input value
    filterInput.addEventListener('input', function() {
        const filterValue = filterInput.value.toLowerCase();
        const filteredItems = items.filter(item => item.description.toLowerCase().includes(filterValue));
        createGridItems(filteredItems);
    });
});

function setupCategoryClickHandler() {
    // Get all category elements
    var categories = document.querySelectorAll('.categories');

    // Add click event listener to each category
    categories.forEach(function(category) {
        category.addEventListener('click', function() {
            // Update searchInputValue with the clicked category text
            category = category.textContent.trim();

            // Optionally, you can perform any other actions here
            
            // Log the updated searchInputValue to console (you can replace this with any other action)
            console.log("Search Input Value: ", category);
            
            // Here you can do any further actions, like redirecting to another page or making a fetch request
            // Example: window.location.href = "another_page.html?searchInputValue=" + encodeURIComponent(searchInputValue);
        });
    });
}

setupCategoryClickHandler();


//TRY THE CODE BELOW!!!
// var state = {
//     searchInputValue: "",
//     fetchDataAndCreateGrid: function() {
//         fetch('/api/items?category=' + encodeURIComponent(this.searchInputValue))
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(items => {
//                 createGridItems(items);
//             })
//             .catch(error => {
//                 console.error('Error fetching items:', error);
//             });
//     },
//     updateSearchInputValue: function(value) {
//         this.searchInputValue = value;
//         // Optionally, you can call fetchDataAndCreateGrid() here to automatically fetch data when the search input value is updated
//     }
// };

// function setupCategoryClickHandler() {
//     var categories = document.querySelectorAll('.categories');
//     categories.forEach(function(category) {
//         category.addEventListener('click', function() {
//             var searchInputValue = category.textContent.trim();
//             state.updateSearchInputValue(searchInputValue);
//             state.fetchDataAndCreateGrid();
//         });
//     });
// }

// setupCategoryClickHandler();


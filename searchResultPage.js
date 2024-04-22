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
    var searchInputValue = decodeURIComponent(window.location.search.split('=')[1]);
    
    console.log(searchInputValue);
    function fetchDataAndCreateGrid() {
        // var searchInputValue = decodeURIComponent(window.location.search.split('=')[1]);
        fetch('/api/items?category=' + encodeURIComponent(searchInputValue)) //Veritabanına category ekle
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

            //Brand
            const brand = document.createElement('span');
            brand.classList.add('item-brand');
            brand.textContent = item.brand;
            infoContainer.appendChild(brand);

            // Description
            const description = document.createElement('p');
            description.classList.add('item-description');
            description.textContent = item.description;
            infoContainer.appendChild(description);

            // Rating
            const ratingContainer = document.createElement('div');
            ratingContainer.classList.add('rating-container');
            const rating = document.createElement('div');
            rating.classList.add('item-rating');
            for (let i = 0; i < item.rating; i++) {
                const star = document.createElement('span');
                star.classList.add('star');
                star.textContent = '★';
                rating.appendChild(star);
            }
            ratingContainer.appendChild(rating);

            // Count of Ratings
            const countOfRatings = document.createElement('p');
            countOfRatings.classList.add('item-count-of-ratings');
            countOfRatings.textContent = `${item.countOfRatings}`;
            ratingContainer.appendChild(countOfRatings);
            infoContainer.appendChild(ratingContainer);

            // Price
            const price = document.createElement('p');
            price.classList.add('item-price');
            price.textContent = item.price;
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
            searchInputValue = category.textContent.trim();

            // Optionally, you can perform any other actions here
            
            // Log the updated searchInputValue to console (you can replace this with any other action)
            console.log("Search Input Value: ", searchInputValue);
            
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


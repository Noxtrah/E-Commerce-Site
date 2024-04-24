document.addEventListener("DOMContentLoaded", function() {
    // Fetch navbar.html using AJAX
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Insert the navbar content into the placeholder
                document.getElementById("navbar-placeholder").innerHTML = xhr.responseText;
                createSearchBoxOnClick();
            } else {
                console.error('Error loading navbar: ' + xhr.status);
            }
        }
    };
    xhr.open("GET", "navBar.html", true);
    xhr.send();

    // Add click event listener to document for event delegation
    document.addEventListener('click', function(event) {
        const searchBar = event.target.closest('.searchbar');
        const searchBox = document.querySelector('.search-box');
        
        if (searchBar && !searchBox) {
            createSearchBox();
        } else if (!searchBar && searchBox) {
            removeSearchBox();
        }
    });
});

function createSearchBox(){
    var searchBox = document.createElement('div');
    searchBox.classList.add('search-box');

    var searchBoxFirstLabel = document.createElement('div');
    searchBoxFirstLabel.classList.add('search-box-first-label');
    searchBoxFirstLabel.innerHTML = 'Aramaya başlamak için <b>en az 2 karakter</b> yazmalısınız.';
    searchBox.appendChild(searchBoxFirstLabel);

    const searchbarContainer = document.querySelector('.searchbar-container');
    searchbarContainer.appendChild(searchBox);

    const category = document.querySelector('.search-input');
    category.addEventListener('input', searchBarSuggestions);
}

function removeSearchBox() {
    var searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.style.display = 'none';
    }
}

function createSearchBoxOnClick(){
    const searchBar = document.querySelector('.searchbar');
    searchBar.addEventListener('click', function() {
        toggleSearchBox();
    });
}

function toggleSearchBox() {
    var searchBox = document.querySelector('.search-box');
    if (searchBox) {
        if (searchBox.style.display === 'none') {
            searchBox.style.display = 'block';
        } else {
            searchBox.style.display = 'none';
        }
    }
}

function searchBarSuggestions(){
    const category = document.querySelector('.search-input');
    const inputValue = category.value.trim().toLowerCase();
    const searchBoxFirstLabel = document.querySelector('.search-box-first-label');

    // Check if the length of the input value is less than 2
    if (inputValue.length < 2) {
        // Clear previous suggestions
        searchBoxFirstLabel.innerHTML = 'Aramaya başlamak için <b>en az 2 karakter</b> yazmalısınız.';
        return; // Exit the function early
    }

    var tags = ["Elektronik","Moda","Ev, Yaşam, Kırtasiye, Ofis","Oto, Bahçe, Yapı, Market","Anne, Bebek, Oyuncak","Spor, Outdoor","Kozmetik, Kişisel Bakım","Süpermarket, Pet Shop", "Kitap, Film, Müzik, Hobi"];

    // Clear previous suggestions
    searchBoxFirstLabel.innerHTML = '';

    // Filter tags array based on input value
    const filteredTags = tags.filter(tag => tag.toLowerCase().includes(inputValue));

    // Create li elements for filtered tags
    filteredTags.forEach(tag => {
        const li = document.createElement('li');
        li.classList.add('filtered-tags');
        li.textContent = tag;

        // Add click event listener to each li element
        li.addEventListener('click', function() {
            // Perform action when li element is clicked
            category.value = tag; // Set the value of the input to the clicked tag
            // Optionally, you can submit a form or trigger a search function here

            window.location.href = "searchResultPage.html?category=" + encodeURIComponent(category.value);
        });

        searchBoxFirstLabel.appendChild(li);
    });
}

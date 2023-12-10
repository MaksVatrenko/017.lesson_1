// Task Description:
//
//     You are tasked with creating a simple web application that fetches data from a public API and displays it on a webpage. The API provides information about books, and your task is to fetch a list of books and show them on the webpage.
//
//     Requirements:
//
// Choose a public API that provides information about books. You can use Google Books API, Open Library API, or any other API of your choice that allows GET requests.
//     Set up a basic HTML file with a container element where the book information will be displayed.
//     Write JavaScript code to fetch data from the API using the Fetch API. Use GET requests to retrieve the list of books.
//     Use Promises to handle the asynchronous nature of API requests. Handle both successful responses and errors.
//     Parse the API response and extract relevant information about the books (e.g., title, author, cover image, etc.).
// Display the fetched book information on the webpage dynamically. For each book, create a card or a list item displaying its details.
//     Apply basic CSS styling to make the webpage visually appealing.
//     Bonus Points:
//
//     Implement pagination: If the API supports pagination, add a "Load More" button to fetch and display more books as the user clicks the button.
//     Add a search feature: Allow users to search for specific books by title or author using an input field and trigger API requests accordingly.
//     Error handling: Implement a user-friendly error handling mechanism that displays a message when there is an issue with API requests.


const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=javascript';
const books = [];
const booksBlock = document.querySelector('.books');

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        books.push(...data.items);
        console.log(books);
        displayBooks();
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

function displayBooks() {
    const html = books.map(book => {
        return `
            <div class="books__item">
                <img class="books__img" src="${book.volumeInfo.imageLinks.thumbnail}" alt="${book.volumeInfo.title}">
                <h3 class="books__title">${book.volumeInfo.title}</h3>
                <p class="books__authors">${book.volumeInfo.authors}</p>
            </div>
        `;
    }).join('');

    booksBlock.innerHTML = html;
}
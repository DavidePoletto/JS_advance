$(document).ready(function(){
    $( '.navbar' ).click(function(){
        $( '.hide_menu' ).toggleClass( 'wide' );
    });
});

const bigImg = document.getElementById('big_img');

function setBackgroundImage() {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 767) {
        document.querySelector('#big_img').src = "assets/IMG/sfondosmarthphone.png"
    } else {
        document.querySelector('#big_img').src = "assets/IMG/sfondo1.png"
    }
};

window.addEventListener('load', setBackgroundImage);
window.addEventListener('resize', setBackgroundImage);

function searchBooks(event) {
    if (event.key === "Enter") {
        const searchQuery = document.getElementById('search_input').value;
        const apiUrl = `https://openlibrary.org/search.json?q=${searchQuery}&limit=4`;

        // Effettua una richiesta AJAX alle API di Open Library
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(response) {
                // Rimuovi eventuali risultati precedenti
                const resultsContainer = document.getElementById('results');
                resultsContainer.innerHTML = '';

                // Elabora la risposta
                const books = response.docs;
                books.forEach(book => {
                    // Crea un elemento <div> per ogni libro
                    const bookDiv = document.createElement('div');
                    bookDiv.classList.add('book');

                    // Crea un elemento <h2> per il titolo del libro
                    const titleElement = document.createElement('h2');
                    titleElement.textContent = book.title;
                    bookDiv.appendChild(titleElement);

                    // Crea un elemento <p> per l'autore del libro
                    const authorElement = document.createElement('p');
                    authorElement.textContent = `Author: ${book.author_name ? book.author_name.join(', ') : 'Unknown'}`;
                    bookDiv.appendChild(authorElement);

                    if (book.cover_i) {
                        const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
                        const coverImg = document.createElement('img');
                        coverImg.src = coverUrl;
                        bookDiv.appendChild(coverImg);
                    }

                    // Aggiungi il libro all'elemento dei risultati
                    resultsContainer.appendChild(bookDiv);

                    $(document).on('mouseenter', '.book', function() {
                        $(this).find('img').css({
                            transform: 'scale(1.1)',
                            filter: 'brightness(0.7)'
                        });
                        $(this).find('h2, p').css({
                            opacity: 1
                        });
                    }).on('mouseleave', '.book', function() {
                        $(this).find('img').css({
                            transform: 'scale(1)',
                            filter: 'brightness(1)'
                        });
                        $(this).find('h2, p').css({
                            opacity: 0
                        });
                    });
                });

                
            },
            error: function(error) {
                console.log("Si è verificato un errore:", error);
            }
        });
    }
}

function loadMoreBooks() {
    const resultsContainer = document.getElementById('results');
    const lastBook = resultsContainer.lastElementChild;
    const lastBookOffset = lastBook.offsetTop + lastBook.clientHeight;
    const pageOffset = window.scrollY + window.innerHeight;
    const bottomOffset = 20;

    if (pageOffset > lastBookOffset - bottomOffset) {
        // Effettua un'altra richiesta per caricare ulteriori libri...
        const searchQuery = document.getElementById('search_input').value;
        const apiUrl = `https://openlibrary.org/search.json?q=${searchQuery}&limit=4&offset=${resultsContainer.children.length}`;

        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(response) {
                const books = response.docs;
                books.forEach(book => {
                    // Crea e aggiungi elementi per visualizzare i libri...
                    const bookDiv = document.createElement('div');
                    bookDiv.classList.add('book');

                    const titleElement = document.createElement('h2');
                    titleElement.textContent = book.title;
                    bookDiv.appendChild(titleElement);

                    const authorElement = document.createElement('p');
                    authorElement.textContent = `Author: ${book.author_name ? book.author_name.join(', ') : 'Unknown'}`;
                    bookDiv.appendChild(authorElement);

                    if (book.cover_i) {
                        const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
                        const coverImg = document.createElement('img');
                        coverImg.src = coverUrl;
                        bookDiv.appendChild(coverImg);
                    }

                    // Aggiungi il libro al container dei risultati
                    resultsContainer.appendChild(bookDiv);
                });
            },
            error: function(error) {
                console.log("Si è verificato un errore:", error);
            }
        });
    }
}

// Aggiungi il listener per l'evento "keypress" all'input di ricerca
document.getElementById('search_input').addEventListener('keypress', searchBooks);


document.getElementById('loadMoreBtn').addEventListener('click', loadMoreBooks);
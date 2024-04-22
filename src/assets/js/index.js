import '../CSS/style.css';

$(document).ready(function(){
    $( '.navbar' ).click(function(){
        $( '.hide_menu' ).toggleClass( 'wide' );
        $( '.circle').toggleClass( 'circleoff');
        $( '.icon_bar').toggleClass( 'icon_baroff');
    });
});

function translateToItalian() {
    document.getElementById('english').style.display = 'none';
    document.getElementById('italian').style.display = 'block';
}

function translateToEnglish() {
    document.getElementById('italian').style.display = 'none';
    document.getElementById('english').style.display = 'block';
}


function showLoadingIndicator() {
    document.getElementById('loadingIndicator').classList.add('loader');
}

function hideLoadingIndicator() {
    document.getElementById('loadingIndicator').classList.remove('loader');
}

function searchBooks(event) {
    if (event.key === "Enter" || event.type === "click") {
        showLoadingIndicator();

        const searchQuery = document.getElementById('search_input').value;
        const apiUrl = `https://openlibrary.org/search.json?q=${searchQuery}&limit=8`;

        $.ajax({
            url: apiUrl,
            method: 'GET',
                success: function(response) {
                    const resultsContainer = document.getElementById('results');
                    resultsContainer.innerHTML = '';
                    document.getElementById('loadingIndicator').classList.remove('loader');

                    const books = response.docs;
                    books.forEach(book => {
                        const bookDiv = document.createElement('div');
                        bookDiv.classList.add('book');

                        const titleElement = document.createElement('h2');
                        titleElement.textContent = book.title;
                        bookDiv.appendChild(titleElement);

                    const authorElement = document.createElement('p');
                        authorElement.textContent = `${book.author_name ? book.author_name.join(', ') : 'Unknown'}`;
                        authorElement.classList.add('author');
                        bookDiv.appendChild(authorElement);

                    const showMore = document.createElement('button');
                        showMore.textContent = 'Description';
                        showMore.addEventListener('click', function() {
                    const bookUrl = `https://openlibrary.org${book.key}.json`;
                        $.ajax({
                            url: bookUrl,
                            method: 'GET',
                            success: function(bookData) {
                                const backgroundDescription = document.createElement('div');
                                    bookDiv.appendChild(backgroundDescription);
                                    backgroundDescription.classList.add('bckDes');

                                    titleElement.remove();
                                    authorElement.remove();
                                    showMore.remove();
                            
                                const description = document.createElement('p');
                                    description.textContent = bookData.description ? bookData.description.value : 'No description available';
                                    console.log("Descrizione del libro:", description.textContent);

                                if (bookData.description && bookData.description.value) {
                                    let descriptionText = bookData.description.value;
                                    const delimiterStart = '----------';
                                    const delimiterEnd = '[1]';
                                    let startIndex = descriptionText.indexOf(delimiterStart);
                                    let endIndex = descriptionText.indexOf(delimiterEnd);
                                    
                                    if (startIndex !== -1 && endIndex !== -1) {
                                        descriptionText = descriptionText.substring(0, startIndex).trim();
                                    }

                                    startIndex = descriptionText.indexOf(delimiterStart);
                                    if (startIndex !== -1) {
                                        descriptionText = descriptionText.substring(0, startIndex).trim();
                                    }

                                    description.textContent = descriptionText;
                                } else {
                                    description.textContent = 'No description available';
                                }
                                
                                backgroundDescription.appendChild(description);
                                description.classList.add('description');

                                const closeIcon = document.createElement('span');
                                    closeIcon.textContent = 'CLOSE';
                                    closeIcon.classList.add('close');
                                    backgroundDescription.appendChild(closeIcon);

                                    closeIcon.addEventListener('click', function() {
                                    backgroundDescription.style.display = 'none';
                                    bookDiv.appendChild(titleElement);
                                    bookDiv.appendChild(authorElement);
                                    bookDiv.appendChild(showMore);
                                });

                            },
                            error: function(error) {
                                console.log("Si è verificato un errore nella richiesta della descrizione:", error);
                                alert('Si è verificato un errore nella richiesta della descrizione.');

                                closeIcon.addEventListener('click', function() {
                                    backgroundDescription.style.display = 'none';
                                    
                                });
                            }
                        });
                    });
                    bookDiv.appendChild(showMore);0
                    

                    if (book.cover_i) {
                        const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
                        const coverImg = document.createElement('img');
                        coverImg.src = coverUrl;
                        bookDiv.appendChild(coverImg);
                    }

                    resultsContainer.appendChild(bookDiv);

                    $(document).on('mouseenter', '.book', function() {
                        $(this).find('img').css({
                            transform: 'scale(1.1)',
                            filter: 'brightness(0.5)'
                        });
                        $(this).find('h2, p, button, span').css({
                            opacity: 1
                        });
                    }).on('mouseleave', '.book', function() {
                        $(this).find('img').css({
                            transform: 'scale(1)',
                            filter: 'brightness(0.7)'
                        });
                        $(this).find('h2, p, button, span').css({
                            opacity: 0
                        });
                    });
                });

                hideLoadingIndicator();
                    const resultsSection = document.getElementById('title_results');
                    resultsSection.scrollIntoView({ behavior: 'smooth' });
                },
                error: function(error) {
                    console.log("Si è verificato un errore:", error);
                    hideLoadingIndicator();
                    alert('Ci dispiace, non è stato trovato nessun libro.')
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
        const searchQuery = document.getElementById('search_input').value;
        const apiUrl = `https://openlibrary.org/search.json?q=${searchQuery}&limit=4&offset=${resultsContainer.children.length}`;

        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(response) {
                const books = response.docs;
                    books.forEach(book => {
                    const bookDiv = document.createElement('div');
                        bookDiv.classList.add('book');

                    const titleElement = document.createElement('h2');
                        titleElement.textContent = book.title;
                        bookDiv.appendChild(titleElement);

                    const authorElement = document.createElement('p');
                        authorElement.textContent = `${book.author_name ? book.author_name.join(', ') : 'Unknown'}`;
                        authorElement.classList.add('author');
                        bookDiv.appendChild(authorElement);

                    const showMore = document.createElement('button');
                        showMore.textContent = 'Description';
                        showMore.addEventListener('click', function() {
                        const bookUrl = `https://openlibrary.org${book.key}.json`;
                        $.ajax({
                            url: bookUrl,
                            method: 'GET',
                            success: function(bookData) {
                                const backgroundDescription = document.createElement('div');
                                    bookDiv.appendChild(backgroundDescription);
                                    backgroundDescription.classList.add('bckDes');

                                    titleElement.remove();
                                    authorElement.remove();
                                    showMore.remove();
                            
                                const description = document.createElement('p');
                                    description.textContent = bookData.description ? bookData.description.value : 'No description available';

                                if (bookData.description && bookData.description.value) {
                                    const descriptionText = bookData.description.value;
                                    const delimiterStart = '----------';
                                    const delimiterEnd = 'Also contained in:';
                                    const startIndex = descriptionText.indexOf(delimiterStart);
                                    let endIndex = descriptionText.indexOf(delimiterEnd);
                                    
                                    if (endIndex === -1) {
                                        endIndex = descriptionText.length;
                                    }

                                    if (startIndex !== -1 && endIndex !== -1) {
                                        description.textContent = descriptionText.substring(startIndex + delimiterStart.length, endIndex).trim();
                                    } else {
                                        description.textContent = descriptionText;
                                    }
                                } else {
                                    description.textContent = 'No description available';
                                }
                                backgroundDescription.appendChild(description);
                                description.classList.add('description');

                                const closeIcon = document.createElement('span');
                                    closeIcon.textContent = 'CLOSE';
                                    closeIcon.classList.add('close');
                                    backgroundDescription.appendChild(closeIcon);

                                    closeIcon.addEventListener('click', function() {
                                    backgroundDescription.style.display = 'none';
                                    bookDiv.appendChild(titleElement);
                                    bookDiv.appendChild(authorElement);
                                    bookDiv.appendChild(showMore);
                                });

                            },
                            error: function(error) {
                                console.log("Si è verificato un errore nella richiesta della descrizione:", error);
                                alert('Si è verificato un errore nella richiesta della descrizione.');

                                closeIcon.addEventListener('click', function() {
                                    backgroundDescription.style.display = 'none';
                                    
                                });
                            }
                        });
                    });
                    bookDiv.appendChild(showMore);

                    if (book.cover_i) {
                        const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
                        const coverImg = document.createElement('img');
                        coverImg.src = coverUrl;
                        bookDiv.appendChild(coverImg);
                    }

                    resultsContainer.appendChild(bookDiv);
                });
            },
            error: function(error) {
                console.log("Si è verificato un errore:", error);
            }
        });
    }
}

document.getElementById('search_input').addEventListener('keypress', searchBooks);
document.getElementById('search_icon').addEventListener('click', searchBooks);
document.getElementById('loadMoreBtn').addEventListener('click', loadMoreBooks);

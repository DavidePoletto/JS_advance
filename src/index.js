const container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);

//background
const backgroundImg = document.createElement('img');
backgroundImg.id = 'big_img';
backgroundImg.src = 'assets/IMG/background2.png';
backgroundImg.alt = 'background image';
container.appendChild(backgroundImg);

//main content
const mainContent = document.createElement('section');
mainContent.className = 'main_content';
container.appendChild(mainContent);

const dropdownContainer = document.createElement('div');
dropdownContainer.classList.add('dropdown-container');
mainContent.appendChild(dropdownContainer);

const dropdownButton = document.createElement('button');
dropdownButton.classList.add('dropdown-btn');
dropdownButton.innerHTML = `
    <span class="line"></span>
    <span class="line"></span>
    <span class="line"></span>
`;
dropdownContainer.appendChild(dropdownButton);

const dropdownMenu = document.createElement('div');
dropdownMenu.classList.add('dropdown-menu');
dropdownContainer.appendChild(dropdownMenu);

// Creazione di un array di voci di menu
const menuItems = ['Home', 'About', 'Services', 'Contact'];

// Iterazione sull'array e creazione di un elemento di menu per ogni voce
menuItems.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.textContent = item;
    dropdownMenu.appendChild(menuItem);
});

dropdownButton.addEventListener('click', function() {
    dropdownMenu.classList.toggle('show');
    console.log('Clicked on hamburger menu');
});

const titleBox = document.createElement('div');
titleBox.className = 'title_box'
mainContent.appendChild(titleBox);

const title = document.createElement('img');
title.id = 'title_blur';
title.src = './assets/IMG/logo4.png'
titleBox.appendChild(title);

const searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.placeholder = 'Cerca...';
searchBar.className = 'search_bar'
mainContent.appendChild(searchBar);
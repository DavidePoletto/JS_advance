const container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);

//background
const backgroundImg = document.createElement('img');
backgroundImg.id = 'big_img';
backgroundImg.src = 'assets/IMG/background2.png';
backgroundImg.alt = 'background image';
container.appendChild(backgroundImg);


/*//header
const header = document.createElement('section');
header.className = 'header';
container.appendChild(header);

//header title
const titleBox = document.createElement('section');
titleBox.className = 'title_box';
header.appendChild(titleBox);

const title = document.createElement('h1');
title.id = 'title';
title.textContent = 'libri';
titleBox.appendChild(title);*/

//main content
const mainContent = document.createElement('section');
mainContent.className = 'main_content';
container.appendChild(mainContent);

const title = document.createElement('h1');
title.id = 'title_blur';
title.textContent = 'FIND YOUR BOOK';
mainContent.appendChild(title);

const searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.placeholder = 'Cerca...';
searchBar.className = 'search_bar'
mainContent.appendChild(searchBar);
function Book(title, author, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}
function addBooksToLibrary(book) {
    books.push(book);
}
function getBookCard(book) {
    const index = books.indexOf(book);

    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index);

    const title = document.createElement('h4');
    title.textContent = book.title;
    card.appendChild(title);
    card.appendChild(document.createElement('hr'))

    const author = document.createElement('h4');
    author.textContent = 'By ' + book.author;
    card.appendChild(author);

    const pages = document.createElement('p');
    pages.textContent = `Pages - ${book.pages}`;
    card.appendChild(pages);

    const bookDeleteButton = document.createElement('i');
    bookDeleteButton.classList.add('fa', 'fa-trash', 'book-del');
    bookDeleteButton.style['color'] = '#ebaa48';
    bookDeleteButton.setAttribute('data-index', index);
    bookDeleteButton.addEventListener('click', deleteBook);

    const bookReadButton = document.createElement('i');
    bookReadButton.classList.add('fa', 'fa-check-circle', 'book-read');
    if(book.isRead)
        bookReadButton.classList.add('green-check');
    else
        bookReadButton.classList.add('red-check');
    bookReadButton.setAttribute('data-index', index);
    bookReadButton.addEventListener('click', toggleReadStatus);
    
    const row = document.createElement('div');
    row.classList.add('row');
    row.appendChild(bookReadButton);
    row.appendChild(bookDeleteButton);
    card.appendChild(row);

    return card;
}

function deleteBook(e) {
    const index = e.target.getAttribute('data-index');
    books.splice(index, 1);
    cardsGrid.removeChild(document.querySelector(`.card[data-index='${index}']`));
    let cards = document.querySelectorAll('.card');
    let delButtons = document.querySelectorAll('.book-del');
    let readButtons = document.querySelectorAll('.book-read');
    for(let i = 0; i < cards.length; ++i) {
        cards.item(i).setAttribute('data-index', i);
        delButtons.item(i).setAttribute('data-index', i);
        readButtons.item(i).setAttribute('data-index', i);
    }
}

function toggleReadStatus(e) {
    const index = parseInt(e.target.getAttribute('data-index'));
    book = books[index]
    book.isRead = !book.isRead;

    const bookReadButton = document.querySelector(`.book-read[data-index='${index}']`);
    if(book.isRead)
        bookReadButton.classList.replace('red-check', 'green-check');
    else
        bookReadButton.classList.add('green-check', 'red-check');
}

function render() {
    cardsGrid.innerHTML = '';
    books.forEach(book => cardsGrid.appendChild(getBookCard(book)));
}
function closeSideBar() {
    sidebar.style['right'] = '-260px';
}
function submitNewBook() {
    const titleElement = document.getElementById('title');
    const authorElement = document.getElementById('author');
    const pageElement = document.getElementById('pages');
    const readCheckBox = document.getElementById('read');

    const title = titleElement.value;
    const author = authorElement.value;
    const pages = pageElement.value;
    const read = readCheckBox.checked;

    if((title.length && author.length && pages.length) === 0) return;
    
    addBooksToLibrary(new Book(title, author, pages, read));
    cardsGrid.appendChild(getBookCard(books.slice(-1)[0]));
    closeSideBar();

    titleElement.value = '';
    authorElement.value = '';
    pageElement.value = '';
    readCheckBox.checked = false;
}

let books = [];
addBooksToLibrary(new Book('The Silent Patient', 'Alex Michaelides', '278'));
addBooksToLibrary(new Book('Northern Lights', 'Philip Pullman', '444', true));
addBooksToLibrary(new Book('The Stand', 'Stephen King', '1703'));
addBooksToLibrary(new Book('Looking for Alaska', 'John Green', '297', true));

const cardsGrid = document.getElementById('cards-grid');
const form = document.getElementById('new-book-form');
const sidebar = document.getElementById('sidebar')
render();

const sidebarOpenButton = document.getElementById('sidebar-open');
sidebarOpenButton.addEventListener('click', e => {
    sidebar.style['right'] = '0';
});

const sidebarCloseButton = document.getElementById('sidebar-close');
sidebarCloseButton.addEventListener('click', closeSideBar);

const submitButton = document.getElementById('new-book-submit');
submitButton.addEventListener('click', submitNewBook);

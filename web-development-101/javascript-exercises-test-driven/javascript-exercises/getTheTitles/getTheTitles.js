const getTheTitles = function(books) {
    let titles = books.map(book => book.title);
    return titles;
}

module.exports = getTheTitles;

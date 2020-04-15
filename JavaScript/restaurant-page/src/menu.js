let menuItemFactory = function(_name, _price, _imageURL) {
    const getName = () => _name;
    const getPrice = () => _price;
    const getImageUrl = () => _imageURL;
    return {getName, getPrice, getImageUrl};
}

let menupage = (
    function () {
        function _setTextContent(element, text) {
            element.textContent = text;
            return element;
        }
        function getCard(menuItem) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style['background-image'] = `linear-gradient(180deg, transparent 30%, #2a2a2c), url(${menuItem.getImageUrl()})`;
            card.appendChild(
                _setTextContent(document.createElement('h3'), menuItem.getName()));
            card.appendChild(
                _setTextContent(document.createElement('h3'), menuItem.getPrice()));
            return card;
        }
        function _getItems() {
            const items = [
                menuItemFactory('Special Biryani', '$15', 'https://cdn.pixabay.com/photo/2015/07/14/17/18/briyani-845111_960_720.jpg'),
                menuItemFactory('Grilled Steak', '$20', 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80'),
                menuItemFactory('Sushi', '$30', 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'),
                menuItemFactory('Meat Balls', '$12', 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80'),
                menuItemFactory('Brunch Combo', '$25', 'https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80'),
                menuItemFactory('Burger Duo', '$15', 'https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'),
                menuItemFactory('Pancakes', '$18', 'https://images.unsplash.com/photo-1478369402113-1fd53f17e8b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=662&q=80'),
                menuItemFactory('Pepperoni Pizza', '$30', 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'),
                menuItemFactory('Fried Chicken', '$25', 'https://images.unsplash.com/photo-1456404823214-a69ef7a1fae5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'),
                menuItemFactory('Fried Rice', '$20', 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80'),

            ];
            return items;
        }
        function render() {
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = '';

            const menuGrid = document.createElement('div');
            menuGrid.setAttribute('id', 'menu-grid');
            
            _getItems().forEach(item => menuGrid.appendChild(getCard(item)));
            contentDiv.appendChild(menuGrid);
        }
        return { render };
    }
)();

export { menupage };
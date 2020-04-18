let menuClassFactory = function(_name, _imageURL, _items) {
    const getName = () => _name;
    const getImageUrl = () => _imageURL;
    const getItems = () => _items;
    return {getName, getItems, getImageUrl};
}
let menuItemFactory = function(_name, _price) {
    const getName = () => _name;
    const getPrice = () => _price;
    return {getName, getPrice};
};
let menupage = (
    function () {
        function _setTextContent(element, text) {
            element.textContent = text;
            return element;
        }
        function getCard(menuItem) {
            const card = document.createElement('div');
            card.classList.add('card');
            
            const imageDiv = document.createElement('div');
            imageDiv.style['background-image'] = `url(${menuItem.getImageUrl()})`;

            const itemList = document.createElement('ul');

            const menuHeader = document.createElement('h4');
            menuHeader.textContent = menuItem.getName();
            menuHeader.style['border-bottom'] = '1px solid #22910c';
            menuHeader.style['margin-bottom'] = '0.5rem';
            itemList.appendChild(menuHeader);

            menuItem.getItems().forEach(item => itemList.appendChild(_setTextContent(document.createElement('li'), item.getName())));
            
            card.appendChild(imageDiv);
            card.appendChild(itemList);
            return card;
        }
        function _getMenu() {
            const menu = [
                menuClassFactory('Biryani', 'https://cdn.pixabay.com/photo/2015/07/14/17/18/briyani-845111_960_720.jpg',
                    [
                        menuItemFactory('Chicken Biryani', '$10'),
                        menuItemFactory('Mutton Biryani', '$16'),
                        menuItemFactory('Special Biryani', '$20')
                    ]),

                menuClassFactory('Steak', 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80',
                    [menuItemFactory('Grilled Steak', '$14')]),

                menuClassFactory('Sushi', 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                    [
                        menuItemFactory('Salmon Nigiri', '$25'),
                        menuItemFactory('Tuna Nigiri', '$22'),
                        menuItemFactory('Shrimp Nigiri', '$30'),
                        menuItemFactory('Sashimi', '25'),
                        menuItemFactory('Maki', '$25'),
                        menuItemFactory('Temaki', '$20')
                    ]),

                menuClassFactory('Starters', 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80',
                    [
                        menuItemFactory('Meat Balls', '$15'),
                        menuItemFactory('French Fries', '$8'),
                        menuItemFactory('Chicken Kebab', '!8'),
                        menuItemFactory('Mutton Kebab', '$25'),
                        menuItemFactory('Pancakes', '$15')
                    ]),

                menuClassFactory('Brunch Combo', 'https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',
                    [
                        menuItemFactory('Burger + Noodles + Coke', '$35'),
                        menuItemFactory('Burger + French Fries + Dessert', '$25'),
                        menuItemFactory('Sandwich + Chicken Nuggets + Coke')
                    ]),

                menuClassFactory('Burgers', 'https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
                    [
                        menuItemFactory('Regular Veg Burger', '12'),
                        menuItemFactory('Chicken Burger', '$16'),
                        menuItemFactory('Duo Burger', '$20 / $30'),
                        menuItemFactory('Jumbo Burger', '$30')
                    ]),

                menuClassFactory('Pizza', 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                    [
                        menuItemFactory('Pepperoni Pizza', '$30'),
                        menuItemFactory('Non Veg Deluxe', '45'),
                        menuItemFactory('Mushroom Deluxe', '$40')
                    ]),
                    
                menuClassFactory('Main Course', 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
                    [
                        menuItemFactory('Mixed Fried Rice', '$25'),
                        menuItemFactory('Chicken Fried Rice', '$18'),
                        menuItemFactory('Veg Fried Rice', '$15'),
                        menuItemFactory('Chilli Chicken', '$20'),
                        menuItemFactory('Butter Chicken', '$25'),
                        menuItemFactory('Mutton Curry', '$28'),
                        menuItemFactory('Butter Paneer', '$15')
                    ]),
            ];
            return menu;
        }
        function render() {
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = '';

            const menuGrid = document.createElement('div');
            menuGrid.setAttribute('id', 'menu-grid');
            
            _getMenu().forEach(item => menuGrid.appendChild(getCard(item)));
            contentDiv.appendChild(menuGrid);
        }
        return { render };
    }
)();

export { menupage };
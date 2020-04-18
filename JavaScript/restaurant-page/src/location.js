const locationFactory = function(_name, _address, _rating, _imageURL) {
    const getName = () => _name;
    const getAddress = () => _address;
    const getRating = () => _rating;
    const getImage = () => _imageURL;
    return {getName, getAddress, getRating, getImage};
}

const locationPage = (
    function() {
        function _setTextContent(element, text) {
            element.textContent = text;
            return element;
        }
        function _getCard(location) {
            const card = document.createElement('div');
            card.classList.add('card');

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('loc-info');
            infoDiv.style['background-image'] = `url(${location.getImage()})`;
            infoDiv.appendChild(_setTextContent(document.createElement('p'), location.getName()));
            infoDiv.appendChild(_setTextContent(document.createElement('p'), location.getAddress()));
            infoDiv.appendChild(_setTextContent(document.createElement('p'), 'Rating - ' + location.getRating()));

            card.appendChild(infoDiv)
            return card;
        }
        function _getLocations() {
            const locations = [
                locationFactory('Kolkata', 'Park Street', 4.6, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'),
                locationFactory('San Francisco', 'Pacific Avenue', 4.4, 'https://cdn.pixabay.com/photo/2015/03/26/09/54/restaurant-690569_960_720.jpg'),
                locationFactory('New York', 'Spring Street', 4.7, 'https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_960_720.jpg'),
                locationFactory('Paris', 'Avenue Gabriel', 4.6, 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
                locationFactory('Italy', 'Alberto Cadiolo', 4.6, 'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
                locationFactory('London', 'Kensington Park Road', 4.8, 'https://cdn.pixabay.com/photo/2017/01/24/03/54/urban-2004494_960_720.jpg')
            ];
            return locations;
        }
        function render() {
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = '';

            const locationGrid = document.createElement('div');
            locationGrid.setAttribute('id', 'loc-grid');
            _getLocations().forEach(location => locationGrid.appendChild(_getCard(location)));
            contentDiv.appendChild(locationGrid);
        }
        return { render };
    }
)();

export {locationPage};
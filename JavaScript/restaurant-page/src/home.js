let homepage = (
    function () {
        function _setTextContent(element, text) {
            element.textContent = text;
            return element;
        }
        function _getWelcomeMsg() {
            let welcomeMsgDiv = document.createElement('div');
            welcomeMsgDiv.setAttribute('id', 'welcome-msg');

            welcomeMsgDiv.appendChild(
                _setTextContent(document.createElement('h3'), 'Food Tales'
                ));
            welcomeMsgDiv.appendChild(
                _setTextContent(document.createElement('strong'), 'Special Food'));
            welcomeMsgDiv.appendChild(
                _setTextContent(document.createElement('span'), ' for'));

            welcomeMsgDiv.appendChild(document.createElement('br'));
            welcomeMsgDiv.appendChild(
                _setTextContent(document.createElement('span'),
                    ' your special Occassion')
            );
            welcomeMsgDiv.appendChild(document.createElement('br'));
            welcomeMsgDiv.appendChild(document.createElement('br'));

            welcomeMsgDiv.appendChild(
                _setTextContent(document.createElement('h5'),
                    'Enjoy meals from the best chefs who pour in all their love')
            );
            welcomeMsgDiv.appendChild(
                _setTextContent(document.createElement('h5'),
                    ' and the right spices')
            );

            const orderButton = document.createElement('button');
            orderButton.setAttribute('id', 'order-btn');
            orderButton.textContent = 'Order Now';
            welcomeMsgDiv.appendChild(orderButton);
            return welcomeMsgDiv;
        }

        function _getSocialLinks() {
            const links = document.createElement('ul');
            links.setAttribute('id', 'social-links');
            const linkTexts = ['Instagram', 'Twitter', 'Facebook'];
            for (let i in linkTexts) {
                const link = _setTextContent(document.createElement('a'), linkTexts[i]);
                link.setAttribute('href', '#');
                const linkListElement = document.createElement('li');
                linkListElement.appendChild(link);
                links.appendChild(linkListElement);
            }
            return links;
        }

        function render() {
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = '';
            contentDiv.appendChild(_getWelcomeMsg());
            const bkImageDiv = document.createElement('div');
            bkImageDiv.setAttribute('id', 'home-img');
            contentDiv.appendChild(bkImageDiv);
            contentDiv.appendChild(_getSocialLinks());
        }
        return { render };
    }
)();

export { homepage };
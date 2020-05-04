function createCarousel(images) {
    const carousel = document.createElement('div');
    carousel.style.overflow = 'hidden';
    carousel.style.position = 'relative';
    carousel.style.height = '500px';
    carousel.style.display = 'flex';
    let _currentIndex = 0;

    function _getImage(src) {
        const imageDiv = document.createElement('div');
        imageDiv.setAttribute('class', 'carousel-image');
        imageDiv.style.transition = '400ms';
        imageDiv.style.backgroundImage = `url(${src})`;
        imageDiv.style.backgroundSize = 'cover';
        imageDiv.style.backgroundPosition = '50% 50%';
        imageDiv.style.height = '100%';
        imageDiv.style.minWidth = '100%';
        return imageDiv;
    }
    function _applyButtonStyles(button) {
        button.style.color = 'white';
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
        button.style.height = '2rem';
        button.style.width = '2rem';
        button.style.borderRadius = '50%';
        button.style.display = 'flex';
        button.style.justifyContent = 'center';
        button.style.alignItems = 'center';
        button.style.fontWeight = 'bold';
        button.style.fontSize = '1.3rem';
        button.style.cursor = 'pointer';
    }
    const nextButton = document.createElement('div');
    nextButton.textContent = '>';
    nextButton.style.position = 'absolute';
    nextButton.style.top = '50%';
    nextButton.style.right = '5%';
    _applyButtonStyles(nextButton);
    nextButton.addEventListener('click', e => {
        _currentIndex = (_currentIndex + 1) % images.length;
        const firstImage = document.querySelector('.carousel-image:first-child');
        firstImage.style.marginLeft = `calc(${-(_currentIndex)} * 100%)`;
    });

    const previousButton = document.createElement('div');
    previousButton.textContent = '<';
    previousButton.style.position = 'absolute';
    previousButton.style.top = '50%';
    previousButton.style.left = '5%';
    _applyButtonStyles(previousButton);
    previousButton.addEventListener('click', e => {
        _currentIndex = _currentIndex === 0? (images.length - 1) : (_currentIndex - 1);
        const firstImage = document.querySelector('.carousel-image:first-child');
        firstImage.style.marginLeft = `calc(${-(_currentIndex)} * 100%)`;
    });

    images.forEach(image => {
        carousel.appendChild(_getImage(image));
    });
    carousel.appendChild(previousButton);
    carousel.appendChild(nextButton);
    return carousel;
}

export {createCarousel};
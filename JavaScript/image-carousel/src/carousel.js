function createCarousel(images) {
    const carousel = document.createElement('div');
    carousel.style.overflow = 'hidden';
    carousel.style.position = 'relative';
    carousel.style.height = '100%';
    carousel.style.margin = '1rem';
    carousel.style.display = 'flex';
    carousel.classList.add('carousel');
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
        button.style.position = 'absolute';
        button.style.top = '50%';
        button.style.color = 'white';
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
    function _getNavDot(index) {
        const navDot = document.createElement('div');
        navDot.classList.add('carousel-nav-dot');
        navDot.style.height = '1rem';
        navDot.style.width = '1rem';
        navDot.style.margin = '0 1rem';
        navDot.style.borderRadius = '50%';
        navDot.style.background = 'white';
        navDot.addEventListener('mouseup', () => {
            if (index === _currentIndex) return;
            const firstImage = document.querySelector('.carousel-image:first-child');
            _currentIndex = index;
            firstImage.style.marginLeft = `calc(${-(index)} * 100%)`;
        });
        return navDot;
    }

    const nextButton = document.createElement('i');
    nextButton.classList.add('fa', 'fa-chevron-right');
    nextButton.style.right = '1rem';
    _applyButtonStyles(nextButton);
    nextButton.addEventListener('click', e => {
        _currentIndex = (_currentIndex + 1) % images.length;
        const firstImage = document.querySelector('.carousel-image:first-child');
        firstImage.style.marginLeft = `calc(${-(_currentIndex)} * 100%)`;
    });

    const previousButton = document.createElement('i');
    previousButton.classList.add('fa', 'fa-chevron-left');

    previousButton.style.left = '1rem';
    _applyButtonStyles(previousButton);
    previousButton.addEventListener('click', e => {
        _currentIndex = _currentIndex === 0? (images.length - 1) : (_currentIndex - 1);
        const firstImage = document.querySelector('.carousel-image:first-child');
        firstImage.style.marginLeft = `calc(${-(_currentIndex)} * 100%)`;
    });

    const navDotsDiv = document.createElement('div');
    navDotsDiv.style.position = 'absolute';
    navDotsDiv.style.bottom = '1rem';
    navDotsDiv.style.left = '50%';
    navDotsDiv.style.transform = 'translateX(-50%)';
    navDotsDiv.style.display = 'flex';
    navDotsDiv.style.justifyContent = 'center';
    navDotsDiv.style.alignItems = 'center';

    let _dotIndex = 0;

    images.forEach(image => {
        carousel.appendChild(_getImage(image));
        navDotsDiv.appendChild(_getNavDot(_dotIndex++));
    });
    carousel.appendChild(previousButton);
    carousel.appendChild(nextButton);
    carousel.appendChild(navDotsDiv);
    return carousel;
}

export {createCarousel};
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
        index === 0 && navDot.classList.add('active');
        navDot.style.height = '1rem';
        navDot.style.width = '1rem';
        navDot.style.margin = '0 1rem';
        navDot.style.borderRadius = '50%';
        navDot.style.background = index === 0? 'white' : 'black';
        navDot.style.border = '2px solid white';
        navDot.addEventListener('mouseup', () => {
            if (index === _currentIndex) return;
            _currentIndex = index;
            _changeCurrentDot();
            _changeMargin();
        });
        return navDot;
    }
    function _changeCurrentDot() {
        const currentDot = document.querySelector('.carousel-nav-dot.active');
        currentDot.classList.remove('active');
        currentDot.style.background = 'black';

        const newDot = document.querySelector(`.carousel-nav-dot:nth-child(${_currentIndex + 1})`);
        newDot.classList.add('active');
        newDot.style.backgroundColor = 'white';
    }

    function _nextImage() {
        _currentIndex = (_currentIndex + 1) % images.length;
        _changeCurrentDot();
        _changeMargin();
    }

    function _previousImage() {
        _currentIndex = _currentIndex === 0? (images.length - 1) : (_currentIndex - 1);
        _changeCurrentDot();
        _changeMargin();
    }

    function _changeMargin() {
        const firstImage = document.querySelector('.carousel-image:first-child');
        firstImage.style.marginLeft = `calc(${-(_currentIndex)} * 100%)`;
    }

    let _autoSwitchInterval;
    function startAutoSwitch(ms = 5000) {
        _autoSwitchInterval = setInterval(_nextImage, ms);
    }

    function stopAutoSwitch() {
        clearInterval(_autoSwitchInterval);
    }

    const nextButton = document.createElement('i');
    nextButton.classList.add('fa', 'fa-chevron-right');
    nextButton.style.right = '1rem';
    _applyButtonStyles(nextButton);
    nextButton.addEventListener('click', _nextImage);

    const previousButton = document.createElement('i');
    previousButton.classList.add('fa', 'fa-chevron-left');

    previousButton.style.left = '1rem';
    _applyButtonStyles(previousButton);
    previousButton.addEventListener('click', _previousImage);

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

    return {
        carousel,
        startAutoSwitch,
        stopAutoSwitch,
    };
}

export {createCarousel};
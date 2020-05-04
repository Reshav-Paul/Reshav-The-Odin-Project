import {createCarousel} from './carousel.js';

const carouselContainer = document.getElementById('carousel-container');
const carousel = createCarousel([
    'https://cdn1-www.playstationlifestyle.net/assets/uploads/2020/05/ac-valhalla-god-of-war.jpg',
    'https://cdn3-www.playstationlifestyle.net/assets/uploads/2020/04/BossLogic-AC-Valhalla-setting-art.jpg',
    'https://cdn1-www.playstationlifestyle.net/assets/uploads/2020/05/ac-valhalla-warriors.jpg'
]);
carouselContainer.appendChild(carousel);

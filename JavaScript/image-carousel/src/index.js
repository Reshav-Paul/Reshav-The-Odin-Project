import {createCarousel} from './carousel.js';

const carouselContainer = document.getElementById('carousel-container');
carouselContainer.style.height = '500px';
const carouselController = createCarousel([
    'https://cdn1-www.playstationlifestyle.net/assets/uploads/2020/05/ac-valhalla-god-of-war.jpg',
    'https://cdn3-www.playstationlifestyle.net/assets/uploads/2020/04/BossLogic-AC-Valhalla-setting-art.jpg',
    'https://cdn1-www.playstationlifestyle.net/assets/uploads/2020/05/ac-valhalla-warriors.jpg'
]);
carouselContainer.appendChild(carouselController.carousel);
carouselController.startAutoSwitch(5000);

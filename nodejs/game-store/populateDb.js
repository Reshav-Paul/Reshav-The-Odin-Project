require('dotenv').config();
var async = require('async');

var mongoose = require('mongoose');
mongoose.connect(process.env.mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let Game = require('./models/Game');
let Category = require('./models/Category');

let categories = [];
let games = [];

function categoryCreate({ name, description, abbreviation, imageUrl }, cb) {
    let categoryDetail = { name, description };
    if (imageUrl) categoryDetail.imageUrl = imageUrl;
    if (abbreviation) categoryDetail.abbreviation = abbreviation;

    let category = new Category(categoryDetail);

    category.save(function (err) {
        if (err) {
            cb(err);
            return;
        }
        console.log('New Category: ' + category);
        categories.push(category);
        cb(null, category);
    });
}

function gameCreate({ name, description, releaseDate, price, imageUrl, category }, cb) {
    let gameDetail = { name, description, category };
    if (releaseDate) gameDetail.releaseDate = releaseDate;
    if (price != undefined) gameDetail.price = price;
    if (imageUrl) gameDetail.imageUrl = imageUrl;

    let game = new Game(gameDetail);
    game.save(function (err) {
        if (err) {
            cb(err);
            return;
        }
        console.log('New Game: ' + game);
        games.push(game);
        cb(null, game);
    });
}

function createCategories(cb) {
    async.series([
        function(callback) {
            categoryCreate({
                name: 'AAA',
                description: 'AAA (pronounced and sometimes written Triple-A) is an informal classification used for video games produced and distributed by a mid-sized or major publisher, typically having higher development and marketing budgets.',
                imageUrl: 'https://steemitimages.com/DQmWwiRsyMxUx68dZ4xpPWNroyTR2gjgZqpqDpwCqSthbmD/image.png'
            }, callback);
        },

        function(callback) {
            categoryCreate({
                name: 'Indie',
                description: 'An independent video game or indie game is a video game typically created by individuals or smaller development teams without the financial and technical support of a large game publisher, in contrast to most "AAA" games.',
                imageUrl: 'https://staticg.sportskeeda.com/editor/2019/03/c84da-15540222643999-800.jpg'
            }, callback);
        },

        function(callback) {
            categoryCreate({
                name: 'Role Playing Games',
                abbreviation: 'RPG',
                description: 'A role-playing game (sometimes spelled roleplaying game abbreviated RPG) is a game in which players assume the roles of characters in a fictional setting. Players take responsibility for acting out these roles within a narrative, either through literal acting, or through a process of structured decision-making regarding character development.',
                imageUrl: 'https://thebiem.com/wp-content/uploads/2019/03/best-rpg-games-feature-smaller.jpg.webp'
            }, callback);
        },

        function(callback) {
            categoryCreate({
                name: 'First Person Shooter',
                abbreviation: 'FPS',
                description: 'First-person shooter (FPS) is a video game genre centered on gun and other weapon-based combat in a first-person perspective; that is, the player experiences the action through the eyes of the protagonist.',
                imageUrl: 'https://images.pushsquare.com/ce1c595d15e46/best-ps4-fps-games.original.jpg'
            }, callback);
        }
    ], cb);
}

function createGames(cb) {
    async.parallel([
        function(callback) {
            gameCreate({
                name: 'The Witcher 3',
                description: 'The Witcher: Wild Hunt is a story-driven open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences. In The Witcher, you play as professional monster hunter Geralt of Rivia tasked with finding a child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.',
                category: [categories[0]._id, categories[2]._id],
                releaseDate: new Date(2015, 4, 18),
                price: 10.99,
                imageUrl: 'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fthe-witcher-3%2Fhome%2FEGS_TheWitcher3WildHuntGameoftheYear_CDPROJEKTRED_S2-1200x1600-18cdb76f3933896846726cc5cd1c91026db56dce.jpg'
            }, callback);
        },
        function (callback) {
            gameCreate({
                name: 'NieR: Automata',
                description: 'NieR: Automata tells the story of androids 2B, 9S and A2 and their battle to reclaim the machine-driven dystopia overrun by powerful machines. Humanity has been driven from the Earth by mechanical beings from another world. In a final effort to take back the planet, the human resistance sends a force of android soldiers to destroy the invaders. Now, a war between machines and androids rages on... A war that could soon unveil a long-forgotten truth of the world.',
                category: [categories[0]._id, categories[2]._id],
                releaseDate: new Date(2017, 1, 23),
                price: 17.99,
                imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81lU6FM6o5L._SX425_.jpg'
            }, callback)
        },
        function(callback) {
            gameCreate({
                name: 'Call of Duty: Black Ops II',
                description: 'Pushing the boundaries of what fans have come to expect from the record-setting entertainment franchise, Call of Duty®: Black Ops II propels players into a near future, 21st Century Cold War, where technology and weapons have converged to create a new generation of warfare.',
                category: [categories[0]._id, categories[3]._id],
                releaseDate: new Date(2012, 10, 12),
                price: 52.99,
                imageUrl: 'https://i5.walmartimages.com/asr/8a04e675-6fe9-4c79-bdcf-6afee170f2b7_1.2704a1f8aff82f40153df7ad20b9f89c.jpeg'
            }, callback);   
        }        
    ], cb);
}

async.series([
    createCategories,
    createGames
], function (err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    mongoose.connection.close();
});
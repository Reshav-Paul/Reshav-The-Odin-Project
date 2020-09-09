var express = require('express');
var router = express.Router();

const messages = [
  {
    user: 'Robert Frost',
    text: 'The best way out is always through.',
    added: new Date(),
  }, 
  {
    user: 'Ralph Waldo Emerson',
    text: 'Always Do What You Are Afraid To Do',
    added: new Date(),
  },
  {
    user: 'Gandhi',
    text: 'You must be the change you wish to see in the world.',
    added: new Date(),
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

router.get('/new', function(req, res, next) {
  res.render('form', {title: 'Create New Message'});
});

router.post('/new', function(req, res, next) {
  const name = req.body.name.trim();
  const msg = req.body.msg.trim();
  if (name.length == 0 || msg.length == 0) {
    res.render('form', {
      title: 'Create New Message',
      name: name,
      msg: msg,
      error: 'Both name and message should be non empty.'
    });
    return;
  }
  messages.push({user: name, text: msg, added: new Date()});
  res.redirect('/');
});

module.exports = router;

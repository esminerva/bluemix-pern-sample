let express = require('express');
let router = express.Router();

// CRUD operations for comment
router.post('/', (req, res) => {
  const text = req.body.text;
  const author = req.session.author;
  const twitter = req.session.twitter;
  const imageURL = req.session.imageURL;

  if (!text || !author || !twitter || !imageURL ) {
    res.json({ message: 'Not signed in'});
    return
  }

  if(!text) {
    res.status(400).send('text is required');
    return;
  }

  req.Comment.create({
    id: req.body.id,
    author: author,
    text: text,
    twitter: twitter,
    imageURL: imageURL
  })
    .then(data => {
      res.status(201).json(data);
    }).error(err => {
      console.log(err);
      res.status(500).send('Failed to create comment');
    });
});

router.get('/', (req, res) => {
  req.Comment.findAll({
    order: [['updated_at', 'DESC']]
  }).then(data => {
    res.status(200).json(data);
  }).error(err => {
    console.log(err);
    res.status(500).send('Failed to query for comments');
  });
});

router.get('/:id', (req, res) => {
  req.Comment.findById(req.params.id).then(data => {
    res.status(200).json(data);
  }).error(err => {
    console.log(err);
    res.status(500).send('Failed to query for comments with id: ' + req.params.id);
  });
});

router.put('/:id', (req, res) => {
  var comment = req.body;
  comment.id = req.params.id;

  req.Comment.update(comment, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).json(comment);
  }).error(err => {
    console.log(err);
    res.status(500).send('Failed to update comment');
  });
});

router.delete('/:id', (req, res) => {
  req.Comment.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).json(req.params.id);
  }).error(err => {
    console.log(err);
    res.status(500).send('Failed to delete comment');
  });
});

router.post('/logout', (req, res) => {

  req.session.destroy();

  res.json({ message: 'Successfully logged out' });
});

router.post('/login', (req, res) => {
  const author = req.body.author;
  const twitter = req.body.twitter;
  const imageURL = req.body.imageURL;

  req.session.author = author;
  req.session.twitter = twitter;
  req.session.imageURL = imageURL;

  res.json({ message: 'Successfully logged in' });

});

router.get('/session', (req, res) => {
  res.json({
    author: req.session.author,
    twitter: req.session.twitter,
    imageURL: req.session.imageURL
  });
});


module.exports = router;

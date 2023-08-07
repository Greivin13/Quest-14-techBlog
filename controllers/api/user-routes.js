const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: {
      exclude: ['password'] // Exclude password from the retrieved user data
    }
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Get specific user by ID
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: {
      exclude: ['password'] // Exclude password from the retrieved user data
    },
    where: {
      id: req.params.id // Find user by ID specified in the request parameters
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'content', 'created_at'] // Include the user's posts with specific attributes
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'], // Include the user's comments with specific attributes
        include: {
          model: Post,
          attributes: ['title'] // Include the title of the post associated with each comment
        }
      }
    ]
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({
        message: 'No user found with this id'
      });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Create a new user
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password // Create a new user with the provided username and password
  })
  .then(dbUserData => {
    // Save the session after creating a new user
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// User login
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username // Find the user by the provided username
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({
        message: 'No user with that username!'
      });
      return;
    }

    // Save the session after successful login
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({
        user: dbUserData,
        message: 'You are now logged in!'
      });
    });

    // Check if the provided password matches the user's password in the database
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({
        message: 'Incorrect password!'
      });
      return;
    }

    // Save the session again after successful password verification
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({
        user: dbUserData,
        message: 'You are now logged in!'
      });
    });
  });
});

// User logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Destroy the session to log the user out
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

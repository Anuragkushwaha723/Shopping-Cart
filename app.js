const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { name } = require('ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("64bd17cdfbb177b871569abe")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('')
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'test',
          email: 'test@gmail.com',
          cart: {
            items: []
          }
        })
        user.save();
      }
    })
    app.listen(3000);
  })
  .catch(err => console.log(err));
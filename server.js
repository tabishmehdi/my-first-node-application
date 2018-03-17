const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('capital', (text) => {
  return text.toUpperCase();
});




app.use((req, res, next) => {
  var now = new Date();
  var log = `${now}: ${req.method} ${req.url} ${req.ip}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to log');
    }
  });
  console.log(log);
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/Public'));

// Response is in html format
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    someText: 'Welcome Home!'
  });
});


// Response is in json format
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage : 'Its a bad request'
  });
});


app.listen(3000, () => {
  console.log('server is up and running at port 3000');
});

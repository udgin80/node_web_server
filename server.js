const express = require('express');
const hbs = require('hbs');
const fs =  require('fs');


var app = express();

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.upperCase();
});
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();

    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenence.hbs');
// });

app.use(express.static(__dirname + '/public'));




app.get('/', (req, res) => {
  res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: "Welcome to my web"
  })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errror: 'This is a error page'
    })
})

app.listen(3000, () => {
    console.log('Server is pu on port 3000');
});


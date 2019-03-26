const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const title = 'Log In or Sign Up';

    res.render('index', {
        title: title,
        
    });
});

app.get('/welcome', (req,res) => {
   res.render('welcome')
    })

    const port = process.env.PORT || 5051;


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
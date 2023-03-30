const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl'); 

const app = express();

// mongoose.connect('mongodb://localhost/urlshortener', {
//     useNewUrlParser: true, useUnifiedTopology: true
// })
// mongoose.connect('mongodb://localhost/urlshortener')
mongoose.connect('mongodb://0.0.0.0/urlshortener')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

// app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.static("public"));

// app.get("/", function (res, req) {
app.get("/", async (req, res) => {    
    // res.send("hello.");
    const shortUrls = await ShortUrl.find()
    res.render('Content', {shortUrls: shortUrls});
});

app.post("/shortUrls", async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
    res.redirect("/")
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

// app.listen(3000, function () {
app.listen(process.env.PORT || 3000, function () {    
    console.log("server available on port 3000");
});
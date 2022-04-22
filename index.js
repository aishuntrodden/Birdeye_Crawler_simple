const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const reviewCrawler = require('./Crawlers/reviewDetails')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/getReviewDetails', async function (req, res) {
    console.log('Hello', req.body);
    let getDom = await reviewCrawler.getDom(req.body.url[0]);
    let extractData = await reviewCrawler.extractData(getDom);
    res.status(200).send(extractData)

})


console.log('Server running on port :3000');
console.log('Endpoint is :http://localhost:3000/getReviewDetails');
app.listen(3000)
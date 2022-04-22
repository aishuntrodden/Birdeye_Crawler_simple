const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

module.exports.getDom = (async (url) => {
    try {
        return new Promise(async (resolve, reject) => {

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);

            let bodyHTML = await page.evaluate(() => document.body.innerHTML);
            //   await page.screenshot({ path:url });
            await browser.close();

            resolve(bodyHTML)
        })
    }
    catch (err) {
        reject(err)
    }
})


module.exports.extractData = async function (html) {
    try {
        return new Promise((resolve, reject) => {
            let result = []
            var $ = cheerio.load(html);


            for (let i = 0; i < $('#customerReviews div').length; i++) {
                let check = $(`#customerReviews div:nth-of-type(${i})#customerReviews div.review`).text()
                if (check == '') {

                } else {
                    let object = {
                        reviewerName: $(`#customerReviews div:nth-of-type(${i})#customerReviews div.review`).text().split('Reviewer:')[1].split('Date')[0].trim(),
                        comment: $(`#customerReviews div:nth-of-type(${i}) .rightCol p`).text(),
                        reviewDate: $(`#customerReviews div:nth-of-type(${i})#customerReviews div.review`).text().split('Date:')[1].trim().split('\n')[0],
                        rating: $(`#customerReviews div:nth-of-type(${i})#customerReviews div.review`).text().split('Overall')[1].trim().split('Value')[0].trim()
                    }
                    result.push(object);
                }

            }
            resolve(result)
        })
    }
    catch (err) {
        console.log('Error in extract data function', err);
        reject(err)
    }
}
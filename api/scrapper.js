const puppeteer = require('puppeteer');
function run() {
  myUrl = 'https://apod.nasa.gov/apod/archivepix.html'
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(myUrl);
      let urls = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll('b > a');
        for (i = 0; i < 50; i++) {
          results.push({
            url: items[i].getAttribute('href')
          })
        }
        return results;
      })
      browser.close();
      return resolve(urls);
    } catch (e) {
      return reject(e);
    }
  })
}
run().then(console.log).catch(console.error);
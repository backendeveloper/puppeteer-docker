
const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });

    const page = await browser.newPage();

    await page.goto('https://www.sahibinden.com/ilan/emlak-konut-satilik-b.duzu-metrobuse-5dk-125m2-tertemiz-daire-iskanli-yeni-yapi-654470042/detay', { waitUntil: 'networkidle2' });

    const links = await page.evaluate(() => {
        const featureArticle = document
            .evaluate(
                '//*[@id="classifiedDetail"]/div[1]/div[1]/h1',
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            )
            .singleNodeValue;

        if (featureArticle == null) {
            return 'Blocked!';
        }

        return featureArticle.textContent;
    });
    console.log(links);

    browser.close();

})();

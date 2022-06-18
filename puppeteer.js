const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { getProductsData } = require("./product/product");

const scrape = async (shopName = "babykoi2014", pageNum = 1) => {
  const browser = await puppeteer.launch();
  const products = [];
  for (let i = 0; i < pageNum; i++) {
    const page = await browser.newPage();
    let url = `https://shopee.vn/${shopName}?page=${i}&sortBy=sales`;
    await page.goto(url);
    console.log(url);
    await scrollToBottom(page);

    await page.waitForTimeout(2000);

    const html = await page.content();

    // Lấy thông tin các sp trên trang
    try {
      const res = await getProductsData(html);
      console.log("Cai nay can xuat hien sau: ", res);
    } catch (e) {
      console.log("Lỗi rồi: ", e);
      process.exit();
    }
  }
  // let date = new Date().toISOString().slice(0, 10);
  // let fileName = `${shopName}_${date}.json`;
  // let savePath = path.join(__dirname, "./scraped/");
  // fs.writeFileSync(`${savePath}${fileName}`, JSON.stringify(products));
  await browser.close();
};
async function scrollToBottom(page) {
  const distance = 100; // should be less than or equal to window.innerHeight
  const delay = 400;
  while (
    await page.evaluate(
      () =>
        document.scrollingElement.scrollTop + window.innerHeight <
        document.scrollingElement.scrollHeight
    )
  ) {
    await page.evaluate((y) => {
      document.scrollingElement.scrollBy(0, y);
    }, distance);
    await page.waitForTimeout(delay);
  }
}

module.exports.scrape = scrape;

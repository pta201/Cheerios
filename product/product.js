const axios = require("axios").default;
const fs = require("fs");
const cheerio = require("cheerio");

const scan = async (html) => {
  let productLst = [];

  let $ = cheerio.load(html);
  const items = $(".shop-search-result-view__item").toArray();
  for (let i = 0; i < items.length; i++) {
    const el = items[i];
    let url;
    if (el.name === "a") {
      url = el.attribs.href;
    }
    let ids = url.split("?")[0].match(/\d+/g).slice(-2);
    let product = await callApi(ids[0], ids[1]);
    productLst.push(product);
    // make an asynchronous call to a API
  }
  // $(".shop-search-result-view__item").each(async (index, elem) => {
  //   //Lấy link sp
  //   let url = $(elem).children("a")[0].attribs.href;
  //   //Lấy shopId và productId từ link sp
  //   let ids = url.split("?")[0].match(/\d+/g).slice(-2);

  //   let product = await callApi(ids[0], ids[1]);
  //   console.log(product);
  //   console.log("cbi push ne");

  //   productLst.push(product);

  //   if (index === $(".shop-search-result-view__item").length - 1) {
  //     return productLst;
  //   }
  // });
  return productLst;
};
const getProductsData = async (html) => {
  const rs = await scan(html);
  console.log(rs);

  return rs;
};

const callApi = async (shopId, productId) => {
  let data;
  const url = `https://shopee.vn/api/v4/item/get?itemid=${productId}&shopid=${shopId}`;
  // console.log(url);
  try {
    const response = await axios.get(url);
    data = response.data.data;
    return xulyData(data);
  } catch (err) {
    // console.log(err);
  }
};

const xulyData = (data) => {
  product = {
    itemId: data.itemid,
    shopId: data.shopid,
    name: data.name,
    price: [data.price_min, data.price_max],
    totalSales: data.historical_sold,
    salesPerMonth: data.sold,
  };
  return product;
};

module.exports.getProductsData = getProductsData;

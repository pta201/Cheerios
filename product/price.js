const getProductPrice = (elemText) => {
  try {
    // Lấy giá trị cho mảng price
    let price = [];
    if (elemText.includes("Mum's Club") && elemText.includes("/tháng")) {
      price = elemText.match(/₫(.*)Đ/)[0].split("₫");
    } else if (elemText.includes("Mum's Club")) {
      price = elemText.match(/k₫(.*)Đ/)[0].split("₫");
    } else if (!elemText.includes("Đã bán")) {
      price = elemText.match(/t₫(.*)\w/)[0].split("₫");
    } else {
      price = elemText.match(/t₫(.*)Đ/)[0].split("₫");
    }

    // Xử lý mảng price
    if (price[1].includes("-")) {
      let priceStart = price[1].slice(0, price[1].length - 3);
      let priceEnd = price[2].slice(0, price[2].length - 1);
      price = [priceStart, priceEnd];
    } else if (price.length == 2) {
      price = price[1].slice(0, price[1].length - 1);
    } else {
      price = price[2].slice(0, price[2].length - 1);
    }
    return price;
  } catch (e) {
    console.error("Lỗi khi lấy giá: " + elemText);
  }
};

module.exports.getProductPrice = getProductPrice;

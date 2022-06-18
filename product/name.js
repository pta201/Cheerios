const getProductName = (elemText) => {
  try {
    if (elemText.includes("giảm") && !elemText.includes("Yêu thích")) {
      return elemText.match(/giảm(.*)(\d%)/)[1].slice(0, -1);
    }
    if (elemText.includes("Mum's Club")) {
      return elemText.match(/giảm(.*)Giá/)[1];
    }
    if (elemText.includes("giảm") && elemText.includes("Giảm")) {
      return elemText.match(/giảm(.*)Giảm/)[1];
    }
    if (elemText.includes("giảm") && !elemText.includes("Giảm")) {
      return elemText.match(/giảm(.*)ShopDacBiet/)[1];
    }
    if (
      !elemText.includes("giảm") &&
      !elemText.includes("Giảm") &&
      elemText.includes("Yêu thích")
    ) {
      return elemText.match(/Yêu thích(.*)ShopDacBiet/)[1];
    }
  } catch (e) {
    console.error("Lỗi khi lấy tên: " + elemText);
  }
};

module.exports.getProductName = getProductName;

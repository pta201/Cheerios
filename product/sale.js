//Xử lý lượt bán trên tháng
const getSalesPerMonth = (elemText) => {
  try {
    let salesPerMonth = 0;
    // if (elemText.includes("Đã bán:")) {
    salesPerMonth = elemText.match(/bán (.*)\/t/)[1];
    // }
    return salesPerMonth;
  } catch (e) {
    console.error("Lỗi khi lấy lượt bán trên tháng: " + elemText);
    return 0;
  }
};
module.exports.getSalesPerMonth = getSalesPerMonth;

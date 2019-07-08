const prod = process.env.NODE_ENV === "production";

module.exports = {
  "process.env.BASE_URL": prod ? "https://hollingworth-portfolio-test.herokuapp.com" : "http://localhost:3000",
  "process.env.NAMESPACE": "https://hollingworth-portfolio-test.herokuapp.com",
  "process.env.CLIENT_ID": "3v8jHpE5nNT7Ipadrp2aqSj0nZs0LtbZ"
};
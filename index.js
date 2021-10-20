const express = require('express')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');

express()
  .set('views', require('path').join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/test', readTopPage)

  .listen(PORT, () => console.log(`Listening on ${PORT}`))

//環境変数より、接続文字列を取得
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

//TOP画面読み込み
function readTopPage(req, res, next) {
  const client = pool.connect()
    .then(() => { console.log("Connected successfuly"); })
    .catch(() => { console.log("Error"); })
  res.render("pages/main.ejs");
}

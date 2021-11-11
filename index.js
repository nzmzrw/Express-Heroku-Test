const express = require('express')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');

express()
  .set('views', require('path').join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('', readTopPage)

  .listen(PORT, () => console.log(`Listening on ${PORT}`))

//環境変数より、接続文字列を取得
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
pool.connect()
  .then(console.log("Client disconnected successfully"));


//TOP画面読み込み
async function readTopPage(req, res, next) {
  try {

    //DB接続
    // await pool.connect()
  
    //テーブル取得
    const result = await pool.query('select * from ramen')
    console.table(result.rows)

    //取得したデータで、テーブルを生成
    let items = [];
    items = result.rows;

    res.render("pages/main.ejs", {
      items: items,
    });
  }
  catch (ex) {
    console.log(`Something wrong happend ${ex}`)
  }}

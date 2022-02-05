const express = require('express')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');

express()
  .set('views', require('path').join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(express.static('public'))
  .get('', readTopPage)
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

//環境変数より、接続文字列を取得
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
pool.connect()
  .then(console.log("Client disconnected successfully"));


  // アクセス数
  let test = 0;

//TOP画面読み込み
async function readTopPage(req, res, next) {
  try {
    //テーブル取得
    const result = await pool.query('select * from ramen')
    console.table(result.rows)

    //取得したデータで、テーブルを生成
    let items = [];
    items = result.rows;

    res.render("pages/main.ejs", {
      items: items,
    });

    test++;
    console.log("Access Count ; " + test);
  }
  catch (ex) {
    console.log(`Something wrong happend ${ex}`)
  }
}

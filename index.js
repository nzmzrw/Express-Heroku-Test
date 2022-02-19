const express = require('express')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');

const a_filename = "AccessCounter.txt" // Access数記録ファイル名
let Access = 0; //アクセス数

App_Start();
process.on("SIGINT", App_PreEnd); // Ctrl + C 用
process.on('exit', App_End); // プロセス終了

express()
  .set('views', require('path').join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(express.static('public'))
  .get('', Page_home)
  .get('/about', Page_about)
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

//環境変数より、接続文字列を取得
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
pool.connect()
  .then(console.log("Database Connected."));

//TOP画面読み込み
async function Page_home(req, res, next) {
  try {
    //テーブル取得
    const result = await pool.query('select * from ramen')

    //取得したデータで、テーブルを生成
    let items = [];
    items = result.rows;

    // アクセス数記録
    Access++;
    console.log("Access Count : " + Access.toString());

    //ページ表示
    res.render("pages/home.ejs", {
      items: items,
      Access: Access,
    });
  }
  catch (ex) {
    console.log(`Something wrong happend ${ex}`)
  }
}

async function Page_about(req, res, next) {
  try {
    //テーブル取得
    const result = await pool.query('select * from ramen')

    //取得したデータで、テーブルを生成
    let items = [];
    items = result.rows;

    // アクセス数記録
    Access++;
    console.log("Access Count : " + Access.toString());

    //ページ表示
    res.render("pages/about.ejs", {
      items: items,
      Access: Access,
    });
  }
  catch (ex) {
    console.log(`Something wrong happend ${ex}`)
  }
}

function App_Start() {
  //アクセス数ファイル読み込み
  const fs = require("fs");
  if (fs.existsSync(a_filename)) {
    fs.readFile(a_filename, "utf-8", (err, fd) => {
      if (err) {
        throw err;
      }
      Access = fd.toString();
      console.log("Access Count : " + Access.toString() + " (Init)");
    });
  }
}

function App_PreEnd() {
  process.exit(0);
}

function App_End() {
  var fs = require('fs');
  var text = Access.toString();
  fs.writeFileSync(a_filename, text);

  pool.end();
  console.log("Process End.");
}

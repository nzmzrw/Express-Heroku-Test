const express = require('express')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');

express()
  .use(express.static('public'))
  .set('views', require('path').join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    const client = pool.connect()
      .then(() => { console.log("Connected successfuly"); })
      .catch(() => { console.log("Error"); })
    client.release();
  })

  // .get('/db', async (req, res) => {
  //   try {
  //     console.log("Connected successfuly");
  //     const client = await pool.connect()
  //     const result = await client.query('SELECT * FROM member');
  //     const results = { 'results': (result) ? result.rows : null};
  //     res.render('pages/db', results );

  //     client.release(); 
  //   } catch (err) {
  //     console.error(err);
  //     res.send("Error " + err);
  //   }
  // })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

//環境変数より、接続文字列を取得
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
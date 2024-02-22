/*
参考
https://zenn.dev/oreo2990/articles/b4719c78aa0832
*/

//expressモジュールの読み込み
const express = require('express')
//expressのインスタンス化
const app = express();

//8080番ポートでサーバーを待ちの状態にする。
//またサーバーが起動したことがわかるようにログを出力する
app.listen(8080, () => {
  console.log("サーバー起動中");
});

//GETリクエストの設定
//'/get'でアクセスされた時に、JSONとログを出力するようにする
app.get('/', (req, res)=> {
    res.json({ "pet": "dog"});
    console.log('GETリクエストを受け取りました')
    res.end();
});

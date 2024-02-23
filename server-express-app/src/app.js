/*
参考
https://zenn.dev/oreo2990/articles/b4719c78aa0832
*/

import { getItemStatistics, setItemStatistics, initializeDb } from './itemInfo.js';

//expressモジュールの読み込み
import express from "express";
//expressのインスタンス化
const app = express();
app.use(express.json());

// DB初期化
initializeDb();

// 起動
app.listen(8080, () => {
    console.log("サーバー起動中");
});

// 統計情報の問い合わせ
app.get('/', (req, res)=> {
    const {
        item, level, price,
        average, standard_deviation, probability,
    } = getItemStatistics(
        req.body.item_name,
        req.body.item_level,
        req.body.item_price,
    );
    
    // 結果を返す
    res.json({
        item, level, price,
        average, standard_deviation, probability,
    });
});

// 登録
app.post('/', (req, res) => {
    const ret = setItemStatistics(
        req.body.item1_name,
        req.body.item1_level,
        req.body.item1_price,
        req.body.item2_name,
        req.body.item2_level,
        req.body.item2_price,
    );
    
    // 結果を返す
    res.json(ret);

});

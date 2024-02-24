/*
参考
https://zenn.dev/oreo2990/articles/b4719c78aa0832
*/

import { getItemStatistics, setItemStatistics, initializeDb } from './itemInfo.js';

import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200
}));

// DB初期化
initializeDb();

// 起動
app.listen(8080, () => {
    console.log("サーバー起動中");
});

// 統計情報の問い合わせ
app.get('/', (req, res)=> {
    console.log("get \"/\"");
    getItemStatistics(
        req.query.item_name,
        req.query.item_level,
        req.query.item_price,
    ).then(({
        item, level, price,
        average, standard_deviation, probability,
    }) => {
        // 結果を返す
        res.json({
            item, level, price,
            average, standard_deviation, probability,
        });
    });
});

// 登録
app.post('/', (req, res) => {
    console.log("post \"/\""); 
    setItemStatistics(
        req.body.item1_name,
        req.body.item1_level,
        req.body.item1_price,
        req.body.item2_name,
        req.body.item2_level,
        req.body.item2_price,
    ).then((ret) => {
        // 結果を返す
        res.json(ret);
    });
});

/* 参考
https://isehara-3lv.sakura.ne.jp/blog/2023/03/28/sqlite3%E3%81%AE%E9%9D%9E%E5%90%8C%E6%9C%9F%E5%87%A6%E7%90%86%E3%82%92%E5%90%8C%E6%9C%9F%E5%8C%96%E3%81%95%E3%81%9B%E3%82%8Bnode-js/
*/

import sqlite3 from "sqlite3";
import { erf } from "mathjs";

import ENCHANT_DEFINITION from "./enchant_definition.json" assert { type: "json" };

const DB_FILE = "./minecraft_data.db";
let db = null;

// db初期化
const initializeDb = () => {
    db = new sqlite3.Database(DB_FILE);
    db.run(
        "create table if not exists rib_log " +
        "( " +
        "name text not null, " +
        "level integer not null, " +
        "price integer, " +
        "created_at text not null" +
        ");"
    );
};

const getItemStatistics = async (item, level, price) => {
    //const stats = getStats(item, level, price);
    const stats = await getStats(item, level, price);
    return stats;
};

const setItemStatistics = async (
    item1, level1, price1,
    item2, level2, price2,
) => {
    // 軽く入力チェック
    if (!validateInputValue(item1, level1) ||
        !validateInputValue(item2, level2))
    {
        throw new Error("item is invalid!");
    }

    // dbへinsert
    registerItem(item1, level1, price1);
    registerItem(item2, level2, price2);

    // statsを計算
    const item1_stats = await getStats(item1, level1, price1);
    const item2_stats = await getStats(item2, level2, price2);

    return [
        item1_stats,
        item2_stats,
    ];
}

// item, level, priceをdbへ登録
function registerItem(item, level, price){
    db.run(
        "insert into rib_log(name, level, price, created_at) values(?,?,?,?)",
        item, level, price, getNowStr()
    );
}
function getNowStr(){
    return new Date().toLocaleString("ja-JP");
}

// validation
function validateInputValue(item, level){
    if (item==="紙" || item ==="本棚") return true;
    
    return ENCHANT_DEFINITION.enchanting.reduce(
        (count, def) => {
            if (def.name === item) {
                if (level <= def.max_level) {
                    return count + 1;
                }
            }
            return count;
        },
        0
    ) === 1 ? true: false;
}

// statsを計算
async function getStats(item, level, price) {
    let query_result = null;
    try {
        const average_price = await getAverage(item, level);
        query_result = await getAllStats(item, level, price, average_price);
    } catch (err) {
        console.log("ERROR!!");
        console.log(err);
        // 空を返す
        query_result = {};
    } finally {
        //console.log("query_result end!");
    }
    return query_result;
}
function getAverage(item, level){
    return new Promise((resolve, reject) => {
        // 過去のitem+levelの、average(price)を取得
        let ave_price = 0;

        const query1 =
            "select " +
                "avg(price) as average " +
            "from rib_log " +
            "where " + 
                `name = "${item}" and ` +
                `level = ${level} ` +
            "group by name, level ";
        db.each(
            query1,
            (err, row) => {
                if (err) {
                    reject(err);
                }
                ave_price = row.average;
                // 1件しかないはずだから、1件でresolve
                resolve(ave_price);
            },
            (err, rownum) => {
                if (rownum!==1) {
                    reject(new Error(`Data Not Found! name:${item}, level:${level}`));
                }
            }
        );
    });
}
function getAllStats(item, level, price, ave_price){
    return new Promise((resolve, reject) => {
        let count = 0;
        let sum_price = 0;
        let sd_price = 0;
        let probability = 0;

        const query2 =
            "select " +
                "count(price) as cnt, " +
                "sum(price) as sum_price, " +
                `avg(abs(price - ${ave_price})) as sd ` +
            "from rib_log " +
            "where " + 
                `name = "${item}" and ` +
                `level = ${level} ` +
            "group by name, level ";
        db.each(
            query2,
            (err, row) => {
                if (err) {
                    reject(err);
                }
                count = count + row.cnt;
                sum_price = sum_price + row.sum_price;
                sd_price  = row.sd;

                const z = (price - ave_price) / sd_price;
                const z_sign = Math.sign(z);
                const cdfValue = (1.0 + erf(Math.abs(z) / Math.sqrt(2))) / 2;
                probability = cdfValue;
                
                resolve({
                    item,
                    level,
                    price,
                    average: ave_price,
                    standard_deviation: sd_price,
                    probability,
                });
            }
        );
    });
}



export {
    getItemStatistics,
    setItemStatistics,
    initializeDb,
};


import sqlite3 from "sqlite3";

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

const getItemStatistics = (item, level, price) => {
    
    return {
        item: "aa",
        level: 123,
        price: 456,
        average: 3.14,
        standard_deviation: 15.92,
        probability: 0.65,
    };
};

const setItemStatistics = (
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

    return [
        {
            item: "aa",
            level: 123,
            price: 456,
            average: 3.14,
            standard_deviation: 15.92,
            probability: 0.65,
        },
        {
            item: "bb",
            level: 123,
            price: 456,
            average: 3.14,
            standard_deviation: 15.92,
            probability: 0.65,
        },
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



export {
    getItemStatistics,
    setItemStatistics,
    initializeDb,
};


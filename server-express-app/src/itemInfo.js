import sqlite3 from "sqlite3";

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
        "price integer " +
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
        "insert into rib_log(name, level, price) values(?,?,?)",
        item, level, price
    );
}


export {
    getItemStatistics,
    setItemStatistics,
    initializeDb,
};


/*
エンチャ本の選択エリア
*/
import { useState, useEffect } from "react";

import BookGroup from "./BookGroup";
import Book from "./Book";
import BookEncLevel from "./BookEncLevel";
import PriceInput from "./PriceInput";

import "./TradeEncBookArea.css";

import ENC_DEF from "../enchant_definition.json";
import ENC_REQ from "../enchant_request.json";

const TradeEncBookArea = ({initializeSeed, onSelectEncBook = f => f}) => {
    // 選択しているグループのindex（グループ名配列のindex）
    const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
    // 選択しているグループのエンチャント名リスト
    const [enchantList, setEnchantList] = useState(ENC_REQ.group[0].enchantings.map((e)=>e));
    // 選択しているエンチャント名
    const [selectedEnchantName, setSelectedEnchantName] = useState(ENC_REQ.group[0].enchantings[0]);
    // 選択しているエンチャントレベル(1から始まる, 0は非選択)
    const [selectedEnchantLevel, setSelectedEnchantLevel] = useState(0);
    // 価格
    const [price, setPrice] = useState(0);
    // 統計情報
    const [enchantStatistics, setEnchantStatistics] = useState({
        item:"", level:0, price:0,
        count:0, average:0, standard_deviation:0, probability:0,
    });

    // 初期化指示が来たら初期化
    useEffect(()=>{
        setSelectedGroupIndex(0);
        setEnchantList(ENC_REQ.group[0].enchantings.map((e)=>e));
        setSelectedEnchantName(ENC_REQ.group[0].enchantings[0]);
        setSelectedEnchantLevel(0);
        setPrice(0);
        setEnchantStatistics({
            item:"", level:0, price:0,
            count:0, average:0, standard_deviation:0, probability:0,
        });

    }, [initializeSeed]);

    // ★todo: memo化する
    // グループ名配列
    const groupNames = ENC_REQ.group.map((g)=>g.name);
    // 本map
    const bookMap = ENC_DEF.enchanting.reduce((tmpMap, val) => {
        return {...tmpMap, [val.name]:{max_level:val.max_level}};
    }, {});
    // リクエスト本
    const requestBookMap = ENC_REQ.request.reduce((m, val) => {
        const newM = {...m};
        if (val.name in newM) {
            newM[val.name].push(val.level);
        } else {
            newM[val.name] = [val.level];
        }
        return newM;
    },{});

    // グループ選択
    const handleClickGroup = (index) => {
        // console.log("handleClickGroup");
        // console.log(`index:${index}`);
        // console.log(`group_name:${groupNames[index]}`);
        setSelectedGroupIndex(index);
        setEnchantList(ENC_REQ.group[index].enchantings.map((e)=>e));
        const enchantName = ENC_REQ.group[index].enchantings[0];
        setSelectedEnchantName(enchantName);
        // max_levelが1の場合は1、それ以外はゼロ
        setSelectedEnchantLevel(
            (bookMap[enchantName].max_level===1) ?1: 0
        );
    };
    // 本（エンチャント）を選択
    const handleClickBook = (index) => {
        // console.log("handleClickBook");
        // console.log(`index:${index}`);
        // console.log(`book_name:${ENC_REQ.group[selectedGroupIndex].enchantings[index]}`);
        const enchantName = ENC_REQ.group[selectedGroupIndex].enchantings[index];
        setSelectedEnchantName(enchantName);

        // max_levelが1の場合は1、それ以外はゼロ
        setSelectedEnchantLevel(
            (bookMap[enchantName].max_level===1) ?1: 0
        );
    };
    // レベルを選択(1から始まる)
    const handleClickLevel = (level) => {
        // console.log("handleClickLevel");
        // console.log(`leve:${level}`);
        setSelectedEnchantLevel(level);
    };
    // 料金を登録
    const handleInputPrice = (_price) => {
        setPrice(_price);
        if (5<=_price && _price<=64) {
            getStatisticsInfo(_price);
            onSelectEncBook(selectedEnchantName, selectedEnchantLevel, _price);
        }
    };
    /*
    // 全部確定
    const handleOnDetermineBook = () => {
        // サーバーから統計情報を取得して、画面へ表示
        if (5<=price && price<=64) {
            getStatisticsInfo();
            onSelectEncBook(selectedEnchantName, selectedEnchantLevel, price);
        }
    };
    */

    const getStatisticsInfo = async (cur_price = price) => {
        // サーバーに問い合わせて統計情報を得る
        const query = "http://127.0.0.1:8080/?" +
            `item_name=${selectedEnchantName}&` +
            `item_level=${selectedEnchantLevel}&` +
            `item_price=${cur_price}`;
        //console.log(query);
        try {
            const res = await fetch(query);
            const statistics_info = await res.json();
            setEnchantStatistics(statistics_info);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="bookarea-contents">
            {/* グループ */}
            <div>
                {groupNames.map((name, i) => (
                    <BookGroup
                        key={`BookGroup_${i}`}
                        name={name}
                        group_index={i}
                        onClick={handleClickGroup}
                        selected={(i===selectedGroupIndex)?true:false}
                    />
                ))}
            </div>

            {/* エンチャント */}
            <div>
                {enchantList.map((name, i) => (
                    <Book
                        key={`Book_${i}`}
                        name={name}
                        book_index={i}
                        onClick={handleClickBook}
                        selected={(name===selectedEnchantName)?true:false}
                    />
                ))}
            </div>

            {/* レベル */}
            <div>
                {[...Array(5)].map((e,i)=>(
                    <BookEncLevel
                        key={`BookEnchLevel_${i+1}`}
                        level={i+1}
                        enabled={(i+1<=bookMap[selectedEnchantName].max_level)?true: false}
                        onClick={handleClickLevel}
                        selected={((i+1)===selectedEnchantLevel)?true:false}
                        isRequested={
                            (
                                (selectedEnchantName in requestBookMap) &&
                                (requestBookMap[selectedEnchantName].includes(i+1))
                            )
                        }
                    />
                ))}
            </div>

            {/* エメラルド個数(料金) */}
            <div>
                <PriceInput
                    initializeSeed={initializeSeed}
                    onEnter={handleInputPrice}
                />
            </div>

            {/* 確定ボタン */}
            {/*
            <div>
                <button
                    onClick={handleOnDetermineBook}
                    disabled={(selectedEnchantLevel<=0 || price===0)}
                    className="btn-dtermine-book"
                >EN本<br />確定</button>
            </div>
            */}

            {/* 統計情報 */}
            <div className="div-static-info">
                {(price>=5 && price<=64) && (
                    <>
                    {(Object.keys(enchantStatistics).length===0) && (
                        <>
                            <div>過去件数: 0</div>
                            <div>平均: -</div>
                            <div>標準偏差: -</div>
                            <div>x以下の金額が出る確率: -%</div>
                        </>
                    )}{(Object.keys(enchantStatistics).length!==0) && (
                        <>
                            <div>過去件数: {enchantStatistics.count}</div>
                            <div>平均: {enchantStatistics.average.toFixed(1)}</div>
                            <div>標準偏差: {enchantStatistics.standard_deviation.toFixed(1)}</div>
                            <div>{price}以下の金額が出る確率: {(enchantStatistics.probability*100).toFixed(1)}%</div>
                        </>
                    )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TradeEncBookArea;

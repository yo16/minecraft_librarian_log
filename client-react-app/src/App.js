import { useState, useEffect } from "react";

import TradeEncBookArea from './components/TradeEncBookArea';

import './App.css';
import SamplePosition from "./SamplePosition";


function App() {
    const [isSelectedBookShelf, setIsSelectedBookShelf] = useState(false);
    const [isSelectedPaper, setIsSelectedPaper] = useState(false);
    const [isSelectedEncBook, setIsSelectedEncBook] = useState(false);
    const [encBookInfo, setEncBookInfo] = useState({name:"", level:0, price:0});
    const [initializeEncBookArea, setInitializeEncBookArea] = useState(0);
    const [resultList, setResultList] = useState([]);

    const initializeState = () => {
        setIsSelectedBookShelf(false);
        setIsSelectedPaper(false);
        setIsSelectedEncBook(false);
        setEncBookInfo({name:"", level:0, price:0});
        setInitializeEncBookArea(initializeEncBookArea+1);
    }
    const handleSelectEnchantBook = (name, level, price) => {
        setEncBookInfo({name,level,price});
    };
    const handleOnChangeCbBook = (c) => {
        setIsSelectedBookShelf(c);
    };
    const handleOnChangeCbPaper = (c) => {
        setIsSelectedPaper(c);
    };
    const handleOnChangeCbEncBook = (c) => {
        setIsSelectedEncBook(c);
    };
    const handleOnClickBtnDbRegister = () => {
        let post_body = {};
        let i = 1;
        if (isSelectedBookShelf) {
            post_body[`item${i}_name`] = "本棚";
            post_body[`item${i}_level`] = 1;
            post_body[`item${i}_price`] = 9;
            i += 1;
        }
        if (isSelectedPaper) {
            post_body[`item${i}_name`] = "紙";
            post_body[`item${i}_level`] = 1;
            post_body[`item${i}_price`] = 24;
            i += 1;
        }
        if (isSelectedEncBook) {
            post_body[`item${i}_name`] = encBookInfo.name;
            post_body[`item${i}_level`] = encBookInfo.level;
            post_body[`item${i}_price`] = encBookInfo.price;
            
            if (
                (encBookInfo.name==="") ||
                (encBookInfo.level===0) ||
                (encBookInfo.price===0)
            ) {
                // name, level, priceのどれかがおかしい
                console.error("Invalid name or level or price.");
                return;
            }

            i += 1;
        }
        if (i>=4) {
            // CheckBoxが３つついてる→全部外す
            console.error("Invalid check-box status.");
            setIsSelectedBookShelf(false);
            setIsSelectedPaper(false);
            setIsSelectedEncBook(false);
            return;
        }

        const query = "http://127.0.0.1:8080/";
        fetch(query, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post_body)
        }).then((response)=>response.json()
        ).then((body) => {
            setResultList([...resultList, ...body]);
            //ulResults.scrollTo(0,ulResults.scrollHeight);
        });

        // 初期化
        initializeState();
    };
    // resultListに追加されたら、一番下までスクロール
    useEffect(()=>{
        const elm_ulResults = document.getElementById("ulResults");
        elm_ulResults.scrollTo(0, elm_ulResults.scrollHeight);
    },[resultList]);

    return (
        <div className="app-frame">
            <div className="item-group">
                <div
                    className="item-type"
                    onClick={()=>{setIsSelectedBookShelf(!isSelectedBookShelf)}}
                >
                    <input
                        type="checkbox"
                        id="cb_book"
                        checked={isSelectedBookShelf}
                        onChange={(e)=>{handleOnChangeCbBook(e.target.checked);}}
                    />
                    <label>本棚</label>
                </div>
            </div>
            <div
                className="item-group"
                onClick={()=>{setIsSelectedPaper(!isSelectedPaper)}}
            >
                <div className="item-type">
                    <input
                        type="checkbox"
                        id="cb_paper"
                        checked={isSelectedPaper}
                        onChange={(e)=>{handleOnChangeCbPaper(e.target.checked);}}
                    />
                    <label>紙</label>
                </div>
            </div>
            <div className="item-group">
                <div
                    className="item-type"
                    onClick={()=>{setIsSelectedEncBook(!isSelectedEncBook)}}
                >
                    <input
                        type="checkbox"
                        id="cb_enc_book"
                        checked={isSelectedEncBook}
                        onChange={(e)=>{handleOnChangeCbEncBook(e.target.checked);}}
                    />
                    <label>EN本</label>
                </div>
                <TradeEncBookArea
                    initializeSeed={initializeEncBookArea}
                    onSelectEncBook={handleSelectEnchantBook}
                />
            </div>
            <button
                onClick={handleOnClickBtnDbRegister}
                className="btn-db-register"
                disabled={
                    (
                        (isSelectedBookShelf?1:0) +
                        (isSelectedPaper?1:0) +
                        (isSelectedEncBook?1:0)
                    ) !== 2
                }
            >DB登録</button>
            <hr />
            <div className="div-info">
                <ul
                    className="ul-result"
                    id="ulResults"
                >
                    {resultList.map((r, i)=>{
                        return (
                            <li key={`opt-result_${i}`}>
                                {`${r.item}(${r.level}) - ${r.price}em`}
                            </li>
                        );
                    })}
                </ul>
                <SamplePosition />
            </div>
        </div>
    );
}

export default App;


import { useState, useEffect } from "react";

import "./PriceInput.css";

const PriceInput = ({ initializeSeed, onEnter=f=>f }) => {
    const [price, setPrice] = useState(0);

    useEffect(() => {
        setPrice(0);
    }, [initializeSeed]);

    const handleOnNumberClick = (n) => {
        const p = Number(String(price) + n);
        handleOnChangePrice(p);
    };
    const handleOnClear = (price) => {
        setPrice(0);
        onEnter(0);
    }
    const handleOnChangePrice = (p) => {
        // priceは、5-64のハズなので
        // その範囲外の場合は、範囲内になるまで先頭から１文字ずつ消す
        // 5未満は、入力途中かもしれないから処理の対象外
        let next_p_str = String(Number(p));
        let next_p = Number(p);
        while (next_p>64) {
            next_p_str = next_p_str.slice(1);
            next_p = Number(next_p_str);
        }

        setPrice(next_p);
        onEnter(next_p);
    };

    return (
        <div>
            {/* 数字ボタン */}
            <div>
                {[[1,2,3,4,5],[6,7,8,9,0]].map((line_ary, i)=>(
                    <div
                        key={`button_line_${i}`}
                        className="div-price-nums"
                    >
                        {line_ary.map((n, i)=>(
                            <button
                                key={`num_${n}`}
                                onClick={()=>{handleOnNumberClick(n);}}
                                className="btn-price-num"
                            >{n}</button>
                        ))}
                    </div>
                ))}
            </div>

            {/* input */}
            <div>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => handleOnChangePrice(Number(e.target.value))}
                    className="input-price"
                    onFocus={(e) => e.target.select()}
                />
                <button
                    className="btn-clear"
                    onClick={handleOnClear}
                >clr</button>
            </div>
        </div>
    );
};

export default PriceInput;


import { useState, useEffect } from "react";

import "./PriceInput.css";

const PriceInput = ({ initializeSeed, onEnter=f=>f }) => {
    const [price, setPrice] = useState(0);

    useEffect(() => {
        setPrice(0);
    }, [initializeSeed]);

    const handleOnClick = (n) => {
        const p = Number(String(price) + n);
        setPrice(p);
        onEnter(p);
    };
    const handleOnClear = (price) => {
        setPrice(0);
        onEnter(0);
    }
    const handleOnChangePrice = (p) => {
        setPrice(p);
        onEnter(p);
    };

    return (
        <div>
            {/* 数字ボタン */}
            <div>
                {[[1,2,3,4,5],[6,7,8,9,0]].map((line_ary, i)=>(
                    <div
                        key={`button_line_${i}`}
                    >
                        {line_ary.map((n, i)=>(
                            <button
                                key={`num_${n}`}
                                onClick={()=>{handleOnClick(n);}}
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
                />
                <button onClick={handleOnClear}>clr</button>
            </div>
        </div>
    );
};

export default PriceInput;

import "./BookEncLevel.css";

const LEVEL_TEXT = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ"];

const BookEncLevel = ({level, enabled, selected, onClick=f=>f}) => {
    const handleClick = () => {
        onClick(level);       // 1開始の、"レベル"で正しく返す
    };

    return (
        <div
            className="div-levels"
        >
            <button
                onClick={handleClick}
                disabled={!enabled}
                className={(selected?"btn-selected":"") + " btn-level"}
            >{LEVEL_TEXT[level-1]}</button>
        </div>
    );
};

export default BookEncLevel;
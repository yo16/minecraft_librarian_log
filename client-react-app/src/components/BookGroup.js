import "./BookGroup.css";

const BookGroup = ({name, group_index, selected, onClick=f=>f}) => {
    const handleOnClick = () => {
        onClick(group_index);
    };

    return (
        <div>
            <button
                onClick={handleOnClick}
                className={selected?"btn-selected":""}
            >{name}</button>
        </div>
    );
};

export default BookGroup;

import "./BookGroup.css";

const BookGroup = ({name, group_index, selected, onClick=f=>f}) => {
    const handleOnClick = () => {
        onClick(group_index);
    };

    return (
        <div
            className="div-book-group"
        >
            <button
                onClick={handleOnClick}
                className={(selected?"btn-selected":"")+" btn-book-group"}
            >{name}</button>
        </div>
    );
};

export default BookGroup;

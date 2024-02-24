import "./Book.css";

const Book = ({name, book_index, selected, onClick=f=>f}) => {
    const handleOnClick = () => {
        onClick(book_index);
    }

    return (
        <div>
            <button
                onClick={handleOnClick}
                className={selected?"btn-selected":""}
            >{name}</button>
        </div>
    );
};

export default Book;

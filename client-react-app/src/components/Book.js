import "./Book.css";

const Book = ({name, book_index, selected, onClick=f=>f}) => {
    const handleOnClick = () => {
        onClick(book_index);
    }

    return (
        <div
            className="div-books"
        >
            <button
                onClick={handleOnClick}
                className={(selected?"btn-selected":"")+" btn-book"}
            >{name}</button>
        </div>
    );
};

export default Book;

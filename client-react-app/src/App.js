import './App.css';

import TradeEncBookArea from './components/TradeEncBookArea';


function App() {
    const handleSelectEnchantBook = (name, level, price) => {
        console.log("handleSelectEnchantBook");
        console.log(`name:${name}, level:${level}, price:${price}`);
        return;
    };

    return (
        <div className="app-frame">
            <div className="item-group">
                <div>
                    <input type="checkbox" id="cb_book" />
                    <label htmlFor="cb_book">本棚</label>
                </div>
            </div>
            <div className="item-group">
                <div>
                    <input type="checkbox" id="cb_paper" />
                    <label htmlFor="cb_paper">紙</label>
                </div>
            </div>
            <div className="item-group">
                <div>
                    <input type="checkbox" id="cb_enc_book" />
                    <label htmlFor="cb_enc_book">EN本</label>
                </div>
                <TradeEncBookArea onSelectEncBook={handleSelectEnchantBook} />
            </div>
            <hr />
            <button>DB登録</button>
        </div>
    );
}

export default App;

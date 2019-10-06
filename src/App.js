import React, {useState} from 'react';

import {Header, HeaderContext} from "components/Header/Header";
import Page1 from "components/Page1";
import Page2 from "components/Page2";

function App() {
    const [pageState, setPageState] = useState(null);

    return (
        <div className="App">
            <HeaderContext>
                <header className="App-header">
                    <Header/>

                    {pageState === 'page1' && <Page1/>}
                    {pageState === 'page2' && <Page2/>}
                </header>

                <div>
                    <button onClick={() => setPageState('page1')}>Page 1</button>
                    <button onClick={() => setPageState('page2')}>Page 2</button>
                </div>
            </HeaderContext>
        </div>
    );
}

export default App;

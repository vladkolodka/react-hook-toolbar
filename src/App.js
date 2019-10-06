import React, {useState} from 'react';

import {Header, ToolbarContext} from "components/Header/Header";
import Page1 from "components/Page1";
import Page2 from "components/Page2";

function App() {
    const [pageState, setPageState] = useState('page2');

    return (
        <div className="App">
            <ToolbarContext>
                <header className="App-header">
                    <Header/>

                    {pageState === 'page1' && <Page1/>}
                    {pageState === 'page2' && <Page2/>}
                </header>

                <div>
                    <button onClick={() => setPageState('page1')}>Page 1</button>
                    <button onClick={() => setPageState('page2')}>Page 2</button>
                </div>
            </ToolbarContext>
        </div>
    );
}

export default App;

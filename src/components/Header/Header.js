import React, {Fragment, useContext, useReducer, useEffect, useRef} from 'react';

const defaultValue = [(() => <span style={{color: 'red'}}>3</span>)()];
export const ToolbarContextAccessor = React.createContext(defaultValue);

export function Header() {
    const {state: items} = useContext(ToolbarContextAccessor);

    return <Fragment>
        <h1>Header</h1>
        <p>Items:</p>

        <ul>
            {items.map((Component, index) => <li key={index}>{Component}</li>)}
        </ul>
    </Fragment>;
}

const actions = {
    push: 'push',
    pop: 'pop',
    update: 'update'
};

function reducer(state, action) {
    switch (action.type) {
        case actions.push:
            return [...state, action.payload];
        case actions.pop:
            return state.filter((_, i) => i !== state.length - 1);
        case actions.update:
            state[action.payload.index] = action.payload.item;
            return [...state];

        default:
            return state;
    }
}

export function ToolbarContext({children}) {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    return <ToolbarContextAccessor.Provider value={{state, dispatch}}>{children}</ToolbarContextAccessor.Provider>;
}

let counter = 0;

export const useToolbar = function (Component, props = {}, dependencies = []) {
    const {dispatch} = useContext(ToolbarContextAccessor);
    const index = useRef(-1);

    useEffect(() => {
        dispatch({type: actions.push, payload: <Component {...props}/>});
        index.current = ++counter;

        return () => {
            counter -= 1;
            dispatch({type: actions.pop});
        };

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [dispatch]);

    useEffect(() => {
        dispatch({
            type: actions.update, payload: {
                item: <Component {...props}/>,
                index: index.current
            }
        });
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [dispatch, index, ...Object.values(props), ...dependencies]);
};
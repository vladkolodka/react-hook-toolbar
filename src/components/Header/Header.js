import React, {Fragment, useContext, useReducer, useEffect} from 'react';

const defaultValue = [{item: (() => <span style={{color: 'red'}}>3</span>), props: {}}];
const Context = React.createContext(defaultValue);

export function Header() {
    const {state: items} = useContext(Context);
    console.log('header state', items);
    return <Fragment>
        <h1>Header</h1>
        <p>Items:</p>

        <ul>
            {items.map((c, index) => {
                // console.log('list render', c);
                return <li key={index}><c.item {...c.props} /></li>;
            })}
        </ul>
    </Fragment>;
}

function reducer(state, action) {
    switch (action.type) {
        case 'push':
            return [...state, action.payload];
        case 'pop':
            return state.filter((_, i) => i !== state.length - 1);
        case 'updateProps':
            const newState = [...state];
            // console.log('updater', newState[newState.length - 1]);
            // if(newState[newState.length - 1]){
                newState[newState.length - 1].props = action.payload;
            // }
            return newState;
        default:
            return state;
    }
}

export function HeaderContext({children}) {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    return <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>;
}

export const useHeaderToolbar = function (Component, props = {}, dependencies = []) {
    const {dispatch} = useContext(Context);

    useEffect(() => {
        console.log('set item');
        dispatch({type: 'push', payload: {item: Component, props: props}});

        return () => dispatch({type: 'pop'});
    }, [dispatch]);

    useEffect(() => {
        console.log('update props', props);
        dispatch({type: 'updateProps', payload: props});
    }, [dispatch, ...Object.values(props), ...dependencies]);
};
import React, {useContext, useRef, useEffect} from "react";
import {ToolbarContextAccessor} from "components/ToolbarContext";
import {toolbarActions} from "components/ToolbarContext";

export const useToolbar = function (Component, props = {}, dependencies = []) {
    const {dispatch, counter} = useContext(ToolbarContextAccessor);
    const index = useRef(-1);

    useEffect(() => {
        dispatch({type: toolbarActions.push, payload: <Component {...props}/>});
        index.current = ++counter.current;

        return () => {
            counter.current -= 1;
            dispatch({type: toolbarActions.pop});
        };

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [dispatch]);

    useEffect(() => {
        dispatch({
            type: toolbarActions.update, payload: {
                item: <Component {...props}/>,
                index: index.current
            }
        });
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [dispatch, index, ...Object.values(props), ...dependencies]);
};
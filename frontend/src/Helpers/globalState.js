import React, { useReducer } from 'react';
import { AppContext } from '../containers/App';


export const ACTIONTYPES = {
    LOGIN: "LOGIN"
}

// Aqui van los stados globales a utilizar
export const initialState = {
    isLogged: false
};
  
  

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONTYPES.LOGIN: {
            return {
                ...state,
                isLogged: action.isLogged
            };
        }
        default:
            return state;
    }
};

const AppContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;


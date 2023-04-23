import {createContext, useState, Dispatch, SetStateAction} from 'react';

export interface GlobalStateContext {
    state: string
    setState: Dispatch<SetStateAction<string>>
}
const GlobalState = createContext<GlobalStateContext>({
    state: 'CA',
    setState: () => {}
});
export const GlobalStateProvider = (props:{children: any}) => {
    const [state, setState] = useState('CA');
    return(
        <GlobalState.Provider value={{state, setState}}>
            {props.children}
        </GlobalState.Provider>
    );
}


export default {GlobalState, GlobalStateProvider};
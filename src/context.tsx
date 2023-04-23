import React, {createContext, useContext, useState, Dispatch, SetStateAction} from 'react';

export interface GlobalStateContext {
    state: string
    setState: Dispatch<SetStateAction<string>>
}
const GlobalState = createContext<GlobalStateContext>({
    state: 'CA',
    setState: () => {}
});
export const GlobalStateProvider = ( { children } : {children: React.ReactNode}) => {
    const [state, setState] = useState<string>('CA');
    return(
        <GlobalState.Provider value={{state, setState}}>
            {children}
        </GlobalState.Provider>
    );
}

export const useGlobalStateContext = (): GlobalStateContext => useContext(GlobalState);

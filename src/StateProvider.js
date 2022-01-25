import React, { createContext, useContext, useReducer } from "react";

//I don't know how this works, just keep this as it is.
//Never touch the things that work I guess? :P
//All I know is that this code is used for creating the top level user.

const StateContext = createContext();

const StateProvider = ({ reducer, initialState, children }) => (
	<StateContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
);

const useStateValue = () => useContext(StateContext);

export { StateContext, useStateValue };
export default StateProvider;

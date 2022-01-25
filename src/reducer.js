//initial state before you let the user sign-in.
const initialState = {
	user: null,
};

//Type of action that signs-in the user.
const actionTypes = {
	SET_USER: "SET_USER",
	LOGOUT_USER: "LOGOUT_USER",
};

//Performs the function of adding the user to the initialState.
//A value for user in initialState, other than null means that a user has signed-in.
//The different types of actions are given (dispatched) using the switch statement.
const reducer = (state, action) => {
	console.log(action);
	switch (action.type) {
		case actionTypes.SET_USER:
			return {
				...state,
				user: action.user,
			};
		case actionTypes.LOGOUT_USER:
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};

export { initialState, actionTypes };
export default reducer;

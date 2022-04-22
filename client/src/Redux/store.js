export const initialState = {
    login: null,
}

export const reducer = (state, action) =>{
    switch(action.type){
        case "SET_LOGIN":
            return{
                ...state, 
                newchat: action.payload
            };

            default:
                return{
                    state
                }
    }

   
}


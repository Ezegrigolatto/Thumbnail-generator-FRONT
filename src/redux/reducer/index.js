const initialState = {
   thumbnail:{path:""},
   loading:false,
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_THUMBNAIL':
            return {
                ...state,
                thumbnail: {path:action.payload}
            };
            case('RESET_STATE'):
                return {
                    ...state,
                    thumbnail: {path:""},
                };
            case('SET_LOADING'):
                return {
                    ...state,
                    loading: action.payload
                };
        default:
            return state;
    }
}
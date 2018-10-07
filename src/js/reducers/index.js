const initialState = {
    article: []
};

// const rootReducer = (state = initialState, action) => state;
function exampleReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ARTICLE:
            return { ...state, articles: [ ...state.articles, action.payload ] };
        default:
            return state;
    }
}

export default rootReducer;
import { loaderConstants } from '../_constants';

export function loaderReducer(state = { loading: false, counter: 0 }, action) {
    switch (action.type) {
        case loaderConstants.LOADING_START:
            return {
                loading: action.loading,
                counter: state.counter + 1
            };
        case loaderConstants.LOADING_END:
            return {
                loading: action.loading,
                counter: state.counter - 1,
            };
        default:
            return state
    }
}
import { loaderConstants } from '../_constants';

export const loaderActions = {
    LoadingStart,
    LoadingEnd
};

function LoadingStart() {
    return { type: loaderConstants.LOADING_START, loading: true };
}

function LoadingEnd() {
    return { type: loaderConstants.LOADING_END, loading: false };
}
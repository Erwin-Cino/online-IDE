import axios from 'axios';
import { ActionType } from '../action-types';
import { Actions } from '../actions';

export const searchRepositories = (term: string) => {
    return async (dispatch: any) => {
        dispatch({
            type: ActionType.SEARCH_REPOSITORIES
        });

        try {
            const { data } = await axios.get("https://registry.npmjs.org/-/v1/search", {
                params: {
                    text: term
                }
            });
            const names = data.objects.maps((result) => result.package.name)
            if (names.length > 0) {
                dispatch({
                    type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
                    payload: names
                })
            }
        } catch (error) {
            dispatch({
                type: ActionType.SEARCH_REPOSITORIES_ERROR,
                payload: error.message
            });
        }
    };
};
import { asyncType } from '../middleware/asyncMiddleware';

// ------------------------------
// Actions
// ------------------------------

export const FETCH_MODELS = asyncType('redux/models/FETCH_MODELS');
export const CREATE_MODEL = asyncType('redux/models/CREATE_MODEL');
export const UPDATE_MODEL = asyncType('redux/models/UPDATE_MODEL');
export const DELETE_MODEL = asyncType('redux/models/DELETE_MODEL');

// ------------------------------
// Initial state
// ------------------------------

const initialState = {
    models: []
};

// ------------------------------
// Reducer
// ------------------------------

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MODELS.SUCCESS: {
            return { ...state, models: action.result.body };
        }
        case CREATE_MODEL.SUCCESS: {
            return { ...state, models: [ ...state.models, action.result.body ] };
        }
        case UPDATE_MODEL.SUCCESS: {
            
            const newModels = [ ...state.models ];

            const newModelIndex = state.models.findIndex(
                model => model.id === action.payload.id
            );

            if (newModelsIndex !== null) {
                newModels[newModelIndex] = action.payload;
            }
            
            return { ...state, models: [ ...state.models, action.result.body ] };
        }
        case DELETE_MODEL.SUCCESS: {

            const newModel = [ ...state.models ].filter( model => model.id !== payload.model.id);

            return { ...state, models: newModel };
        }
        default:
            return state;
    }
}

// ------------------------------
// Action creators
// ------------------------------

export function fetchModels() {
    return {
        types: FETCH_MODEL,
        promise: client => client.get(`/%models%`),
    };
}

export function createModel(model) {
    return {
        types: CREATE_MODEL,
        promise: client => client.post(`/%models%`, {
            params: model
        }),
        payload: model
    };
}

export function updateModel(model) {
    return {
        types: UPDATE_MODEL,
        promise: client => client.put(`/%models%/${model.id}`),
        payload: model
    };
}

export function deleteModel() {
    return {
        types: DELETE_MODEL,
        promise: client => client.delete(`/%models%`),
    };
}
import { asyncType } from '../middleware/asyncMiddleware';

// ------------------------------
// Actions
// ------------------------------


export const GET_MODELS = asyncType('redux/models/GET_MODELS');
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
        case GET_MODELS.SUCCESS: {
            return { ...state, models: action.action.result.body };
        }
        case CREATE_MODEL.SUCCESS: {
            return { ...state, models: [ ...state.models, action.result.body ] };
        }
        case UPDATE_MODEL.SUCCESS: {
            
            const newModel = [ ...state.models ];

            const newModuleNameIndex = state.models.findIndex(
                model => model.id === updatedModuleName.id
            );

            if (newModuleNameIndex !== null) {
                newModuleNames[newModuleNameIndex] = updatedModuleName;
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

export function getModels() {
    return {
        types: GET_MODEL,
        promise: client => client.get(`/models`),
    };
}

export function createModel() {
    return {
        types: CREATE_MODEL,
        promise: client => client.post(`/models`),
    };
}

export function updateModel(model) {
    return {
        types: UPDATE_MODEL,
        promise: client => client.put(`/models/${model.id}`),
    };
}

export function deleteModel() {
    return {
        types: DELETE_MODEL,
        promise: client => client.delete(`/models`),
    };
}
import { asyncType } from '../middleware/asyncMiddleware';

// ------------------------------
// Actions
// ------------------------------


export const GET_UPPERCASE_NAME = asyncType('redux/modulesNames/GET_UPPERCASE_NAME');
export const CREATE_UPPERCASE_NAME = asyncType('redux/modulesNames/CREATE_UPPERCASE_NAME');
export const UPDATE_UPPERCASE_NAME = asyncType('redux/modulesNames/UPDATE_UPPERCASE_NAME');
export const DELETE_UPPERCASE_NAME = asyncType('redux/modulesNames/DELETE_UPPERCASE_NAME');

// ------------------------------
// Initial state
// ------------------------------

const initialState = {
    modulesNames: []
};

// ------------------------------
// Reducer
// ------------------------------

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_UPPERCASE_NAME.SUCCESS: {
            return { ...state, modulesNames: action.action.result.body };
        }
        case CREATE_UPPERCASE_NAME.SUCCESS: {
            return { ...state, modulesNames: [ ...state.modulesNames, action.result.body ] };
        }
        case UPDATE_UPPERCASE_NAME.SUCCESS: {
            
            const newModulesNames = [ ...state.modulesNames ];

            const newModuleNameIndex = state.moduleNames.findIndex(
                moduleName => moduleName.id === updatedModuleName.id
            );

            if (newModuleNameIndex !== null) {
                newModuleNames[newModuleNameIndex] = updatedModuleName;
            }
            
            return { ...state, modulesNames: [ ...state.modulesNames, action.result.body ] };
        }
        case DELETE_UPPERCASE_NAME.SUCCESS: {

            const newModulesNames = [ ...state.modulesNames ].filter( modulesName => modulesName.id !== payload.modulesName.id);

            return { ...state, modulesNames: newModulesNames };
        }
        default:
            return state;
    }
}

// ------------------------------
// Action creators
// ------------------------------

export function getModulesNames() {
    return {
        types: GET_UPPERCASE_NAME,
        promise: client => client.get(`/modules-names`),
    };
}

export function createModulesNames() {
    return {
        types: CREATE_UPPERCASE_NAME,
        promise: client => client.post(`/modules-names`),
    };
}

export function updateModulesNames(modulesName) {
    return {
        types: UPDATE_UPPERCASE_NAME,
        promise: client => client.put(`/modules-names/${modulesName.id}`),
    };
}

export function deleteModulesNames() {
    return {
        types: DELETE_UPPERCASE_NAME,
        promise: client => client.delete(`/modules-names`),
    };
}
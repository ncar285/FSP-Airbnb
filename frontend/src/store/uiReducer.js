//CONSTANTS
// REGISTRATION
const ACTIVATE_REGISTER_MODAL = 'ACTIVATE_REGISTER_MODAL';
const DEACTIVATE_REGISTER_MODAL = 'DEACTIVATE_REGISTER_MODAL';

// SEARCH
const ACTIVATE_SEARCH_MODAL = 'ACTIVATE_SEARCH_MODAL';
const DEACTIVATE_SEARCH_MODAL = 'DEACTIVATE_SEARCH_MODAL';

// EDIT REVIEW
const ACTIVATE_ERM = 'ACTIVATE_ERM';
const DEACTIVATE_ERM = 'DEACTIVATE_ERM';

// DELETE REVIEW
const ACTIVATE_DRM = 'ACTIVATE_DRM';
const DEACTIVATE_DRM = 'DEACTIVATE_DRM';

//ACTION CREATORS
export const activateRegisterModal = () => ({
    type: 'ACTIVATE_REGISTER_MODAL'
})

export const deactivateRegisterModal = () => ({
    type: 'DEACTIVATE_REGISTER_MODAL'
})

export const activateSearchModal = () => ({
    type: 'ACTIVATE_SEARCH_MODAL'
})

export const deactivateSearchModal = () => ({
    type: 'DEACTIVATE_SEARCH_MODAL'
})

//REVIEW ACTION CREATORS
export const activateERM = (paramData) => ({
    type: ACTIVATE_ERM,
    payload: paramData 
})

export const deactivateERM = () => ({
    type: DEACTIVATE_ERM
})

export const activateDRM = () => ({
    type: ACTIVATE_DRM
})

export const deactivateDRM = () => ({
    type: DEACTIVATE_DRM
})



// THUNK ACTION CREATORS

// SELECTORS 

export const getDRMState = state => state.ui.deleteReviewModal
export const getERMState = state => state.ui.editReviewModal
export const getERMParams = state => state.ui.ERMparams



const initialState = {
    registerModal: null,
    searchModal: null,
    editReviewModal: null,
    ERMparams: {},
    deleteReviewModal: null
}

// REDUCER
const uiReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIVATE_REGISTER_MODAL:
            return {...state, registerModal: true}
        case DEACTIVATE_REGISTER_MODAL:
            return {...state, registerModal: false}
        case ACTIVATE_SEARCH_MODAL:
            return {...state, searchModal: true}
        case DEACTIVATE_SEARCH_MODAL:
            return {...state, searchModal: false}
            // ! REVIEW CRUD MODALS
        case ACTIVATE_ERM:
            return {...state, editReviewModal: true, ERMparams: action.payload}
        case DEACTIVATE_ERM:
            return {...state, editReviewModal: false}
        case ACTIVATE_DRM:
            return {...state, deleteReviewModal: true}
        case DEACTIVATE_DRM:
            return {...state, deleteReviewModal: false}
        default: 
            return state
    }
}

export default uiReducer
//CONSTANTS
// REGISTRATION
const ACTIVATE_REGISTER_MODAL = 'ACTIVATE_REGISTER_MODAL';
const DEACTIVATE_REGISTER_MODAL = 'DEACTIVATE_REGISTER_MODAL';

// SEARCH
const ACTIVATE_SEARCH_MODAL = 'ACTIVATE_SEARCH_MODAL';
const DEACTIVATE_SEARCH_MODAL = 'DEACTIVATE_SEARCH_MODAL';

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


// THUNK ACTION CREATORS

// SELECTORS 

// REDUCER
const uiReducer = (state = { registerModal: null}, action) => {
    switch(action.type){
        case ACTIVATE_REGISTER_MODAL:
            return {...state, registerModal: true}
        case DEACTIVATE_REGISTER_MODAL:
            return {...state, registerModal: false}
        case ACTIVATE_SEARCH_MODAL:
            return {...state, searchModal: true}
        case DEACTIVATE_SEARCH_MODAL:
            return {...state, searchModal: false}
        default: 
            return state
    }
}

export default uiReducer
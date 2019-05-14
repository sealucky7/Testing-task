import {
  GET_FORM_REQUEST,
  GET_FORM_SUCCESS,
  GET_FORM_FAILURE,
  SEND_FORM_REQUEST,
  SEND_FORM_SUCCESS,
  SEND_FORM_FAILURE
} from '../actions/formActions';

const initialState = {
  form: {},
  formLoaded: false,
  formSend: false,
  sendFormResult: {},
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FORM_REQUEST:
      return {
        ...state,
        formLoaded: false
      };
    case GET_FORM_SUCCESS:
      return {
        ...state,
        form: action.payload,
        formLoaded: true
      };
    case GET_FORM_FAILURE:
      return {
        ...state,
        formLoaded: false,
        error: action.payload
      };
    case SEND_FORM_REQUEST:
      return {
        ...state,
        formSend: false
      };
    case SEND_FORM_SUCCESS:
      return {
        ...state,
        sendFormResult: action.payload,
        formSend: true
      };
    case SEND_FORM_FAILURE:
      return {
        ...state,
        formSend: false,
        error: action.payload
      };
    default:
      return {
        ...state
      }
  }
}

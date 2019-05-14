import axios from 'axios';

export const GET_FORM_REQUEST = 'GET_FORM_REQUEST';
export const GET_FORM_SUCCESS = 'GET_FORM_SUCCESS';
export const GET_FORM_FAILURE = 'GET_FORM_FAILURE';

export const SEND_FORM_REQUEST = 'SEND_FORM_REQUEST';
export const SEND_FORM_SUCCESS = 'SEND_FORM_SUCCESS';
export const SEND_FORM_FAILURE = 'SEND_FORM_FAILURE';

export const loadForm = () => {
  return (dispatch) => {
    dispatch({
      type: GET_FORM_REQUEST
    });
    return axios.get('http://localhost:4000')
      .then(res => dispatch({
        type: GET_FORM_SUCCESS,
        payload: res.data
      })).catch(err => dispatch({
        type: GET_FORM_FAILURE,
        err
      })
    )
  }
};

export const sendForm = (form) => {
  return (dispatch) => {
    dispatch({
      type: SEND_FORM_REQUEST
    });
    return axios.post('http://localhost:4000/send', {form})
      .then(res => dispatch({
        type: SEND_FORM_SUCCESS,
        payload: res.data
      })).catch(err => dispatch({
          type: SEND_FORM_FAILURE,
          err
        })
      )
  }
};
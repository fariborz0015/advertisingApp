import {combineReducers} from 'redux';
 
import LOGIN_reducer from './LOGIN_reducer' 
import REDIRECT_reducer from './REDIRECT_reducer' 
import LOADING_reducer from './LOADING_reducer' 
 


export default combineReducers({
   
    LOGIN_reducer,
    REDIRECT_reducer,
    LOADING_reducer
  
  })
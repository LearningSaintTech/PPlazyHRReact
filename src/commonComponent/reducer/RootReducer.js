import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slice/AuthSlice"
import profileReducer from "../slice/ProfileSlice"


const RootReducer = combineReducers({
   auth:authReducer,
   profile:profileReducer,
    
    
})

export default RootReducer
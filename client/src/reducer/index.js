import {combineReducers} from '@reduxjs/toolkit';

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cardReducer from "../slices/cardSlice"
import courseReducer from "../slices/courseSlice"
import viewCourseReducer from "../slices/viewCourseSlice"


const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    card:cardReducer,
    course:courseReducer, 
    viewCourse:viewCourseReducer,   
})

export default rootReducer
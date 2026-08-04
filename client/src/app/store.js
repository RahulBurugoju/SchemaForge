import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth';
import projectReducer from '../features/project/project.Slice.js'
import canvasReducer from '../features/canvas/canvas.Slice.js'


export const store = configureStore({
        reducer:{
            auth:authReducer,
            project:projectReducer,
            canvas:canvasReducer,
        }
});

export default store;
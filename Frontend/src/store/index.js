import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import studentsReducer from './slices/studentsSlice';
import teachersReducer from './slices/teachersSlice';
import classesReducer from './slices/classesSlice';
import attendanceReducer from './slices/attendanceSlice';
import gradesReducer from './slices/gradesSlice';
import assignmentsReducer from './slices/assignmentsSlice';
import libraryReducer from './slices/librarySlice';
import examinationReducer from './slices/examinationSlice';
import timetableReducer from './slices/timetableSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    teachers: teachersReducer,
    classes: classesReducer,
    attendance: attendanceReducer,
    grades: gradesReducer,
    assignments: assignmentsReducer,
    library: libraryReducer,
    examination: examinationReducer,
    timetable: timetableReducer,
    ui: uiReducer,
  },
});

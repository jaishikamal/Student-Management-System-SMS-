import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for timetables
const mockTimetables = [
  {
    id: 1,
    class: 'Class 10A',
    academicYear: '2024-2025',
    semester: 'Spring',
    schedule: [
      {
        day: 'Monday',
        periods: [
          { time: '08:00-09:00', subject: 'Mathematics', teacher: 'Dr. John Smith', room: 'Room 101' },
          { time: '09:00-10:00', subject: 'Physics', teacher: 'Dr. Sarah Johnson', room: 'Room 102' },
          { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
          { time: '10:15-11:15', subject: 'English', teacher: 'Ms. Emily Brown', room: 'Room 103' },
          { time: '11:15-12:15', subject: 'Chemistry', teacher: 'Dr. Michael Wilson', room: 'Lab 1' },
          { time: '12:15-13:15', subject: 'Lunch', teacher: '', room: '' },
          { time: '13:15-14:15', subject: 'History', teacher: 'Mr. David Lee', room: 'Room 104' },
          { time: '14:15-15:15', subject: 'Computer Science', teacher: 'Ms. Lisa Chen', room: 'Lab 2' }
        ]
      },
      {
        day: 'Tuesday',
        periods: [
          { time: '08:00-09:00', subject: 'Physics', teacher: 'Dr. Sarah Johnson', room: 'Room 102' },
          { time: '09:00-10:00', subject: 'Mathematics', teacher: 'Dr. John Smith', room: 'Room 101' },
          { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
          { time: '10:15-11:15', subject: 'Chemistry', teacher: 'Dr. Michael Wilson', room: 'Lab 1' },
          { time: '11:15-12:15', subject: 'English', teacher: 'Ms. Emily Brown', room: 'Room 103' },
          { time: '12:15-13:15', subject: 'Lunch', teacher: '', room: '' },
          { time: '13:15-14:15', subject: 'Computer Science', teacher: 'Ms. Lisa Chen', room: 'Lab 2' },
          { time: '14:15-15:15', subject: 'History', teacher: 'Mr. David Lee', room: 'Room 104' }
        ]
      },
      {
        day: 'Wednesday',
        periods: [
          { time: '08:00-09:00', subject: 'English', teacher: 'Ms. Emily Brown', room: 'Room 103' },
          { time: '09:00-10:00', subject: 'Chemistry', teacher: 'Dr. Michael Wilson', room: 'Lab 1' },
          { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
          { time: '10:15-11:15', subject: 'Mathematics', teacher: 'Dr. John Smith', room: 'Room 101' },
          { time: '11:15-12:15', subject: 'Physics', teacher: 'Dr. Sarah Johnson', room: 'Room 102' },
          { time: '12:15-13:15', subject: 'Lunch', teacher: '', room: '' },
          { time: '13:15-14:15', subject: 'History', teacher: 'Mr. David Lee', room: 'Room 104' },
          { time: '14:15-15:15', subject: 'Computer Science', teacher: 'Ms. Lisa Chen', room: 'Lab 2' }
        ]
      },
      {
        day: 'Thursday',
        periods: [
          { time: '08:00-09:00', subject: 'Chemistry', teacher: 'Dr. Michael Wilson', room: 'Lab 1' },
          { time: '09:00-10:00', subject: 'English', teacher: 'Ms. Emily Brown', room: 'Room 103' },
          { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
          { time: '10:15-11:15', subject: 'Physics', teacher: 'Dr. Sarah Johnson', room: 'Room 102' },
          { time: '11:15-12:15', subject: 'Mathematics', teacher: 'Dr. John Smith', room: 'Room 101' },
          { time: '12:15-13:15', subject: 'Lunch', teacher: '', room: '' },
          { time: '13:15-14:15', subject: 'Computer Science', teacher: 'Ms. Lisa Chen', room: 'Lab 2' },
          { time: '14:15-15:15', subject: 'History', teacher: 'Mr. David Lee', room: 'Room 104' }
        ]
      },
      {
        day: 'Friday',
        periods: [
          { time: '08:00-09:00', subject: 'History', teacher: 'Mr. David Lee', room: 'Room 104' },
          { time: '09:00-10:00', subject: 'Computer Science', teacher: 'Ms. Lisa Chen', room: 'Lab 2' },
          { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
          { time: '10:15-11:15', subject: 'Mathematics', teacher: 'Dr. John Smith', room: 'Room 101' },
          { time: '11:15-12:15', subject: 'English', teacher: 'Ms. Emily Brown', room: 'Room 103' },
          { time: '12:15-13:15', subject: 'Lunch', teacher: '', room: '' },
          { time: '13:15-14:15', subject: 'Physics', teacher: 'Dr. Sarah Johnson', room: 'Room 102' },
          { time: '14:15-15:15', subject: 'Chemistry', teacher: 'Dr. Michael Wilson', room: 'Lab 1' }
        ]
      }
    ],
    createdAt: '2024-01-15T10:00:00',
    updatedAt: '2024-01-15T10:00:00'
  },
  {
    id: 2,
    class: 'Class 11B',
    academicYear: '2024-2025',
    semester: 'Spring',
    schedule: [
      {
        day: 'Monday',
        periods: [
          { time: '08:00-09:00', subject: 'Advanced Mathematics', teacher: 'Dr. John Smith', room: 'Room 201' },
          { time: '09:00-10:00', subject: 'Advanced Physics', teacher: 'Dr. Sarah Johnson', room: 'Room 202' },
          { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
          { time: '10:15-11:15', subject: 'Literature', teacher: 'Ms. Emily Brown', room: 'Room 203' },
          { time: '11:15-12:15', subject: 'Advanced Chemistry', teacher: 'Dr. Michael Wilson', room: 'Lab 3' },
          { time: '12:15-13:15', subject: 'Lunch', teacher: '', room: '' },
          { time: '13:15-14:15', subject: 'Economics', teacher: 'Mr. David Lee', room: 'Room 204' },
          { time: '14:15-15:15', subject: 'Programming', teacher: 'Ms. Lisa Chen', room: 'Lab 4' }
        ]
      }
    ],
    createdAt: '2024-01-16T10:00:00',
    updatedAt: '2024-01-16T10:00:00'
  }
];

const mockTeacherSchedules = [
  {
    id: 1,
    teacherId: 1,
    teacherName: 'Dr. John Smith',
    subject: 'Mathematics',
    schedule: [
      { day: 'Monday', time: '08:00-09:00', class: 'Class 10A', room: 'Room 101' },
      { day: 'Monday', time: '09:00-10:00', class: 'Class 11B', room: 'Room 201' },
      { day: 'Tuesday', time: '09:00-10:00', class: 'Class 10A', room: 'Room 101' },
      { day: 'Wednesday', time: '10:15-11:15', class: 'Class 10A', room: 'Room 101' },
      { day: 'Thursday', time: '11:15-12:15', class: 'Class 10A', room: 'Room 101' },
      { day: 'Friday', time: '10:15-11:15', class: 'Class 10A', room: 'Room 101' }
    ]
  },
  {
    id: 2,
    teacherId: 2,
    teacherName: 'Dr. Sarah Johnson',
    subject: 'Physics',
    schedule: [
      { day: 'Monday', time: '09:00-10:00', class: 'Class 10A', room: 'Room 102' },
      { day: 'Monday', time: '09:00-10:00', class: 'Class 11B', room: 'Room 202' },
      { day: 'Tuesday', time: '08:00-09:00', class: 'Class 10A', room: 'Room 102' },
      { day: 'Wednesday', time: '11:15-12:15', class: 'Class 10A', room: 'Room 102' },
      { day: 'Thursday', time: '10:15-11:15', class: 'Class 10A', room: 'Room 102' },
      { day: 'Friday', time: '13:15-14:15', class: 'Class 10A', room: 'Room 102' }
    ]
  }
];

const mockScheduleChanges = [
  {
    id: 1,
    timetableId: 1,
    class: 'Class 10A',
    changeType: 'period_change', // period_change, teacher_change, room_change, cancellation
    day: 'Monday',
    oldPeriod: { time: '08:00-09:00', subject: 'Mathematics', teacher: 'Dr. John Smith', room: 'Room 101' },
    newPeriod: { time: '08:00-09:00', subject: 'Mathematics', teacher: 'Dr. John Smith', room: 'Room 105' },
    reason: 'Room 101 under maintenance',
    effectiveDate: '2024-02-20',
    notificationSent: true,
    createdAt: '2024-02-18T10:00:00'
  },
  {
    id: 2,
    timetableId: 1,
    class: 'Class 10A',
    changeType: 'teacher_change',
    day: 'Wednesday',
    oldPeriod: { time: '10:15-11:15', subject: 'English', teacher: 'Ms. Emily Brown', room: 'Room 103' },
    newPeriod: { time: '10:15-11:15', subject: 'English', teacher: 'Ms. Jennifer Davis', room: 'Room 103' },
    reason: 'Ms. Brown on sick leave',
    effectiveDate: '2024-02-21',
    notificationSent: false,
    createdAt: '2024-02-19T14:00:00'
  }
];

const initialState = {
  timetables: mockTimetables,
  teacherSchedules: mockTeacherSchedules,
  scheduleChanges: mockScheduleChanges,
  loading: false,
  error: null,
  selectedClass: null,
  selectedTeacher: null,
  conflicts: []
};

// Async thunks
export const fetchTimetables = createAsyncThunk(
  'timetable/fetchTimetables',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockTimetables;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTimetable = createAsyncThunk(
  'timetable/createTimetable',
  async (timetableData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newTimetable = {
        id: Date.now(),
        ...timetableData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return newTimetable;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTimetable = createAsyncThunk(
  'timetable/updateTimetable',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, updates, updatedAt: new Date().toISOString() };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addScheduleChange = createAsyncThunk(
  'timetable/addScheduleChange',
  async (changeData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newChange = {
        id: Date.now(),
        ...changeData,
        createdAt: new Date().toISOString()
      };
      return newChange;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkConflicts = createAsyncThunk(
  'timetable/checkConflicts',
  async (scheduleData, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const conflicts = [];
      
      // Check for teacher conflicts
      const teacherSchedules = state.timetable.teacherSchedules;
      const { teacherId, day, time } = scheduleData;
      
      const teacherSchedule = teacherSchedules.find(ts => ts.teacherId === teacherId);
      if (teacherSchedule) {
        const conflict = teacherSchedule.schedule.find(s => 
          s.day === day && s.time === time
        );
        if (conflict) {
          conflicts.push({
            type: 'teacher_conflict',
            message: `Teacher already has a class at ${time} on ${day}`,
            conflictingClass: conflict.class
          });
        }
      }
      
      // Check for room conflicts
      const allTimetables = state.timetable.timetables;
      allTimetables.forEach(timetable => {
        timetable.schedule.forEach(daySchedule => {
          if (daySchedule.day === day) {
            const roomConflict = daySchedule.periods.find(p => 
              p.time === time && p.room === scheduleData.room
            );
            if (roomConflict) {
              conflicts.push({
                type: 'room_conflict',
                message: `Room ${scheduleData.room} is already occupied at ${time} on ${day}`,
                conflictingClass: timetable.class
              });
            }
          }
        });
      });
      
      return conflicts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const timetableSlice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {
    setSelectedClass: (state, action) => {
      state.selectedClass = action.payload;
    },
    setSelectedTeacher: (state, action) => {
      state.selectedTeacher = action.payload;
    },
    clearConflicts: (state) => {
      state.conflicts = [];
    },
    markNotificationSent: (state, action) => {
      const change = state.scheduleChanges.find(c => c.id === action.payload);
      if (change) {
        change.notificationSent = true;
      }
    },
    updatePeriod: (state, action) => {
      const { timetableId, day, periodIndex, updates } = action.payload;
      const timetable = state.timetables.find(t => t.id === timetableId);
      if (timetable) {
        const daySchedule = timetable.schedule.find(d => d.day === day);
        if (daySchedule && daySchedule.periods[periodIndex]) {
          daySchedule.periods[periodIndex] = { ...daySchedule.periods[periodIndex], ...updates };
          timetable.updatedAt = new Date().toISOString();
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimetables.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTimetables.fulfilled, (state, action) => {
        state.loading = false;
        state.timetables = action.payload;
      })
      .addCase(fetchTimetables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTimetable.fulfilled, (state, action) => {
        state.timetables.push(action.payload);
      })
      .addCase(updateTimetable.fulfilled, (state, action) => {
        const { id, updates, updatedAt } = action.payload;
        const timetable = state.timetables.find(t => t.id === id);
        if (timetable) {
          Object.assign(timetable, updates);
          timetable.updatedAt = updatedAt;
        }
      })
      .addCase(addScheduleChange.fulfilled, (state, action) => {
        state.scheduleChanges.push(action.payload);
      })
      .addCase(checkConflicts.fulfilled, (state, action) => {
        state.conflicts = action.payload;
      });
  }
});

export const {
  setSelectedClass,
  setSelectedTeacher,
  clearConflicts,
  markNotificationSent,
  updatePeriod
} = timetableSlice.actions;

// Selectors
export const selectAllTimetables = (state) => state.timetable.timetables;
export const selectAllTeacherSchedules = (state) => state.timetable.teacherSchedules;
export const selectAllScheduleChanges = (state) => state.timetable.scheduleChanges;
export const selectTimetableLoading = (state) => state.timetable.loading;
export const selectTimetableError = (state) => state.timetable.error;
export const selectSelectedClass = (state) => state.timetable.selectedClass;
export const selectSelectedTeacher = (state) => state.timetable.selectedTeacher;
export const selectConflicts = (state) => state.timetable.conflicts;

export const selectTimetableByClass = (state, className) => {
  return state.timetable.timetables.find(t => t.class === className);
};

export const selectTeacherSchedule = (state, teacherId) => {
  return state.timetable.teacherSchedules.find(ts => ts.teacherId === teacherId);
};

export const selectScheduleChangesByClass = (state, className) => {
  return state.timetable.scheduleChanges.filter(sc => sc.class === className);
};

export const selectPendingNotifications = (state) => {
  return state.timetable.scheduleChanges.filter(sc => !sc.notificationSent);
};

export const selectClasses = (state) => {
  return [...new Set(state.timetable.timetables.map(t => t.class))];
};

export const selectTeachers = (state) => {
  return [...new Set(state.timetable.teacherSchedules.map(ts => ts.teacherName))];
};

export const selectSubjects = (state) => {
  const subjects = new Set();
  state.timetable.timetables.forEach(timetable => {
    timetable.schedule.forEach(day => {
      day.periods.forEach(period => {
        if (period.subject && period.subject !== 'Break' && period.subject !== 'Lunch') {
          subjects.add(period.subject);
        }
      });
    });
  });
  return Array.from(subjects);
};

export const selectRooms = (state) => {
  const rooms = new Set();
  state.timetable.timetables.forEach(timetable => {
    timetable.schedule.forEach(day => {
      day.periods.forEach(period => {
        if (period.room) {
          rooms.add(period.room);
        }
      });
    });
  });
  return Array.from(rooms);
};

export default timetableSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockAttendance = [
  {
    id: 1,
    date: '2024-01-15',
    class: '10A',
    section: 'A',
    students: [
      { studentId: 1, name: 'John Doe', status: 'present' },
      { studentId: 2, name: 'Jane Smith', status: 'absent' }
    ]
  },
  {
    id: 2,
    date: '2024-01-16',
    class: '10A',
    section: 'A',
    students: [
      { studentId: 1, name: 'John Doe', status: 'present' },
      { studentId: 2, name: 'Jane Smith', status: 'present' }
    ]
  }
];

export const fetchAttendance = createAsyncThunk(
  'attendance/fetchAttendance',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockAttendance;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const markAttendance = createAsyncThunk(
  'attendance/markAttendance',
  async (attendanceData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return attendanceData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  attendance: [],
  loading: false,
  error: null
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.attendance.findIndex(a => a.date === action.payload.date);
        if (index !== -1) {
          state.attendance[index] = action.payload;
        } else {
          state.attendance.push(action.payload);
        }
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = attendanceSlice.actions;
export default attendanceSlice.reducer;

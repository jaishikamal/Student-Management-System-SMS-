import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockClasses = [
  {
    id: 1,
    name: '10A',
    section: 'A',
    teacher: 'Dr. Sarah Johnson',
    subject: 'Mathematics',
    students: 25,
    schedule: 'Monday, Wednesday, Friday',
    time: '9:00 AM - 10:00 AM',
    room: 'Room 101'
  },
  {
    id: 2,
    name: '10A',
    section: 'A',
    teacher: 'Mr. David Wilson',
    subject: 'Physics',
    students: 25,
    schedule: 'Tuesday, Thursday',
    time: '10:00 AM - 11:00 AM',
    room: 'Room 102'
  }
];

export const fetchClasses = createAsyncThunk(
  'classes/fetchClasses',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockClasses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  classes: [],
  loading: false,
  error: null
};

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = classesSlice.actions;
export default classesSlice.reducer;

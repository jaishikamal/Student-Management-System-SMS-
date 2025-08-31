import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockTeachers = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@school.com',
    phone: '+1234567890',
    subject: 'Mathematics',
    qualification: 'PhD in Mathematics',
    experience: '8 years',
    class: '10A',
    section: 'A',
    status: 'active',
    avatar: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Mr. David Wilson',
    email: 'david.wilson@school.com',
    phone: '+1234567891',
    subject: 'Physics',
    qualification: 'MSc in Physics',
    experience: '5 years',
    class: '10A',
    section: 'A',
    status: 'active',
    avatar: 'https://via.placeholder.com/150'
  }
];

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockTeachers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTeacher = createAsyncThunk(
  'teachers/addTeacher',
  async (teacherData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newTeacher = {
        id: Date.now(),
        ...teacherData,
        status: 'active',
        avatar: 'https://via.placeholder.com/150'
      };
      return newTeacher;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  teachers: [],
  loading: false,
  error: null
};

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers.push(action.payload);
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = teachersSlice.actions;
export default teachersSlice.reducer;

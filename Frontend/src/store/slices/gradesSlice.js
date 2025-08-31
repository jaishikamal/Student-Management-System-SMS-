import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockGrades = [
  {
    id: 1,
    studentId: 1,
    studentName: 'John Doe',
    subject: 'Mathematics',
    grade: 'A',
    score: 85,
    maxScore: 100,
    semester: 'Fall 2024',
    date: '2024-01-15',
    teacher: 'Dr. Sarah Johnson'
  },
  {
    id: 2,
    studentId: 1,
    studentName: 'John Doe',
    subject: 'Physics',
    grade: 'B+',
    score: 78,
    maxScore: 100,
    semester: 'Fall 2024',
    date: '2024-01-16',
    teacher: 'Mr. David Wilson'
  },
  {
    id: 3,
    studentId: 2,
    studentName: 'Jane Smith',
    subject: 'Mathematics',
    grade: 'A+',
    score: 92,
    maxScore: 100,
    semester: 'Fall 2024',
    date: '2024-01-15',
    teacher: 'Dr. Sarah Johnson'
  }
];

export const fetchGrades = createAsyncThunk(
  'grades/fetchGrades',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockGrades;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addGrade = createAsyncThunk(
  'grades/addGrade',
  async (gradeData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newGrade = {
        id: Date.now(),
        ...gradeData,
        date: new Date().toISOString().split('T')[0]
      };
      return newGrade;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  grades: [],
  loading: false,
  error: null
};

const gradesSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.loading = false;
        state.grades = action.payload;
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.grades.push(action.payload);
      })
      .addCase(addGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = gradesSlice.actions;
export default gradesSlice.reducer;

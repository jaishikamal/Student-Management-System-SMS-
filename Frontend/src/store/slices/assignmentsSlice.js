import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockAssignments = [
  {
    id: 1,
    title: 'Mathematics Assignment 1',
    subject: 'Mathematics',
    description: 'Complete exercises 1-10 from Chapter 3',
    dueDate: '2024-01-20',
    teacher: 'Dr. Sarah Johnson',
    class: '10A',
    section: 'A',
    fileUrl: 'https://example.com/assignment1.pdf',
    fileName: 'assignment1.pdf',
    uploadDate: '2024-01-15',
    status: 'active'
  },
  {
    id: 2,
    title: 'Physics Lab Report',
    subject: 'Physics',
    description: 'Submit lab report for experiment on Newton\'s Laws',
    dueDate: '2024-01-25',
    teacher: 'Mr. David Wilson',
    class: '10A',
    section: 'A',
    fileUrl: 'https://example.com/lab_report.pdf',
    fileName: 'lab_report.pdf',
    uploadDate: '2024-01-16',
    status: 'active'
  }
];

export const fetchAssignments = createAsyncThunk(
  'assignments/fetchAssignments',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockAssignments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAssignment = createAsyncThunk(
  'assignments/addAssignment',
  async (assignmentData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newAssignment = {
        id: Date.now(),
        ...assignmentData,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      return newAssignment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  assignments: [],
  loading: false,
  error: null
};

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments.push(action.payload);
      })
      .addCase(addAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;

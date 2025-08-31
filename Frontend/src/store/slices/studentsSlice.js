import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock students data with real student images
const mockStudents = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@student.com',
    rollNumber: 'ST001',
    class: '10A',
    section: 'A',
    phone: '+1234567890',
    address: '123 Main St, City',
    dateOfBirth: '2005-03-15',
    gender: 'Male',
    parentName: 'Mike Doe',
    parentPhone: '+1234567891',
    admissionDate: '2020-06-01',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@student.com',
    rollNumber: 'ST002',
    class: '10A',
    section: 'A',
    phone: '+1234567892',
    address: '456 Oak St, City',
    dateOfBirth: '2005-07-22',
    gender: 'Female',
    parentName: 'Sarah Smith',
    parentPhone: '+1234567893',
    admissionDate: '2020-06-01',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    email: 'michael.johnson@student.com',
    rollNumber: 'ST003',
    class: '11B',
    section: 'B',
    phone: '+1234567894',
    address: '789 Pine St, City',
    dateOfBirth: '2004-11-08',
    gender: 'Male',
    parentName: 'David Johnson',
    parentPhone: '+1234567895',
    admissionDate: '2019-06-01',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@student.com',
    rollNumber: 'ST004',
    class: '12A',
    section: 'A',
    phone: '+1234567896',
    address: '321 Elm St, City',
    dateOfBirth: '2003-05-12',
    gender: 'Female',
    parentName: 'Robert Davis',
    parentPhone: '+1234567897',
    admissionDate: '2018-06-01',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Alex Chen',
    email: 'alex.chen@student.com',
    rollNumber: 'ST005',
    class: '9C',
    section: 'C',
    phone: '+1234567898',
    address: '654 Maple St, City',
    dateOfBirth: '2006-09-25',
    gender: 'Male',
    parentName: 'Lisa Chen',
    parentPhone: '+1234567899',
    admissionDate: '2021-06-01',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 6,
    name: 'Sophia Wilson',
    email: 'sophia.wilson@student.com',
    rollNumber: 'ST006',
    class: '10B',
    section: 'B',
    phone: '+1234567900',
    address: '987 Cedar St, City',
    dateOfBirth: '2005-01-30',
    gender: 'Female',
    parentName: 'James Wilson',
    parentPhone: '+1234567901',
    admissionDate: '2020-06-01',
    status: 'inactive',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 7,
    name: 'Daniel Brown',
    email: 'daniel.brown@student.com',
    rollNumber: 'ST007',
    class: '11A',
    section: 'A',
    phone: '+1234567902',
    address: '147 Birch St, City',
    dateOfBirth: '2004-12-03',
    gender: 'Male',
    parentName: 'Patricia Brown',
    parentPhone: '+1234567903',
    admissionDate: '2019-06-01',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 8,
    name: 'Olivia Taylor',
    email: 'olivia.taylor@student.com',
    rollNumber: 'ST008',
    class: '12B',
    section: 'B',
    phone: '+1234567904',
    address: '258 Spruce St, City',
    dateOfBirth: '2003-08-17',
    gender: 'Female',
    parentName: 'William Taylor',
    parentPhone: '+1234567905',
    admissionDate: '2018-06-01',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
  }
];

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockStudents;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Array of real student profile images
const studentAvatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
];

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Randomly select an avatar from the array
      const randomAvatar = studentAvatars[Math.floor(Math.random() * studentAvatars.length)];
      
      const newStudent = {
        id: Date.now(),
        ...studentData,
        status: 'active',
        admissionDate: new Date().toISOString().split('T')[0],
        avatar: randomAvatar
      };
      return newStudent;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, studentData }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { id, ...studentData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  students: [],
  loading: false,
  error: null,
  selectedStudent: null
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
    clearSelectedStudent: (state) => {
      state.selectedStudent = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.students.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(s => s.id !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedStudent, clearSelectedStudent, clearError } = studentsSlice.actions;
export default studentsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock user data for demonstration with real profile images
const mockUsers = [
  {
    id: 1,
    email: 'admin@school.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    department: 'Administration',
    lastLogin: null
  },
  {
    id: 2,
    email: 'teacher@school.com',
    password: 'teacher123',
    role: 'teacher',
    name: 'John Teacher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    department: 'Mathematics',
    lastLogin: null
  },
  {
    id: 3,
    email: 'student@school.com',
    password: 'student123',
    role: 'student',
    name: 'Jane Student',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    department: 'Class 10A',
    lastLogin: null
  }
];

// Validation functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Input validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      if (!validatePassword(password)) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      }
      
      // Update last login time
      user.lastLogin = new Date().toISOString();
      
      const { password: _, ...userWithoutPassword } = user;
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('lastLogin', user.lastLogin);
      
      return userWithoutPassword;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      // Input validation
      if (!name || !email || !password || !role) {
        throw new Error('All fields are required');
      }

      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      if (!validatePassword(password)) {
        throw new Error('Password must be at least 6 characters long');
      }

      if (name.trim().length < 2) {
        throw new Error('Name must be at least 2 characters long');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        throw new Error('An account with this email already exists. Please try logging in instead.');
      }
      
      const newUser = {
        id: mockUsers.length + 1,
        name: name.trim(),
        email: email.toLowerCase(),
        password,
        role,
        avatar: 'https://via.placeholder.com/150',
        department: role === 'student' ? 'Class 10A' : 'General',
        lastLogin: new Date().toISOString()
      };
      
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('lastLogin', newUser.lastLogin);
      
      return userWithoutPassword;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Check if user session is still valid
export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        throw new Error('No user session found');
      }

      const user = JSON.parse(userData);
      const lastLogin = localStorage.getItem('lastLogin');

      // Check if session is expired (24 hours)
      if (lastLogin) {
        const lastLoginTime = new Date(lastLogin);
        const now = new Date();
        const hoursDiff = (now - lastLoginTime) / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
          localStorage.removeItem('user');
          localStorage.removeItem('lastLogin');
          throw new Error('Session expired. Please login again.');
        }
      }

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
  loading: false,
  error: null,
  lastLogin: localStorage.getItem('lastLogin') || null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.lastLogin = null;
      localStorage.removeItem('user');
      localStorage.removeItem('lastLogin');
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.lastLogin = action.payload.lastLogin;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.lastLogin = action.payload.lastLogin;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearError, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;

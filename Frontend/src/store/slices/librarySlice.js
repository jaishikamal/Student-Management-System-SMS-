import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for library
const mockBooks = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    category: 'Fiction',
    totalCopies: 5,
    availableCopies: 3,
    location: 'Shelf A1',
    publishedYear: 1960,
    description: 'A classic novel about racial injustice in the American South.'
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0-452-28423-4',
    category: 'Fiction',
    totalCopies: 3,
    availableCopies: 1,
    location: 'Shelf A2',
    publishedYear: 1949,
    description: 'A dystopian novel about totalitarian surveillance society.'
  },
  {
    id: 3,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    category: 'Fiction',
    totalCopies: 4,
    availableCopies: 4,
    location: 'Shelf A3',
    publishedYear: 1925,
    description: 'A story of the Jazz Age and the American Dream.'
  },
  {
    id: 4,
    title: 'Mathematics for Engineers',
    author: 'Dr. John Smith',
    isbn: '978-1-234-56789-0',
    category: 'Academic',
    totalCopies: 8,
    availableCopies: 6,
    location: 'Shelf B1',
    publishedYear: 2020,
    description: 'Comprehensive mathematics textbook for engineering students.'
  },
  {
    id: 5,
    title: 'Physics Fundamentals',
    author: 'Dr. Sarah Johnson',
    isbn: '978-1-234-56789-1',
    category: 'Academic',
    totalCopies: 6,
    availableCopies: 4,
    location: 'Shelf B2',
    publishedYear: 2019,
    description: 'Basic principles of physics for university students.'
  }
];

const mockBorrowings = [
  {
    id: 1,
    bookId: 1,
    studentId: 1,
    studentName: 'John Doe',
    borrowDate: '2024-01-15',
    dueDate: '2024-02-15',
    returnDate: null,
    status: 'borrowed', // borrowed, returned, overdue
    fine: 0
  },
  {
    id: 2,
    bookId: 2,
    studentId: 2,
    studentName: 'Jane Smith',
    borrowDate: '2024-01-10',
    dueDate: '2024-02-10',
    returnDate: '2024-02-08',
    status: 'returned',
    fine: 0
  },
  {
    id: 3,
    bookId: 3,
    studentId: 3,
    studentName: 'Mike Johnson',
    borrowDate: '2024-01-05',
    dueDate: '2024-02-05',
    returnDate: null,
    status: 'overdue',
    fine: 15.50
  }
];

const initialState = {
  books: mockBooks,
  borrowings: mockBorrowings,
  loading: false,
  error: null,
  searchTerm: '',
  filterCategory: 'all',
  fineRate: 0.50 // $0.50 per day
};

// Async thunks
export const fetchBooks = createAsyncThunk(
  'library/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockBooks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBook = createAsyncThunk(
  'library/addBook',
  async (bookData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      const newBook = {
        id: Date.now(),
        ...bookData,
        availableCopies: bookData.totalCopies
      };
      return newBook;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const borrowBook = createAsyncThunk(
  'library/borrowBook',
  async ({ bookId, studentId, studentName }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const book = state.library.books.find(b => b.id === bookId);
      
      if (!book || book.availableCopies <= 0) {
        throw new Error('Book not available');
      }

      const borrowDate = new Date().toISOString().split('T')[0];
      const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const newBorrowing = {
        id: Date.now(),
        bookId,
        studentId,
        studentName,
        borrowDate,
        dueDate,
        returnDate: null,
        status: 'borrowed',
        fine: 0
      };

      return { newBorrowing, bookId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const returnBook = createAsyncThunk(
  'library/returnBook',
  async (borrowingId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const borrowing = state.library.borrowings.find(b => b.id === borrowingId);
      
      if (!borrowing) {
        throw new Error('Borrowing record not found');
      }

      const returnDate = new Date().toISOString().split('T')[0];
      const dueDate = new Date(borrowing.dueDate);
      const actualReturnDate = new Date(returnDate);
      
      let fine = 0;
      if (actualReturnDate > dueDate) {
        const daysLate = Math.ceil((actualReturnDate - dueDate) / (1000 * 60 * 60 * 24));
        fine = daysLate * state.library.fineRate;
      }

      return { borrowingId, returnDate, fine };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    updateFineRate: (state, action) => {
      state.fineRate = action.payload;
    },
    calculateOverdueFines: (state) => {
      const today = new Date();
      state.borrowings.forEach(borrowing => {
        if (borrowing.status === 'borrowed') {
          const dueDate = new Date(borrowing.dueDate);
          if (today > dueDate) {
            const daysLate = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
            borrowing.fine = daysLate * state.fineRate;
            borrowing.status = 'overdue';
          }
        }
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(borrowBook.fulfilled, (state, action) => {
        const { newBorrowing, bookId } = action.payload;
        state.borrowings.push(newBorrowing);
        const book = state.books.find(b => b.id === bookId);
        if (book) {
          book.availableCopies -= 1;
        }
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        const { borrowingId, returnDate, fine } = action.payload;
        const borrowing = state.borrowings.find(b => b.id === borrowingId);
        if (borrowing) {
          borrowing.returnDate = returnDate;
          borrowing.status = 'returned';
          borrowing.fine = fine;
          
          const book = state.books.find(b => b.id === borrowing.bookId);
          if (book) {
            book.availableCopies += 1;
          }
        }
      });
  }
});

export const { 
  setSearchTerm, 
  setFilterCategory, 
  updateFineRate, 
  calculateOverdueFines 
} = librarySlice.actions;

// Selectors
export const selectAllBooks = (state) => state.library.books;
export const selectAllBorrowings = (state) => state.library.borrowings;
export const selectLibraryLoading = (state) => state.library.loading;
export const selectLibraryError = (state) => state.library.error;
export const selectFineRate = (state) => state.library.fineRate;

export const selectFilteredBooks = (state) => {
  const { books, searchTerm, filterCategory } = state.library;
  return books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = filterCategory === 'all' || book.category === filterCategory;
    return matchesSearch && matchesCategory;
  });
};

export const selectBookCategories = (state) => {
  const categories = [...new Set(state.library.books.map(book => book.category))];
  return categories;
};

export const selectOverdueBooks = (state) => {
  return state.library.borrowings.filter(borrowing => borrowing.status === 'overdue');
};

export const selectTotalFines = (state) => {
  return state.library.borrowings.reduce((total, borrowing) => total + borrowing.fine, 0);
};

export default librarySlice.reducer;

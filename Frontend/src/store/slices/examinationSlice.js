import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for examinations
const mockExams = [
  {
    id: 1,
    title: 'Mathematics Mid-Term Exam',
    subject: 'Mathematics',
    class: 'Class 10A',
    duration: 90, // minutes
    totalMarks: 100,
    startDate: '2024-02-20T09:00:00',
    endDate: '2024-02-20T10:30:00',
    status: 'scheduled', // scheduled, active, completed, cancelled
    instructions: 'This exam contains 50 multiple choice questions. Each question carries 2 marks.',
    createdBy: 'teacher@school.com',
    createdAt: '2024-02-15T10:00:00'
  },
  {
    id: 2,
    title: 'Physics Quiz - Chapter 5',
    subject: 'Physics',
    class: 'Class 11B',
    duration: 45,
    totalMarks: 50,
    startDate: '2024-02-18T14:00:00',
    endDate: '2024-02-18T14:45:00',
    status: 'completed',
    instructions: 'Answer all questions. No negative marking.',
    createdBy: 'teacher@school.com',
    createdAt: '2024-02-10T09:00:00'
  },
  {
    id: 3,
    title: 'English Literature Test',
    subject: 'English',
    class: 'Class 9C',
    duration: 60,
    totalMarks: 75,
    startDate: '2024-02-25T11:00:00',
    endDate: '2024-02-25T12:00:00',
    status: 'scheduled',
    instructions: 'Read the passages carefully and answer the questions.',
    createdBy: 'teacher@school.com',
    createdAt: '2024-02-12T15:00:00'
  }
];

const mockQuestions = [
  // Math Exam Questions
  {
    id: 1,
    examId: 1,
    question: 'What is the value of π (pi) to two decimal places?',
    type: 'multiple_choice',
    options: ['3.12', '3.14', '3.16', '3.18'],
    correctAnswer: '3.14',
    marks: 2,
    explanation: 'π (pi) is approximately 3.14159, so to two decimal places it is 3.14.'
  },
  {
    id: 2,
    examId: 1,
    question: 'Solve for x: 2x + 5 = 13',
    type: 'multiple_choice',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
    marks: 2,
    explanation: '2x + 5 = 13 → 2x = 8 → x = 4'
  },
  {
    id: 3,
    examId: 1,
    question: 'What is the area of a circle with radius 5 units?',
    type: 'multiple_choice',
    options: ['25π', '50π', '75π', '100π'],
    correctAnswer: '25π',
    marks: 2,
    explanation: 'Area = πr² = π(5)² = 25π'
  },
  // Physics Quiz Questions
  {
    id: 4,
    examId: 2,
    question: 'What is the SI unit of force?',
    type: 'multiple_choice',
    options: ['Joule', 'Newton', 'Watt', 'Pascal'],
    correctAnswer: 'Newton',
    marks: 1,
    explanation: 'The SI unit of force is the Newton (N).'
  },
  {
    id: 5,
    examId: 2,
    question: 'Which of the following is a vector quantity?',
    type: 'multiple_choice',
    options: ['Mass', 'Temperature', 'Velocity', 'Time'],
    correctAnswer: 'Velocity',
    marks: 1,
    explanation: 'Velocity has both magnitude and direction, making it a vector quantity.'
  },
  // English Test Questions
  {
    id: 6,
    examId: 3,
    question: 'Who wrote "Romeo and Juliet"?',
    type: 'multiple_choice',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    correctAnswer: 'William Shakespeare',
    marks: 2,
    explanation: 'Romeo and Juliet was written by William Shakespeare.'
  },
  {
    id: 7,
    examId: 3,
    question: 'What is the main theme of "To Kill a Mockingbird"?',
    type: 'essay',
    marks: 10,
    explanation: 'The main themes include racial injustice, loss of innocence, and the coexistence of good and evil.'
  }
];

const mockResults = [
  {
    id: 1,
    examId: 2,
    studentId: 1,
    studentName: 'John Doe',
    startTime: '2024-02-18T14:00:00',
    endTime: '2024-02-18T14:35:00',
    totalMarks: 50,
    obtainedMarks: 42,
    percentage: 84,
    grade: 'A',
    status: 'completed',
    answers: [
      { questionId: 4, answer: 'Newton', isCorrect: true },
      { questionId: 5, answer: 'Velocity', isCorrect: true }
    ]
  },
  {
    id: 2,
    examId: 2,
    studentId: 2,
    studentName: 'Jane Smith',
    startTime: '2024-02-18T14:00:00',
    endTime: '2024-02-18T14:40:00',
    totalMarks: 50,
    obtainedMarks: 38,
    percentage: 76,
    grade: 'B',
    status: 'completed',
    answers: [
      { questionId: 4, answer: 'Newton', isCorrect: true },
      { questionId: 5, answer: 'Mass', isCorrect: false }
    ]
  }
];

const initialState = {
  exams: mockExams,
  questions: mockQuestions,
  results: mockResults,
  loading: false,
  error: null,
  currentExam: null,
  currentQuestionIndex: 0,
  examTimer: null,
  studentAnswers: {}
};

// Async thunks
export const fetchExams = createAsyncThunk(
  'examination/fetchExams',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockExams;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createExam = createAsyncThunk(
  'examination/createExam',
  async (examData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newExam = {
        id: Date.now(),
        ...examData,
        status: 'scheduled',
        createdAt: new Date().toISOString()
      };
      return newExam;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addQuestions = createAsyncThunk(
  'examination/addQuestions',
  async ({ examId, questions }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newQuestions = questions.map((q, index) => ({
        id: Date.now() + index,
        examId,
        ...q
      }));
      return newQuestions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const startExam = createAsyncThunk(
  'examination/startExam',
  async ({ examId, studentId, studentName }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const exam = state.examination.exams.find(e => e.id === examId);
      
      if (!exam || exam.status !== 'active') {
        throw new Error('Exam is not available');
      }

      const startTime = new Date().toISOString();
      const endTime = new Date(Date.now() + exam.duration * 60 * 1000).toISOString();

      return { examId, studentId, studentName, startTime, endTime };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitExam = createAsyncThunk(
  'examination/submitExam',
  async ({ examId, studentId, studentName, answers }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const exam = state.examination.exams.find(e => e.id === examId);
      const questions = state.examination.questions.filter(q => q.examId === examId);
      
      let totalMarks = 0;
      let obtainedMarks = 0;
      const gradedAnswers = [];

      questions.forEach(question => {
        totalMarks += question.marks;
        const studentAnswer = answers[question.id];
        
        if (question.type === 'multiple_choice') {
          const isCorrect = studentAnswer === question.correctAnswer;
          if (isCorrect) {
            obtainedMarks += question.marks;
          }
          gradedAnswers.push({
            questionId: question.id,
            answer: studentAnswer,
            isCorrect
          });
        } else if (question.type === 'essay') {
          // For essay questions, manual grading would be needed
          // For now, we'll give partial marks
          obtainedMarks += question.marks * 0.7; // 70% for essay
          gradedAnswers.push({
            questionId: question.id,
            answer: studentAnswer,
            isCorrect: null // Manual grading required
          });
        }
      });

      const percentage = Math.round((obtainedMarks / totalMarks) * 100);
      const grade = percentage >= 90 ? 'A' : 
                   percentage >= 80 ? 'B' : 
                   percentage >= 70 ? 'C' : 
                   percentage >= 60 ? 'D' : 'F';

      const result = {
        id: Date.now(),
        examId,
        studentId,
        studentName,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        totalMarks,
        obtainedMarks: Math.round(obtainedMarks),
        percentage,
        grade,
        status: 'completed',
        answers: gradedAnswers
      };

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const examinationSlice = createSlice({
  name: 'examination',
  initialState,
  reducers: {
    setCurrentExam: (state, action) => {
      state.currentExam = action.payload;
      state.currentQuestionIndex = 0;
      state.studentAnswers = {};
    },
    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    saveAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.studentAnswers[questionId] = answer;
    },
    startTimer: (state, action) => {
      state.examTimer = action.payload;
    },
    stopTimer: (state) => {
      state.examTimer = null;
    },
    updateExamStatus: (state, action) => {
      const { examId, status } = action.payload;
      const exam = state.exams.find(e => e.id === examId);
      if (exam) {
        exam.status = status;
      }
    },
    clearCurrentExam: (state) => {
      state.currentExam = null;
      state.currentQuestionIndex = 0;
      state.studentAnswers = {};
      state.examTimer = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExams.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.exams.push(action.payload);
      })
      .addCase(addQuestions.fulfilled, (state, action) => {
        state.questions.push(...action.payload);
      })
      .addCase(startExam.fulfilled, (state, action) => {
        const { examId, studentId, studentName, startTime, endTime } = action.payload;
        state.currentExam = { examId, studentId, studentName, startTime, endTime };
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        state.results.push(action.payload);
        state.currentExam = null;
        state.studentAnswers = {};
        state.examTimer = null;
      });
  }
});

export const {
  setCurrentExam,
  setCurrentQuestionIndex,
  saveAnswer,
  startTimer,
  stopTimer,
  updateExamStatus,
  clearCurrentExam
} = examinationSlice.actions;

// Selectors
export const selectAllExams = (state) => state.examination.exams;
export const selectAllQuestions = (state) => state.examination.questions;
export const selectAllResults = (state) => state.examination.results;
export const selectExaminationLoading = (state) => state.examination.loading;
export const selectExaminationError = (state) => state.examination.error;
export const selectCurrentExam = (state) => state.examination.currentExam;
export const selectCurrentQuestionIndex = (state) => state.examination.currentQuestionIndex;
export const selectStudentAnswers = (state) => state.examination.studentAnswers;
export const selectExamTimer = (state) => state.examination.examTimer;

export const selectExamQuestions = (state, examId) => {
  return state.examination.questions.filter(q => q.examId === examId);
};

export const selectExamResults = (state, examId) => {
  return state.examination.results.filter(r => r.examId === examId);
};

export const selectStudentResults = (state, studentId) => {
  return state.examination.results.filter(r => r.studentId === studentId);
};

export const selectActiveExams = (state) => {
  return state.examination.exams.filter(exam => exam.status === 'active');
};

export const selectScheduledExams = (state) => {
  return state.examination.exams.filter(exam => exam.status === 'scheduled');
};

export const selectCompletedExams = (state) => {
  return state.examination.exams.filter(exam => exam.status === 'completed');
};

export const selectExamStats = (state, examId) => {
  const results = state.examination.results.filter(r => r.examId === examId);
  if (results.length === 0) return null;

  const totalStudents = results.length;
  const averageScore = results.reduce((sum, r) => sum + r.percentage, 0) / totalStudents;
  const highestScore = Math.max(...results.map(r => r.percentage));
  const lowestScore = Math.min(...results.map(r => r.percentage));

  return {
    totalStudents,
    averageScore: Math.round(averageScore),
    highestScore,
    lowestScore
  };
};

export default examinationSlice.reducer;

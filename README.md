# Student Management System

A comprehensive React-based Student Management System with role-based access control, built using modern web technologies.

## Features

### 🔐 Authentication
- **Multi-role Login**: Admin, Teacher, and Student roles
- **Secure Authentication**: JWT-based authentication with localStorage
- **Role-based Redirection**: Automatic redirection to appropriate dashboards

### 📊 Role-Based Dashboards

#### Admin Dashboard
- Manage students (add, edit, delete, view)
- Manage teachers (assign subjects, view profiles)
- Manage classes & sections
- Track overall attendance & grades
- System-wide statistics

#### Teacher Dashboard
- View assigned classes & students
- Mark attendance
- Add grades & feedback
- Upload assignments & study material
- Class-specific statistics

#### Student Dashboard
- View personal profile, subjects, and teachers
- Check attendance records
- View grades & report cards
- Download assignments / study materials
- Personal academic statistics

### 🛠 Core Modules

#### Student Management
- Complete CRUD operations for student records
- Search and filter functionality
- Bulk operations support
- Student profile management

#### Attendance Management
- Daily attendance marking
- Table and calendar view
- Attendance reports and analytics
- Bulk attendance marking

#### Grade Management
- Enter and view grades
- Grade charts and analytics
- Report card generation
- Grade history tracking

#### Assignment Management
- Upload/download assignments
- Assignment tracking
- Due date management
- File management

#### Class Management
- Class and section management
- Teacher assignments
- Student enrollment
- Class schedules

#### Library Management
- Book catalog management
- Borrowing and return tracking
- Fine calculation for late returns
- Search and filter functionality
- Availability status tracking

#### Examination Module
- Online exam/quiz creation
- Multiple choice and essay questions
- Automatic grading for objective questions
- Result generation and analytics
- Downloadable report cards
- Exam scheduling and status management

#### Timetable & Scheduling
- Weekly timetable creation for classes
- Teacher schedule management
- Conflict detection and prevention
- Schedule change notifications
- Room allocation tracking

### 🎨 UI/UX Features

#### Bootstrap Components
- Responsive design with Bootstrap 5
- Modern UI components (Navbar, Sidebar, Tables, Forms, Modals, Cards)
- Mobile-friendly interface
- Consistent design language

#### Advanced Features
- **Dark/Light Mode Toggle**: User preference with localStorage persistence
- **Search & Filter**: Advanced table filtering and search capabilities
- **Notifications**: Bootstrap Toast notifications
- **Export Functionality**: PDF and Excel export capabilities
- **Responsive Design**: Works on all device sizes

#### Reusable Components
- **FormInput**: Standardized form inputs with validation
- **DataTable**: Advanced table with sorting, pagination, and search
- **ModalDialog**: Reusable modal dialogs
- **CardBox**: Information display cards

## Technology Stack

- **Frontend**: React 19.1.1
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **UI Framework**: Bootstrap 5.3.7 + React Bootstrap
- **Icons**: React Icons
- **Charts**: Chart.js + React Chart.js 2
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials

The system comes with pre-configured demo accounts:

#### Admin Account
- **Email**: admin@school.com
- **Password**: admin123

#### Teacher Account
- **Email**: teacher@school.com
- **Password**: teacher123

#### Student Account
- **Email**: student@school.com
- **Password**: student123

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable components
│   │   ├── FormInput.jsx
│   │   ├── DataTable.jsx
│   │   ├── ModalDialog.jsx
│   │   └── CardBox.jsx
│   └── layout/           # Layout components
│       ├── Navbar.jsx
│       └── Sidebar.jsx
├── pages/
│   ├── auth/            # Authentication pages
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── dashboard/       # Dashboard pages
│   │   └── Dashboard.jsx
│   ├── students/        # Student management
│   │   ├── Students.jsx
│   │   └── StudentForm.jsx
│   ├── library/         # Library management
│   │   ├── Library.jsx
│   │   ├── BookForm.jsx
│   │   ├── BorrowingForm.jsx
│   │   └── ReturnForm.jsx
│   ├── examination/     # Examination management
│   │   ├── Examination.jsx
│   │   ├── ExamForm.jsx
│   │   ├── QuestionForm.jsx
│   │   └── ExamResults.jsx
│   └── timetable/       # Timetable management
│       ├── Timetable.jsx
│       ├── TimetableForm.jsx
│       └── ScheduleChangeForm.jsx
├── store/               # Redux store
│   ├── index.js
│   └── slices/
│       ├── authSlice.js
│       ├── studentsSlice.js
│       ├── teachersSlice.js
│       ├── classesSlice.js
│       ├── attendanceSlice.js
│       ├── gradesSlice.js
│       ├── assignmentsSlice.js
│       ├── librarySlice.js
│       ├── examinationSlice.js
│       ├── timetableSlice.js
│       └── uiSlice.js
├── App.jsx              # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Development

- [ ] Real-time notifications
- [ ] Advanced reporting
- [ ] Email integration
- [ ] File upload system
- [ ] Advanced analytics
- [ ] Mobile app version

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Note**: This is a frontend-only implementation with mock data. For production use, integrate with a backend API and database system.

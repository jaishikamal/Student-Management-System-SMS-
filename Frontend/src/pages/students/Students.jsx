import React, { useState, useEffect } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { fetchStudents, deleteStudent } from '../../store/slices/studentsSlice';
import DataTable from '../../components/common/DataTable';
import ModalDialog from '../../components/common/ModalDialog';
import StudentForm from './StudentForm';

const Students = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

  const dispatch = useDispatch();
  const { students, loading } = useSelector(state => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setModalMode('add');
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleDeleteStudent = (student) => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      dispatch(deleteStudent(student.id));
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setModalMode('view');
    setShowModal(true);
  };

  const columns = [
    {
      key: 'avatar',
      label: 'Photo',
      type: 'avatar',
      sortable: false
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true
    },
    {
      key: 'rollNumber',
      label: 'Roll Number',
      sortable: true
    },
    {
      key: 'class',
      label: 'Class',
      sortable: true
    },
    {
      key: 'section',
      label: 'Section',
      sortable: true
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true
    },
    {
      key: 'phone',
      label: 'Phone',
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      type: 'badge',
      sortable: true
    }
  ];

  const actions = (student) => (
    <div className="d-flex gap-1">
      <Button
        variant="outline-info"
        size="sm"
        onClick={() => handleViewStudent(student)}
        title="View"
      >
        <FaEye />
      </Button>
      <Button
        variant="outline-warning"
        size="sm"
        onClick={() => handleEditStudent(student)}
        title="Edit"
      >
        <FaEdit />
      </Button>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => handleDeleteStudent(student)}
        title="Delete"
      >
        <FaTrash />
      </Button>
    </div>
  );

  return (
    <div className="students-bg">
      <div className="section-container main-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-0">Students Management</h1>
            <p className="text-muted">Manage student records and information</p>
          </div>
          <Button variant="primary" onClick={handleAddStudent}>
            <FaPlus className="me-2" />
            Add Student
          </Button>
        </div>

        <DataTable
          data={students}
          columns={columns}
          actions={actions}
          loading={loading}
          searchable={true}
          pagination={true}
          itemsPerPage={10}
        />

        <ModalDialog
          show={showModal}
          onHide={() => setShowModal(false)}
          title={
            modalMode === 'add' ? 'Add New Student' :
              modalMode === 'edit' ? 'Edit Student' :
                'Student Details'
          }
          size="lg"
          confirmText={modalMode === 'view' ? null : (modalMode === 'add' ? 'Add Student' : 'Update Student')}
          onConfirm={() => {
            // Handle form submission
            setShowModal(false);
          }}
        >
          <StudentForm
            student={selectedStudent}
            mode={modalMode}
            onSuccess={() => setShowModal(false)}
          />
        </ModalDialog>
      </div>
    </div>
  );
};

export default Students;

import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGrades } from '../../store/slices/gradesSlice';
import DataTable from '../../components/common/DataTable';

const MyGrades = () => {
  const dispatch = useDispatch();
  const { grades, loading } = useSelector(state => state.grades);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchGrades());
  }, [dispatch]);

  const myGrades = useMemo(() => {
    const studentId = user?.id || 3; // default mock student id
    return grades.filter(g => g.studentId === studentId);
  }, [grades, user]);

  const columns = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'subject', label: 'Subject', sortable: true },
    { key: 'grade', label: 'Grade', sortable: true },
    { key: 'score', label: 'Score', sortable: true },
    { key: 'maxScore', label: 'Max', sortable: true },
    { key: 'semester', label: 'Semester', sortable: true },
    { key: 'teacher', label: 'Teacher', sortable: true }
  ];

  return (
    <div className="students-bg">
      <div className="section-container main-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-0">My Grades</h1>
            <p className="text-muted">Scores across subjects</p>
          </div>
        </div>

        <DataTable
          data={myGrades}
          columns={columns}
          loading={loading}
          searchable={true}
          pagination={true}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
};

export default MyGrades;



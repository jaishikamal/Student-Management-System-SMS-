import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssignments } from '../../store/slices/assignmentsSlice';
import DataTable from '../../components/common/DataTable';

const MyAssignments = () => {
  const dispatch = useDispatch();
  const { assignments, loading } = useSelector(state => state.assignments);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch]);

  const myAssignments = useMemo(() => {
    const studentClass = user?.department || 'Class 10A';
    return assignments.filter(a => a.class === studentClass);
  }, [assignments, user]);

  const columns = [
    { key: 'uploadDate', label: 'Posted', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'subject', label: 'Subject', sortable: true },
    { key: 'teacher', label: 'Teacher', sortable: true },
    { key: 'dueDate', label: 'Due', sortable: true }
  ];

  return (
    <div className="students-bg">
      <div className="section-container main-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-0">My Assignments</h1>
            <p className="text-muted">Assignments for your class</p>
          </div>
        </div>

        <DataTable
          data={myAssignments}
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

export default MyAssignments;



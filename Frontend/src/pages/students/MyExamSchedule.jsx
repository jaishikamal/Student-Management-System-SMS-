import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExams, selectScheduledExams } from '../../store/slices/examinationSlice';
import DataTable from '../../components/common/DataTable';

const MyExamSchedule = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.examination);
  const { user } = useSelector(state => state.auth);
  const scheduledExams = useSelector(selectScheduledExams);

  useEffect(() => {
    dispatch(fetchExams());
  }, [dispatch]);

  const myExams = useMemo(() => {
    const studentClass = user?.department || 'Class 10A';
    return scheduledExams.filter(e => e.class === studentClass);
  }, [scheduledExams, user]);

  const columns = [
    { key: 'startDate', label: 'Start', sortable: true },
    { key: 'endDate', label: 'End', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'subject', label: 'Subject', sortable: true },
    { key: 'duration', label: 'Duration (min)', sortable: true },
    { key: 'totalMarks', label: 'Marks', sortable: true }
  ];

  return (
    <div className="students-bg">
      <div className="section-container main-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-0">My Exam Schedule</h1>
            <p className="text-muted">Upcoming exams for your class</p>
          </div>
        </div>

        <DataTable
          data={myExams}
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

export default MyExamSchedule;



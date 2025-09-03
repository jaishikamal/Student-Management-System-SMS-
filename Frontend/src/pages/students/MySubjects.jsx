import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import DataTable from '../../components/common/DataTable';

const MySubjects = () => {
  const { user } = useSelector(state => state.auth);

  const subjects = useMemo(() => {
    // Mock subjects for demo; in a real app fetch from API by student id/class
    return [
      { id: 1, code: 'ENG101', name: 'English Language', teacher: 'Ms. Adams', credits: 3, schedule: 'Mon 10:00-11:30', room: 'A1' },
      { id: 2, code: 'MAT201', name: 'Mathematics', teacher: 'Mr. Brown', credits: 4, schedule: 'Tue 09:00-10:30', room: 'B2' },
      { id: 3, code: 'SCI150', name: 'General Science', teacher: 'Dr. Clark', credits: 3, schedule: 'Wed 11:00-12:30', room: 'C3' },
      { id: 4, code: 'HIS120', name: 'World History', teacher: 'Mrs. Davis', credits: 2, schedule: 'Thu 13:00-14:00', room: 'D4' },
      { id: 5, code: 'CSC110', name: 'Computing Basics', teacher: 'Mr. Evans', credits: 3, schedule: 'Fri 10:00-11:30', room: 'Lab-1' }
    ];
  }, []);

  const columns = [
    { key: 'code', label: 'Code', sortable: true },
    { key: 'name', label: 'Subject', sortable: true },
    { key: 'teacher', label: 'Teacher', sortable: true },
    { key: 'credits', label: 'Credits', sortable: true },
    { key: 'schedule', label: 'Schedule', sortable: false },
    { key: 'room', label: 'Room', sortable: true }
  ];

  return (
    <div className="students-bg">
      <div className="section-container main-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-0">My Subjects</h1>
            <p className="text-muted">{user?.name ? `${user.name}'s enrolled subjects` : 'Your enrolled subjects'}</p>
          </div>
        </div>

        <DataTable
          data={subjects}
          columns={columns}
          loading={false}
          searchable={true}
          pagination={true}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
};

export default MySubjects;



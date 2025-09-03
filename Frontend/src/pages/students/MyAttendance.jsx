import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendance } from '../../store/slices/attendanceSlice';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const MyAttendance = () => {
  const dispatch = useDispatch();
  const { attendance, loading } = useSelector(state => state.attendance);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);

  const studentAttendance = useMemo(() => {
    if (!user) return [];
    const studentId = user.id || 3; // default mock student id
    return attendance
      .map(a => {
        const record = a.students.find(s => s.studentId === studentId);
        return record ? { date: a.date, status: record.status } : null;
      })
      .filter(Boolean)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [attendance, user]);

  const { presentCount, absentCount, labels, presenceSeries } = useMemo(() => {
    const present = studentAttendance.filter(r => r.status === 'present').length;
    const absent = studentAttendance.filter(r => r.status === 'absent').length;
    const lbls = studentAttendance.map(r => r.date);
    const series = studentAttendance.map(r => (r.status === 'present' ? 1 : 0));
    return { presentCount: present, absentCount: absent, labels: lbls, presenceSeries: series };
  }, [studentAttendance]);

  const doughnutData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [presentCount, absentCount],
        backgroundColor: ['#28a745', '#dc3545']
      }
    ]
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Presence (1=Present, 0=Absent)',
        data: presenceSeries,
        borderColor: '#0d6efd',
        backgroundColor: 'rgba(13, 110, 253, 0.2)',
        tension: 0.3
      }
    ]
  };

  return (
    <div className="students-bg">
      <div className="section-container main-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-0">My Attendance</h1>
            <p className="text-muted">Summary and trend</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">Loading attendance...</div>
        ) : (
          <div className="row g-4">
            <div className="col-12 col-lg-4">
              <div className="card p-3 h-100">
                <h6 className="text-muted">Overall</h6>
                <div className="d-flex justify-content-center" style={{ height: 260 }}>
                  <Doughnut data={doughnutData} />
                </div>
                <div className="mt-3 d-flex justify-content-around">
                  <div className="text-success">Present: {presentCount}</div>
                  <div className="text-danger">Absent: {absentCount}</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="card p-3 h-100">
                <h6 className="text-muted">Presence over time</h6>
                <div style={{ height: 300 }}>
                  <Line data={lineData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: { min: 0, max: 1, ticks: { stepSize: 1 } }
                    }
                  }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAttendance;



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Card, Button, Badge,
  Form, InputGroup, Dropdown, Alert, Spinner, Table
} from 'react-bootstrap';
import {
  FaCalendar, FaSearch, FaPlus, FaFilter,
  FaClock, FaUser, FaMapMarkerAlt, FaExclamationTriangle
} from 'react-icons/fa';
import {
  fetchTimetables,
  selectAllTimetables,
  selectAllTeacherSchedules,
  selectAllScheduleChanges,
  selectClasses,
  selectTeachers,
  selectSubjects,
  selectRooms,
  selectTimetableLoading,
  setSelectedClass,
  setSelectedTeacher,
  clearConflicts
} from '../../store/slices/timetableSlice';
import TimetableForm from './TimetableForm';
import ScheduleChangeForm from './ScheduleChangeForm';

const Timetable = () => {
  const dispatch = useDispatch();
  const timetables = useSelector(selectAllTimetables);
  const teacherSchedules = useSelector(selectAllTeacherSchedules);
  const scheduleChanges = useSelector(selectAllScheduleChanges);
  const classes = useSelector(selectClasses);
  const teachers = useSelector(selectTeachers);
  const subjects = useSelector(selectSubjects);
  const rooms = useSelector(selectRooms);
  const loading = useSelector(selectTimetableLoading);
  const selectedClass = useSelector(selectSelectedClass);
  const selectedTeacher = useSelector(selectSelectedTeacher);

  const [showTimetableForm, setShowTimetableForm] = useState(false);
  const [showScheduleChangeForm, setShowScheduleChangeForm] = useState(false);
  const [viewMode, setViewMode] = useState('class'); // class, teacher
  const [selectedTimetable, setSelectedTimetable] = useState(null);

  useEffect(() => {
    dispatch(fetchTimetables());
  }, [dispatch]);

  const handleClassSelect = (className) => {
    dispatch(setSelectedClass(className));
    const timetable = timetables.find(t => t.class === className);
    setSelectedTimetable(timetable);
  };

  const handleTeacherSelect = (teacherName) => {
    dispatch(setSelectedTeacher(teacherName));
  };

  const getTimeSlotColor = (subject) => {
    const colors = {
      'Mathematics': 'primary',
      'Physics': 'success',
      'Chemistry': 'info',
      'English': 'warning',
      'History': 'secondary',
      'Computer Science': 'dark',
      'Break': 'light',
      'Lunch': 'light'
    };
    return colors[subject] || 'primary';
  };

  const renderTimetable = (timetable) => {
    if (!timetable) return null;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['08:00-09:00', '09:00-10:00', '10:00-10:15', '10:15-11:15',
      '11:15-12:15', '12:15-13:15', '13:15-14:15', '14:15-15:15'];

    return (
      <div className="table-responsive">
        <Table bordered className="timetable-table">
          <thead>
            <tr>
              <th style={{ width: '120px' }}>Time</th>
              {days.map(day => (
                <th key={day} className="text-center">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(timeSlot => (
              <tr key={timeSlot}>
                <td className="text-center fw-bold" style={{ fontSize: '0.9rem' }}>
                  {timeSlot}
                </td>
                {days.map(day => {
                  const daySchedule = timetable.schedule.find(d => d.day === day);
                  const period = daySchedule?.periods.find(p => p.time === timeSlot);

                  if (!period) return <td key={`${day}-${timeSlot}`}></td>;

                  return (
                    <td
                      key={`${day}-${timeSlot}`}
                      className={`text-center p-2 bg-${getTimeSlotColor(period.subject)}-subtle`}
                      style={{
                        minHeight: '60px',
                        verticalAlign: 'middle',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div className="fw-bold">{period.subject}</div>
                      <div className="text-muted small">{period.teacher}</div>
                      <div className="text-muted small">{period.room}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  const renderTeacherSchedule = (teacherName) => {
    const teacherSchedule = teacherSchedules.find(ts => ts.teacherName === teacherName);
    if (!teacherSchedule) return null;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['08:00-09:00', '09:00-10:00', '10:15-11:15', '11:15-12:15',
      '13:15-14:15', '14:15-15:15'];

    return (
      <div className="table-responsive">
        <Table bordered className="timetable-table">
          <thead>
            <tr>
              <th style={{ width: '120px' }}>Time</th>
              {days.map(day => (
                <th key={day} className="text-center">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(timeSlot => (
              <tr key={timeSlot}>
                <td className="text-center fw-bold" style={{ fontSize: '0.9rem' }}>
                  {timeSlot}
                </td>
                {days.map(day => {
                  const schedule = teacherSchedule.schedule.find(s =>
                    s.day === day && s.time === timeSlot
                  );

                  if (!schedule) return <td key={`${day}-${timeSlot}`}></td>;

                  return (
                    <td
                      key={`${day}-${timeSlot}`}
                      className="text-center p-2 bg-primary-subtle"
                      style={{
                        minHeight: '60px',
                        verticalAlign: 'middle',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div className="fw-bold">{schedule.class}</div>
                      <div className="text-muted small">{schedule.room}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <div className="timetable-bg">
      <div className="section-container">
        <Container fluid>
          <Row className="mb-4">
            <Col>
              <h2 className="d-flex align-items-center">
                <FaCalendar className="me-2" />
                Timetable Management
              </h2>
            </Col>
            <Col xs="auto">
              <Button
                variant="primary"
                onClick={() => setShowTimetableForm(true)}
                className="d-flex align-items-center me-2"
              >
                <FaPlus className="me-1" />
                Create Timetable
              </Button>
              <Button
                variant="outline-warning"
                onClick={() => setShowScheduleChangeForm(true)}
                className="d-flex align-items-center"
              >
                <FaExclamationTriangle className="me-1" />
                Schedule Change
              </Button>
            </Col>
          </Row>

          {/* Statistics Cards */}
          <Row className="mb-4">
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h3 className="text-primary">{timetables.length}</h3>
                  <p className="text-muted mb-0">Class Timetables</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h3 className="text-success">{teacherSchedules.length}</h3>
                  <p className="text-muted mb-0">Teacher Schedules</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h3 className="text-info">{subjects.length}</h3>
                  <p className="text-muted mb-0">Subjects</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h3 className="text-warning">{scheduleChanges.length}</h3>
                  <p className="text-muted mb-0">Schedule Changes</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* View Controls */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group>
                <Form.Label>View Mode</Form.Label>
                <div>
                  <Button
                    variant={viewMode === 'class' ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => setViewMode('class')}
                    className="me-2"
                  >
                    Class View
                  </Button>
                  <Button
                    variant={viewMode === 'teacher' ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => setViewMode('teacher')}
                  >
                    Teacher View
                  </Button>
                </div>
              </Form.Group>
            </Col>
            <Col md={4}>
              {viewMode === 'class' ? (
                <Form.Group>
                  <Form.Label>Select Class</Form.Label>
                  <Form.Select
                    value={selectedClass || ''}
                    onChange={(e) => handleClassSelect(e.target.value)}
                  >
                    <option value="">Choose a class...</option>
                    {classes.map(className => (
                      <option key={className} value={className}>
                        {className}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              ) : (
                <Form.Group>
                  <Form.Label>Select Teacher</Form.Label>
                  <Form.Select
                    value={selectedTeacher || ''}
                    onChange={(e) => handleTeacherSelect(e.target.value)}
                  >
                    <option value="">Choose a teacher...</option>
                    {teachers.map(teacherName => (
                      <option key={teacherName} value={teacherName}>
                        {teacherName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Quick Stats</Form.Label>
                <div className="small text-muted">
                  <div>Total Classes: {classes.length}</div>
                  <div>Total Teachers: {teachers.length}</div>
                  <div>Total Rooms: {rooms.length}</div>
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Timetable Display */}
          {viewMode === 'class' && selectedTimetable && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">
                  {selectedTimetable.class} - {selectedTimetable.academicYear} ({selectedTimetable.semester})
                </h5>
              </Card.Header>
              <Card.Body>
                {renderTimetable(selectedTimetable)}
              </Card.Body>
            </Card>
          )}

          {viewMode === 'teacher' && selectedTeacher && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Teacher Schedule: {selectedTeacher}</h5>
              </Card.Header>
              <Card.Body>
                {renderTeacherSchedule(selectedTeacher)}
              </Card.Body>
            </Card>
          )}

          {/* Schedule Changes */}
          <Card className="mt-4">
            <Card.Header>
              <h5 className="mb-0">Recent Schedule Changes</h5>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Change Type</th>
                      <th>Day</th>
                      <th>Old Schedule</th>
                      <th>New Schedule</th>
                      <th>Reason</th>
                      <th>Effective Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleChanges.slice(0, 10).map(change => (
                      <tr key={change.id}>
                        <td>{change.class}</td>
                        <td>
                          <Badge bg="warning">{change.changeType.replace('_', ' ')}</Badge>
                        </td>
                        <td>{change.day}</td>
                        <td>
                          <small>
                            {change.oldPeriod.subject} - {change.oldPeriod.teacher} - {change.oldPeriod.room}
                          </small>
                        </td>
                        <td>
                          <small>
                            {change.newPeriod.subject} - {change.newPeriod.teacher} - {change.newPeriod.room}
                          </small>
                        </td>
                        <td>{change.reason}</td>
                        <td>{new Date(change.effectiveDate).toLocaleDateString()}</td>
                        <td>
                          {change.notificationSent ? (
                            <Badge bg="success">Notified</Badge>
                          ) : (
                            <Badge bg="warning">Pending</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>

          {/* Modals */}
          <TimetableForm
            show={showTimetableForm}
            onHide={() => setShowTimetableForm(false)}
          />

          <ScheduleChangeForm
            show={showScheduleChangeForm}
            onHide={() => setShowScheduleChangeForm(false)}
            timetables={timetables}
            onSuccess={() => {
              setShowScheduleChangeForm(false);
            }}
          />
                 </Container>
       </div>
     </div>
   );
};

export default Timetable;

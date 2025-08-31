import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Card, Button, Badge,
  Form, InputGroup, Dropdown, Alert, Spinner
} from 'react-bootstrap';
import {
  FaFileAlt, FaSearch, FaPlus, FaFilter,
  FaClock, FaCheckCircle, FaTimesCircle, FaEye
} from 'react-icons/fa';
import {
  fetchExams,
  selectAllExams,
  selectAllResults,
  selectActiveExams,
  selectScheduledExams,
  selectCompletedExams,
  selectExaminationLoading,
  updateExamStatus
} from '../../store/slices/examinationSlice';
import ExamForm from './ExamForm';
import QuestionForm from './QuestionForm';
import ExamResults from './ExamResults';

const Examination = () => {
  const dispatch = useDispatch();
  const exams = useSelector(selectAllExams);
  const results = useSelector(selectAllResults);
  const activeExams = useSelector(selectActiveExams);
  const scheduledExams = useSelector(selectScheduledExams);
  const completedExams = useSelector(selectCompletedExams);
  const loading = useSelector(selectExaminationLoading);

  const [showExamForm, setShowExamForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    dispatch(fetchExams());
  }, [dispatch]);

  const handleStatusChange = (examId, newStatus) => {
    dispatch(updateExamStatus({ examId, status: newStatus }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'scheduled':
        return <Badge bg="info">Scheduled</Badge>;
      case 'active':
        return <Badge bg="success">Active</Badge>;
      case 'completed':
        return <Badge bg="secondary">Completed</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const getFilteredExams = () => {
    switch (filterStatus) {
      case 'active':
        return activeExams;
      case 'scheduled':
        return scheduledExams;
      case 'completed':
        return completedExams;
      default:
        return exams;
    }
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
    <div className="examination-bg">
      <div className="section-container">
        <Container fluid>
          <Row className="mb-4">
            <Col>
              <h2 className="d-flex align-items-center">
                <FaFileAlt className="me-2" />
                Examination Management
              </h2>
            </Col>
            <Col xs="auto">
              <Button
                variant="primary"
                onClick={() => setShowExamForm(true)}
                className="d-flex align-items-center"
              >
                <FaPlus className="me-1" />
                Create Exam
              </Button>
            </Col>
          </Row>

          {/* Statistics Cards */}
          <Row className="mb-4">
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h3 className="text-primary">{exams.length}</h3>
                  <p className="text-muted mb-0">Total Exams</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h3 className="text-success">{activeExams.length}</h3>
                  <p className="text-muted mb-0">Active Exams</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h3 className="text-info">{scheduledExams.length}</h3>
                  <p className="text-muted mb-0">Scheduled Exams</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h3 className="text-secondary">{results.length}</h3>
                  <p className="text-muted mb-0">Total Results</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Filter */}
          <Row className="mb-4">
            <Col md={6}>
              <Dropdown onSelect={setFilterStatus}>
                <Dropdown.Toggle variant="outline-secondary">
                  <FaFilter className="me-1" />
                  Filter by Status
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="all">All Exams</Dropdown.Item>
                  <Dropdown.Item eventKey="scheduled">Scheduled</Dropdown.Item>
                  <Dropdown.Item eventKey="active">Active</Dropdown.Item>
                  <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={6} className="text-end">
              <Button
                variant="outline-primary"
                onClick={() => setShowQuestionForm(true)}
              >
                Add Questions
              </Button>
            </Col>
          </Row>

          {/* Exams Table */}
          <Card>
            <Card.Header>
              <h5 className="mb-0">Exams ({getFilteredExams().length})</h5>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Subject</th>
                      <th>Class</th>
                      <th>Duration</th>
                      <th>Start Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredExams().map(exam => (
                      <tr key={exam.id}>
                        <td>
                          <strong>{exam.title}</strong>
                          <br />
                          <small className="text-muted">{exam.instructions}</small>
                        </td>
                        <td>{exam.subject}</td>
                        <td>{exam.class}</td>
                        <td>{exam.duration} min</td>
                        <td>{new Date(exam.startDate).toLocaleString()}</td>
                        <td>{getStatusBadge(exam.status)}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => {
                                setSelectedExam(exam);
                                setShowQuestionForm(true);
                              }}
                              className="me-1"
                            >
                              Questions
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-info"
                              onClick={() => {
                                setSelectedExam(exam);
                                setShowResults(true);
                              }}
                              className="me-1"
                            >
                              Results
                            </Button>
                            {exam.status === 'scheduled' && (
                              <Button
                                size="sm"
                                variant="outline-success"
                                onClick={() => handleStatusChange(exam.id, 'active')}
                                className="me-1"
                              >
                                Activate
                              </Button>
                            )}
                            {exam.status === 'active' && (
                              <Button
                                size="sm"
                                variant="outline-secondary"
                                onClick={() => handleStatusChange(exam.id, 'completed')}
                              >
                                Complete
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>

          {/* Recent Results */}
          <Card className="mt-4">
            <Card.Header>
              <h5 className="mb-0">Recent Results</h5>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Exam</th>
                      <th>Score</th>
                      <th>Grade</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.slice(0, 10).map(result => {
                      const exam = exams.find(e => e.id === result.examId);
                      return (
                        <tr key={result.id}>
                          <td>{result.studentName}</td>
                          <td>{exam?.title || 'Unknown Exam'}</td>
                          <td>
                            <strong>{result.obtainedMarks}/{result.totalMarks}</strong>
                            <br />
                            <small className="text-muted">({result.percentage}%)</small>
                          </td>
                          <td>
                            <Badge bg={result.grade === 'A' ? 'success' :
                              result.grade === 'B' ? 'info' :
                                result.grade === 'C' ? 'warning' : 'danger'}>
                              {result.grade}
                            </Badge>
                          </td>
                          <td>{new Date(result.startTime).toLocaleDateString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>

          {/* Modals */}
          <ExamForm
            show={showExamForm}
            onHide={() => setShowExamForm(false)}
          />

          <QuestionForm
            show={showQuestionForm}
            onHide={() => setShowQuestionForm(false)}
            selectedExam={selectedExam}
            onSuccess={() => {
              setShowQuestionForm(false);
              setSelectedExam(null);
            }}
          />

          <ExamResults
            show={showResults}
            onHide={() => setShowResults(false)}
            exam={selectedExam}
          />
        </Container>
      </div>
    </div>
  );
};

export default Examination;

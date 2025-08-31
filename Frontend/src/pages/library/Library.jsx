import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Card, Button, Badge,
  Form, InputGroup, Dropdown, Alert, Spinner
} from 'react-bootstrap';
import {
  FaBook, FaSearch, FaPlus, FaFilter,
  FaClock, FaDollarSign, FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';
import {
  fetchBooks,
  selectAllBooks,
  selectAllBorrowings,
  selectFilteredBooks,
  selectBookCategories,
  selectOverdueBooks,
  selectTotalFines,
  selectLibraryLoading,
  setSearchTerm,
  setFilterCategory,
  calculateOverdueFines
} from '../../store/slices/librarySlice';
import BookForm from './BookForm';
import BorrowingForm from './BorrowingForm';
import ReturnForm from './ReturnForm';

const Library = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectFilteredBooks);
  const borrowings = useSelector(selectAllBorrowings);
  const categories = useSelector(selectBookCategories);
  const overdueBooks = useSelector(selectOverdueBooks);
  const totalFines = useSelector(selectTotalFines);
  const loading = useSelector(selectLibraryLoading);

  const [showBookForm, setShowBookForm] = useState(false);
  const [showBorrowingForm, setShowBorrowingForm] = useState(false);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBorrowing, setSelectedBorrowing] = useState(null);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(calculateOverdueFines());
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategoryFilter = (category) => {
    dispatch(setFilterCategory(category));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'borrowed':
        return <Badge bg="warning">Borrowed</Badge>;
      case 'returned':
        return <Badge bg="success">Returned</Badge>;
      case 'overdue':
        return <Badge bg="danger">Overdue</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const getAvailabilityBadge = (book) => {
    if (book.availableCopies > 0) {
      return <Badge bg="success">{book.availableCopies} Available</Badge>;
    } else {
      return <Badge bg="danger">Out of Stock</Badge>;
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
    <div className="library-bg">
      <div className="section-container">
        <Container fluid>
          <Row className="mb-4">
            <Col>
              <h2 className="d-flex align-items-center">
                <FaBook className="me-2" />
                Library Management
              </h2>
            </Col>
            <Col xs="auto">
              <Button
                variant="primary"
                onClick={() => setShowBookForm(true)}
                className="d-flex align-items-center"
              >
                <FaPlus className="me-1" />
                Add Book
              </Button>
            </Col>
          </Row>

          {/* Statistics Cards */}
          <Row className="mb-4">
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h3 className="text-primary">{books.length}</h3>
                  <p className="text-muted mb-0">Total Books</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h3 className="text-warning">{borrowings.filter(b => b.status === 'borrowed').length}</h3>
                  <p className="text-muted mb-0">Currently Borrowed</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h3 className="text-danger">{overdueBooks.length}</h3>
                  <p className="text-muted mb-0">Overdue Books</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h3 className="text-success">${totalFines.toFixed(2)}</h3>
                  <p className="text-muted mb-0">Total Fines</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Search and Filter */}
          <Row className="mb-4">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search books by title, author, or ISBN..."
                  onChange={handleSearch}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Dropdown onSelect={handleCategoryFilter}>
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  <FaFilter className="me-1" />
                  Filter by Category
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="all">All Categories</Dropdown.Item>
                  {categories.map(category => (
                    <Dropdown.Item key={category} eventKey={category}>
                      {category}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={3}>
              <Button
                variant="outline-primary"
                onClick={() => setShowBorrowingForm(true)}
                className="w-100"
              >
                Borrow Book
              </Button>
            </Col>
          </Row>

          {/* Books Table */}
          <Card>
            <Card.Header>
              <h5 className="mb-0">Book Catalog</h5>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>ISBN</th>
                      <th>Category</th>
                      <th>Location</th>
                      <th>Availability</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map(book => (
                      <tr key={book.id}>
                        <td>
                          <strong>{book.title}</strong>
                          <br />
                          <small className="text-muted">{book.publishedYear}</small>
                        </td>
                        <td>{book.author}</td>
                        <td>{book.isbn}</td>
                        <td>
                          <Badge bg="info">{book.category}</Badge>
                        </td>
                        <td>{book.location}</td>
                        <td>{getAvailabilityBadge(book)}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => {
                              setSelectedBook(book);
                              setShowBorrowingForm(true);
                            }}
                            disabled={book.availableCopies === 0}
                            className="me-1"
                          >
                            Borrow
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => setSelectedBook(book)}
                          >
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>

          {/* Borrowings Table */}
          <Card className="mt-4">
            <Card.Header>
              <h5 className="mb-0">Borrowing Records</h5>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Book</th>
                      <th>Borrow Date</th>
                      <th>Due Date</th>
                      <th>Return Date</th>
                      <th>Status</th>
                      <th>Fine</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowings.map(borrowing => {
                      const book = books.find(b => b.id === borrowing.bookId);
                      return (
                        <tr key={borrowing.id}>
                          <td>{borrowing.studentName}</td>
                          <td>{book?.title || 'Unknown Book'}</td>
                          <td>{new Date(borrowing.borrowDate).toLocaleDateString()}</td>
                          <td>{new Date(borrowing.dueDate).toLocaleDateString()}</td>
                          <td>
                            {borrowing.returnDate
                              ? new Date(borrowing.returnDate).toLocaleDateString()
                              : '-'
                            }
                          </td>
                          <td>{getStatusBadge(borrowing.status)}</td>
                          <td>
                            {borrowing.fine > 0 ? (
                              <span className="text-danger fw-bold">
                                ${borrowing.fine.toFixed(2)}
                              </span>
                            ) : (
                              <span className="text-success">$0.00</span>
                            )}
                          </td>
                          <td>
                            {borrowing.status !== 'returned' && (
                              <Button
                                size="sm"
                                variant="outline-success"
                                onClick={() => {
                                  setSelectedBorrowing(borrowing);
                                  setShowReturnForm(true);
                                }}
                              >
                                Return
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>

          {/* Modals */}
          <BookForm
            show={showBookForm}
            onHide={() => setShowBookForm(false)}
          />

          <BorrowingForm
            show={showBorrowingForm}
            onHide={() => setShowBorrowingForm(false)}
            selectedBook={selectedBook}
            onSuccess={() => {
              setShowBorrowingForm(false);
              setSelectedBook(null);
            }}
          />

          <ReturnForm
            show={showReturnForm}
            onHide={() => setShowReturnForm(false)}
            borrowing={selectedBorrowing}
            onSuccess={() => {
              setShowReturnForm(false);
              setSelectedBorrowing(null);
            }}
          />
        </Container>
      </div>
    </div>
  );
};

export default Library;

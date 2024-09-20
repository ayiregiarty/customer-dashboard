import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Form, Pagination, Modal } from 'react-bootstrap';
import Header from './header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

function CustomerDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formValues, setFormValues] = useState({
    fullName: '',
    username: '',
    phone: '',
    email: '',
    website: '',
    street: '',
    city: '',
    suite: '',
    zipcode: '',
    companyName: '',
    companySlogan: ''
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewUser = () => {
    setIsEditMode(false);
    setFormValues({
      fullName: '',
      username: '',
      phone: '',
      email: '',
      website: '',
      street: '',
      city: '',
      suite: '',
      zipcode: '',
      companyName: '',
      companySlogan: ''
    });
    setShowModal(true);
  };

  const handleEdit = (customer) => {
    setIsEditMode(true);
    setSelectedCustomer(customer);
    setFormValues({
      fullName: customer.name,
      username: customer.username,
      phone: customer.phone,
      email: customer.email,
      website: customer.website,
      street: customer.address.street,
      city: customer.address.city,
      suite: customer.address.suite,
      zipcode: customer.address.zipcode,
      companyName: customer.company.name,
      companySlogan: customer.company.catchPhrase
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (isEditMode) {
      console.log('Updating customer:', selectedCustomer.id, formValues);
    } else {
      console.log('Adding new customer:', formValues);
    }
    setShowModal(false);
  };

  if (loading) {
    return <p>Loading customers...</p>;
  }

  return (
    <div className='bg-light'>
      <Header />
      <div className="container mt-4">
        <p className='breadCrumb'>Dashboard  /  Customer</p>
        <h3>All Customer ({customers.length})</h3>

        <div className='flexContainer'>
          <Form className="mb-3 searchBar">
            <Form.Control
              type="text"
              placeholder="Search by Name or Company Name..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form>
          <Button className="mb-3 hidden-mobile" variant="primary" onClick={handleAddNewUser}>Add New User</Button>
          <Button className="mb-3" variant="primary" onClick={handleAddNewUser}>
            <FontAwesomeIcon icon={faUserPlus} />
          </Button>
        </div>

        <Table striped bordered hover className="responsive-table customerTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Company Name</th>
              <th className="hidden-mobile">Location - City</th>
              <th className="hidden-mobile">Phone</th>
              <th className="hidden-mobile">Email</th>
              <th className="hidden-mobile">Website</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={customer.id}>
                <td>{index + 1}</td>
                <td>
                  <div className='customerWrapper'>
                    <div className='avatarWrapper'>
                      <img
                        src={`https://avatar.iran.liara.run/public/${customer.id}`}
                        alt={customer.name}
                        className="rounded-circle"
                        style={{ width: '30px', marginRight: '10px' }}
                      />
                    </div>
                    <p>{customer.name}</p>
                  </div>
                </td>
                <td>{customer.company.name}</td>
                <td className="hidden-mobile">{customer.address.city}</td>
                <td className="hidden-mobile">{customer.phone}</td>
                <td className="hidden-mobile">{customer.email}</td>
                <td className="hidden-mobile">{customer.website}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      Action
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleEdit(customer)}>Edit</Dropdown.Item>
                      <Dropdown.Item>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>

      <Modal className='customerForm' show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 childTable" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formValues.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </Form.Group>

            <Form.Group className="mb-3 childTable" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group className="mb-3 childTable" controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </Form.Group>

            <Form.Group className="mb-3 childTable" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </Form.Group>

            <Form.Group className="mb-3 childTable" controlId="website">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={formValues.website}
                onChange={handleChange}
                placeholder="Enter website URL"
              />
            </Form.Group>

            <Form.Group className="mb-3 childTable" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formValues.street}
                onChange={handleChange}
                placeholder="Street"
              />
              <Form.Control
                type="text"
                name="city"
                value={formValues.city}
                onChange={handleChange}
                placeholder="City"
                className="mt-2"
              />
              <Form.Control
                type="text"
                name="suite"
                value={formValues.suite}
                onChange={handleChange}
                placeholder="Suite"
                className="mt-2"
              />
              <Form.Control
                type="text"
                name="zipcode"
                value={formValues.zipcode}
                onChange={handleChange}
                placeholder="Zipcode"
                className="mt-2"
              />
            </Form.Group>

            <Form.Group className="mb-3 childTable" controlId="companyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={formValues.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </Form.Group>

            <Form.Group className="mb-3 childTable" controlId="companySlogan">
              <Form.Label>Company Slogan</Form.Label>
              <Form.Control
                type="text"
                name="companySlogan"
                value={formValues.companySlogan}
                onChange={handleChange}
                placeholder="Enter company slogan"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEditMode ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomerDashboard;
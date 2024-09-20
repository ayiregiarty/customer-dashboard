import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Badge } from 'react-bootstrap';

function Header() {
  return (
    <Navbar expand="lg" className="mb-4">
      <Container fluid className='container'>
        <Navbar.Brand href="#">
          <img
            src={`${process.env.PUBLIC_URL}/OBS_logo_h86.png`} 
            alt="OBS Logo"
            style={{ width: '60px', marginRight: '10px' }}
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav>
            <Nav.Link href="#notifications">
              <i className="fas fa-bell"></i>
              <Badge bg="danger" pill className="ml-1 badge-notif">10</Badge>
            </Nav.Link>
            <NavDropdown title={<i className="fas fa-user-circle fa-lg"></i>} id="navbarScrollingDropdown">
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="ml-2">Superadmin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <style jsx>{`
        .navbar-light {
            box-shadow: 0px 1px 5px #d0d0d9;
        }
        .navbar-nav {
            position: relative;
        }
        .navbar-collapse.show{
            display: none;
        }
        .badge-notif {
            border-radius: 50%;
            height: 20px;
            width: 20px;
            padding: 0;
            position: absolute;
            top: 1px;
            left: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }
      `}</style>
    </Navbar>
  );
}

export default Header;
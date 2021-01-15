import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import coderSchoolLogo from '../images/CoderSchool-Logo.svg';
import githubMark from '../images/GitHub-Mark-64px.png';

const MainNavBar = () => (
  <Navbar bg='light' expand='lg'>
    <Navbar.Brand>
      <img src={coderSchoolLogo} alt='CoderSchool' width='200px' />
    </Navbar.Brand>

    <Navbar.Toggle aria-controls='basic-navbar-nav' />

    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='mr-auto'>
        <Nav.Link href='/'>Home</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link
          href='https://github.com/lethang7794'
          target='_blank'
          rel='noreferrer'
        >
          <img src={githubMark} alt='Github' width='32px' />
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default MainNavBar;

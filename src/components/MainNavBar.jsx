import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import coderSchoolLogo from '../images/CoderSchool-Logo.svg';
import githubMark from '../images/GitHub-Mark-64px.png';
import './MainNavBar.css';

const MainNavBar = () => (
  <Navbar
    bg='light'
    expand='lg'
    style={{
      padding: '0.75rem 1rem',
      borderTop: '8px solid hsl(217, 59%, 38%)',
    }}
  >
    <Navbar.Brand>
      <Nav.Link as={NavLink} exact to='/'>
        <img src={coderSchoolLogo} alt='CoderSchool' width='200px' />
      </Nav.Link>
    </Navbar.Brand>

    <Navbar.Toggle aria-controls='basic-navbar-nav' />

    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='mx-auto'>
        <Nav.Link as={NavLink} exact to='/'>
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} exact to='/now-playing'>
          Now Playing
        </Nav.Link>
        <Nav.Link as={NavLink} exact to='/top-rated'>
          Top Rated
        </Nav.Link>
        <Nav.Link as={NavLink} exact to='/popular'>
          Polular
        </Nav.Link>
        <Nav.Link as={NavLink} exact to='/upcoming'>
          Upcoming
        </Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link as={NavLink} exact to='/search'>
          Search
        </Nav.Link>
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

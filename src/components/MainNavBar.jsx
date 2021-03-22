import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logoHorizontal from '../images/logo-horizontal.png';
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
    collapseOnSelect
  >
    <Navbar.Brand>
      <Nav.Link as={NavLink} exact to='/'>
        <img src={logoHorizontal} alt='CoderSchool' height='60' width='186' />
      </Nav.Link>
    </Navbar.Brand>

    <Navbar.Toggle aria-controls='basic-navbar-nav' />

    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='mx-auto'>
        <Nav.Link as={NavLink} exact to='/' eventKey='1'>
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} exact to='/now-playing' eventKey='2'>
          Now Playing
        </Nav.Link>
        <Nav.Link as={NavLink} exact to='/top-rated' eventKey='3'>
          Top Rated
        </Nav.Link>
        <Nav.Link as={NavLink} exact to='/popular' eventKey='4'>
          Polular
        </Nav.Link>
        <Nav.Link as={NavLink} exact to='/upcoming' eventKey='5'>
          Upcoming
        </Nav.Link>
        <div></div>
        <Nav.Link as={NavLink} exact to='/search' eventKey='6'>
          Search
        </Nav.Link>
      </Nav>
      <Nav>
        <a
          href='https://github.com/lethang7794/movie-browser'
          target='_blank'
          rel='noreferrer'
          style={{ padding: '0.5rem 1rem', margin: '1rem auto' }}
        >
          <img src={githubMark} alt='Github' width='32px' />
        </a>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default MainNavBar;

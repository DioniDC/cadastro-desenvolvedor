import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import DevsPage from './pages/DevsPage';
import LevelsPage from './pages/LevelsPage';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

export default function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Cadastro Devs</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link as={Link} to="/devs" style={{ marginRight: '20px' }}>Devs</Nav.Link>
              <Nav.Link as={Link} to="/levels">Níveis</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devs" element={<DevsPage />} />
          <Route path="/levels" element={<LevelsPage />} />
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </Container>
    </>
  );
}

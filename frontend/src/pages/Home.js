import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCode, FaUsers } from 'react-icons/fa';

export default function Home() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center g-4">
        <Col md={5}>
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <FaCode size={40} className="mb-3" />
              <Card.Title><strong>Níveis</strong></Card.Title>
              <Card.Text>
                Gerencie os níveis de desenvolvedores disponíveis no sistema.
              </Card.Text>
              <Button as={Link} to="/levels" variant="dark">
                Acessar Níveis
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <FaUsers size={40} className="mb-3" />
              <Card.Title><strong>Desenvolvedores</strong></Card.Title>
              <Card.Text>
                Cadastre e gerencie os desenvolvedores do sistema.
              </Card.Text>
              <Button as={Link} to="/devs" variant="dark">
                Acessar Desenvolvedores
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

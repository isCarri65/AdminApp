// src/components/Menu.tsx
import { Container, Row, Col, Card } from 'react-bootstrap';

const Menu = () => {
  return (
    <Container>
      <Row className="text-center mb-4">
        <Col>
          <h1>Sistema de Gestión de Empresas</h1>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Empresa 1</Card.Title>
              <div className="icon-placeholder">
                ▲ ■ ● {/* Aquí puedes reemplazar por íconos reales si lo prefieres */}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Empresa 2</Card.Title>
              <div className="icon-placeholder">
                ▲ ■ ●
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Empresa 3</Card.Title>
              <div className="icon-placeholder">
                ▲ ■ ●
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Menu;

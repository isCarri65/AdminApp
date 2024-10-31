import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../../styles/MainMenu.css';

import { useNavigate } from 'react-router-dom';

export const HomePrincipal = () => {

  const navigate = useNavigate()


  return (
    <Container fluid className="main-menu">
      <header className="main-header">
        <h1>Sistema de Gestión de Empresas</h1>
      </header>
      <Row className="company-buttons">
        {['Empresa 1', 'Empresa 2', 'Empresa 3'].map((empresa, index) => (
          <Col key={index} md={4} className="d-flex justify-content-center">
            <Card className="company-card">
              <Card.Body>
                <Card.Title>{empresa}</Card.Title>
                <div className="geometric-shapes">
                  <div className="triangle"></div>
                  <div className="square"></div>
                  <div className="circle"></div>
                </div>
                <Button variant="primary" className="company-button" onClick={ () => {
                  navigate(`/HomeSecundario/${index+1}`) 
                  }}>
                  Ir a {empresa}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};




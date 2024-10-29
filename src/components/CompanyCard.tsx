import React from 'react';
import { Card, Button } from 'react-bootstrap';
import "../styles/MainMenu.css";


interface CompanyCardProps {
  name: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ name }) => {
  const navigateToCompany = () => {
    // Redirige a la página de la empresa correspondiente
    window.location.href = `/empresa/${name}`;
  };

  return (
    <Card className="company-card">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <div className="geometric-shapes">
          <div className="triangle"></div>
          <div className="square"></div>
          <div className="circle"></div>
        </div>
        <Button variant="primary" className="company-button" onClick={navigateToCompany}>
          Ir a {name}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CompanyCard;

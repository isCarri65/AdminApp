import { Button, Card } from "react-bootstrap";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { FC } from "react";
interface ISucursalCard {
  sucursal: ISucursal
}

export const SucursalCard: FC<ISucursalCard> = ({sucursal}) => {
  return (
    <>
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={sucursal.logo} />
      <Card.Body>
        <Card.Title>{sucursal.nombre}</Card.Title>
        <Card.Text>
          {sucursal.domicilio.localidad.nombre},{sucursal.domicilio.calle}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </>
  );
};

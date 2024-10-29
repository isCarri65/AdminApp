import { Button, Card } from "react-bootstrap";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { FC } from "react";
interface ISucursalCard {
  sucursal: ISucursal,
  setOpenModal?: (state: boolean) => void,
  getsucursales?: () =>  void,
}

export const SucursalCard: FC<ISucursalCard> = ({sucursal}) => {

  const handleOpenModal = ()=>{
    
  }
  return (
    <>
    <Card >
      <Card.Img variant="top" src={sucursal.logo} />
      <Card.Body>
        <Card.Title>{sucursal.nombre}</Card.Title>
        <Card.Text>
          {sucursal.domicilio.localidad.nombre},{sucursal.domicilio.calle}
        </Card.Text>
        <Button variant="primary" onClick={handleOpenModal}>Editar sucursal</Button>
      </Card.Body>
    </Card>
    </>
  );
};

import { Button, Card } from "react-bootstrap";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { FC } from "react";
import { useAppDispatch } from "../../../Hooks/hooks";
import { setSucursalActivo } from "../../../redux/slices/SucursalReducer/SucursalReducer";
interface ISucursalCard {
  sucursal: ISucursal;
  setOpenModal: (state: boolean) => void;
  getsucursales?: () => void;
}

export const SucursalCard: FC<ISucursalCard> = ({ sucursal, setOpenModal }) => {
  const distpach = useAppDispatch()
  const handleOpenModal = () => {
    distpach(setSucursalActivo({sucursalActivo: sucursal}))
    setOpenModal(true)

  };
  return (
    <>
      <Card>
        <Card.Img variant="top" src={sucursal.logo} />
        <Card.Body>
          <Card.Title>{sucursal.nombre}</Card.Title>
          <Card.Text className="pt-4">
            <p style={{fontWeight: "600", textDecoration: "underline"}}>Direccion: </p>
            {sucursal.domicilio.localidad.nombre}, {sucursal.domicilio.calle} {sucursal.domicilio.numero}
          </Card.Text>
          
          <Button variant="primary" onClick={handleOpenModal}>
            <span className="material-symbols-outlined">edit</span>
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

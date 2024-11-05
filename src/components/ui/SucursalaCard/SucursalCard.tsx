import { Button, Card } from "react-bootstrap";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { FC } from "react";
import { useAppDispatch } from "../../../Hooks/hooks";
import { setSucursalActivo } from "../../../redux/slices/SucursalReducer/SucursalReducer";
import styles from "./SucursalCard.module.css";
interface ISucursalCard {
  sucursal: ISucursal;
  setOpenModal: (state: boolean) => void;
  getsucursales?: () => void;
}

export const SucursalCard: FC<ISucursalCard> = ({ sucursal, setOpenModal }) => {
  const distpach = useAppDispatch();
  const handleOpenModal = () => {
    distpach(setSucursalActivo({ sucursalActivo: sucursal }));
    setOpenModal(true);
  };
  return (
    <>
      <Card className={styles.cardContainer}>
        <div className={styles.titleContainer}>
          <Card.Title className={`mx-auto ${styles.cardTitle}`}>
            {sucursal.nombre.toUpperCase()}
          </Card.Title>
        </div>
        <div className={styles.imgContainer}>
          <Card.Img
            className={styles.cardImg}
            variant="top"
            src={
              sucursal.logo ? sucursal.logo : "../../../Pictures/Empty_img.png"
            }
          />
        </div>
        <Card.Body className={styles.cardBody}>
          <Card.Text className="pt-4">
            {sucursal.domicilio.localidad.nombre}, {sucursal.domicilio.calle}{" "}
            {sucursal.domicilio.numero}
          </Card.Text>

          <Button
            className={styles.buttonEdit}
            variant="primary"
            onClick={handleOpenModal}
          >
            <span className="material-symbols-outlined">edit</span>
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

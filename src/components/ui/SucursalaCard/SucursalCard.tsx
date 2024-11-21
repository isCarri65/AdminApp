import { Button, Card } from "react-bootstrap";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { FC } from "react";
import { useAppDispatch } from "../../../Hooks/hooks";
import { setSucursalActivo } from "../../../redux/slices/SucursalReducer/SucursalReducer";
import styles from "./SucursalCard.module.css";
interface ISucursalCard {
  sucursal: ISucursal;
  setOpenModal: (state: boolean) => void;
  setOpenModalInfo: (state: boolean) => void;
}

export const SucursalCard: FC<ISucursalCard> = ({ sucursal, setOpenModal, setOpenModalInfo }) => {
  const distpach = useAppDispatch();

  const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    distpach(setSucursalActivo(sucursal));
    setOpenModal(true);
  };

  const handleShowInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    distpach(setSucursalActivo(sucursal));
    setOpenModalInfo(true);
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
            src={sucursal.logo ? sucursal.logo : "../../../Pictures/Empty_img.png"}
          />
        </div>
        <Card.Body className={styles.cardBody}>
          <Card.Text className={styles.cardText}>{sucursal.domicilio.localidad.nombre}</Card.Text>
          <Card.Text className={sucursal.domicilio.numero ? styles.cardText : styles.cardTextVoid}>
            {sucursal.domicilio.numero}
          </Card.Text>
          <Card.Text className={sucursal.domicilio.calle ? styles.cardText : styles.cardTextVoid}>
            {sucursal.domicilio.calle}
          </Card.Text>
          <div>
            <Button className={styles.buttonEdit} variant="primary" onClick={handleOpenModal}>
              <span className="material-symbols-outlined">edit</span>
            </Button>
            <Button className={styles.buttonShowInfo} onClick={handleShowInfo}>
              <span className="material-symbols-outlined">visibility</span>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

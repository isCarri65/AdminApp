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
  /*
  const handleDeleteSucursal = () => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No sera posible revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await sucursalService.delete(sucursal.id);

          Swal.fire({
            
        title: "Eliminado",
        text: "operación completada",
        icon: "success"
          });
        } catch (error) {
          console.error(error);
        }
        setOpenModal(false);
      } else {
        setOpenModal(false);
      }
    });
  };*/

  const handleShowInfo = (event: React.MouseEvent<HTMLButtonElement>)=>{
    event.stopPropagation()
    distpach(setSucursalActivo(sucursal))
    setOpenModalInfo(true)
  }
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
            {/*
          <Button
            className={styles.buttonDelete}
            variant="primary"
            onClick={handleDeleteSucursal}
          >
            <span className="material-symbols-outlined">delete</span>
          </Button>*/}
          <Button
            className={styles.buttonShowInfo}
            onClick={handleShowInfo}
          >
            <span className="material-symbols-outlined">visibility</span>
          </Button>
        </Card.Body>
      </Card>
      
    </>
  );
};

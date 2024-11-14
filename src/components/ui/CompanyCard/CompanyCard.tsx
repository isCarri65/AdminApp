import React from "react";
import { Card, Button } from "react-bootstrap";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import styles from "./CompanyCard.module.css";
import { useAppDispatch } from "../../../Hooks/hooks";
import { setEmpresaModalActiva } from "../../../redux/slices/CompanySlices/EmpresaSlice";

interface CompanyCardProps {
  company: IEmpresa;
  setOpenModal: (state: boolean) => void;
  setOpenModalInfo: (state: boolean) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, setOpenModal, setOpenModalInfo }) => {
  const dispatch = useAppDispatch();
  const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(setEmpresaModalActiva(company));
    setOpenModal(true);
  };
  const handleShowInfo = (event: React.MouseEvent<HTMLButtonElement>)=> {
    event.stopPropagation()
    dispatch(setEmpresaModalActiva(company))
    setOpenModalInfo(true)
  }

  return (
    
    <Card className={styles.cardContainer} >
      <Card.Body className={styles.cardBody}>
        <div className={styles.imgContainer}>
          <Card.Img
            className={styles.cardImg}
            variant="top"
            src={
              company.logo ? company.logo : "../../../Pictures/Empty_img.png"
            }
          />
        </div>
        <div className={styles.titleContainer}>
        <Card.Title className={styles.cardTitle}>{company.nombre}</Card.Title>
        </div>
        <Button
          className={styles.buttonEdit}
          variant="primary"
          onClick={handleOpenModal}
        >
          <span className="material-symbols-outlined">edit</span>
        </Button>
        <Button
            className={styles.buttonShowInfo}
            onClick={handleShowInfo}
          >
            <span className="material-symbols-outlined">visibility</span>
        </Button>
        
      </Card.Body>
    </Card>
  );
};

export default CompanyCard;

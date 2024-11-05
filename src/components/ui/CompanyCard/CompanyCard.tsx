import React from 'react';
import { Card, Button} from 'react-bootstrap';
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa';
import styles from "./CompanyCard.module.css"
import { useAppDispatch } from '../../../Hooks/hooks';
import { setEmpresaActiva } from '../../../redux/slices/CompanySlices/EmpresaSlice';


interface CompanyCardProps {
  company: IEmpresa;
  setOpenModal: (state: boolean) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, setOpenModal }) => {
  const dispatch = useAppDispatch()
  const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement>)=>{
    event.stopPropagation()
    dispatch(setEmpresaActiva(company))
    setOpenModal(true)
  }

  return (
    <Card className="company-card">
      <Card.Body>
      <Card.Img
            className={styles.cardImg}
            variant="top"
            src={
              company.logo ? company.logo : "../../../Pictures/Empty_img.png"
            }
          />
        <Card.Title>{company.nombre}</Card.Title>
        <Button
            className={styles.buttonEdit}
            variant="primary"
            onClick={handleOpenModal}
          >
            <span className="material-symbols-outlined">edit</span>
          </Button>
      </Card.Body>
    </Card>
  );
};

export default CompanyCard;

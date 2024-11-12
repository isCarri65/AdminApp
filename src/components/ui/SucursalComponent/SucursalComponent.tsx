import { FC, useEffect, useState } from "react";
import { ModalCrearSucursal } from "../modals/ModalCrearSucursal/ModalCrearSucursal";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { SucursalCard } from "../SucursalaCard/SucursalCard";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { Button } from "react-bootstrap";
import { setSucursalList } from "../../../redux/slices/SucursalReducer/SucursalReducer";
import { SucursalService } from "../../../service/SurcusalService";
import styles from "./SucursalComponent.module.css";
import { useNavigate } from "react-router-dom";
interface ISucursalComponent {
  company: IEmpresa;
  setOpenModalInfo: (state: boolean)=> void;
}

export const SucursalComponent: FC<ISucursalComponent> = ({ company, setOpenModalInfo }) => {

  const [openModal, setOpenModal] = useState(false);
  const [sucursales, setSucursales] = useState<ISucursal[]>([]);

  const dispatch = useAppDispatch();
  const dataSucursal = useAppSelector((state) => state.sucursal.sucursalList);
  const sucursalService = new SucursalService();
  const navigate = useNavigate()

  const getSucursales = async () => {
    if(company){
      await sucursalService.getAllSucursalesByEmpresa(company.id).then((sucursalesDatos) => {
        dispatch(setSucursalList({ sucursalList: sucursalesDatos }));
      });
    } else {
      console.log("No se encontró empresa Activa")
    }
  };

  
  useEffect(() => {
    getSucursales();
  }, []);

  useEffect(() => {
    setSucursales(dataSucursal)
  }, [dataSucursal]);

  useEffect(() => {
    getSucursales();
  }, [company]);

  const handleTableProduct = (sucursal: ISucursal)=>{
  navigate(`/HomeSecundario/sucursal/producto/:${sucursal.id}`)
  }

  return (
    <div
      style={{
        backgroundColor: "#ffe",
        width: "100%",
        padding: "20px 50px",
      }}
    >
      <div className={styles.titleContainer}>
        <p>Sucursales de: {company.nombre.toUpperCase()}</p>
      </div>
      <div className="p-3">
        <Button
          className={styles.buttonModal}
          onClick={() => setOpenModal(true)}
        >
          <span className={`material-symbols-outlined ${styles.icon}`}>add</span>
          Agregar Sucursal
        </Button>
      </div>
      <div className={styles.sucursalesContainer}>
        {sucursales.map((elem: ISucursal, i: number) => (
          <div className={styles.cardContainer} onClick={()=>handleTableProduct(elem)} key={i}>
            <SucursalCard
              sucursal={elem}
              setOpenModal={setOpenModal}
              setOpenModalInfo={setOpenModalInfo}
              key={i}
            />
          </div>
        ))}
      </div>

      <ModalCrearSucursal
        openModal={openModal}
        setOpenModal={setOpenModal}
        getSucursales={getSucursales}
      />
      
    </div>)
};

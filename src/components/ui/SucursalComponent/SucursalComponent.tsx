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
interface ISucursalComponent {
  company: IEmpresa;
}

export const SucursalComponent: FC<ISucursalComponent> = ({ company }) => {
  const [openModal, setOpenModal] = useState(false);
  const [sucursales, setSucursales] = useState<ISucursal[]>([]);

  const dispatch = useAppDispatch();
  const dataSucursal = useAppSelector((state) => state.sucursal.sucursalList);
  const sucursalService = new SucursalService();

  const getSucursales = async () => {
    await sucursalService
      .getAllSucursalesByEmpresa(company.id)
      .then((sucursalesDatos) => {
        dispatch(setSucursalList({ sucursalList: sucursalesDatos }));
      });
  };

  useEffect(() => {
    console.log("componente");
    setSucursales(dataSucursal);
  }, [dataSucursal]);

  useEffect(() => {
    getSucursales();
  }, []);
  console.log(sucursales);

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
        <Button onClick={() => setOpenModal(true)}>Crear Sucursal</Button>
      </div>
      <div className={styles.sucursalesContainer}
        
      >
        {sucursales.map((elem: ISucursal, i: number) => (
          <div className={styles.cardContainer}>
            <SucursalCard sucursal={elem} setOpenModal={setOpenModal} key={i} />
          </div>
        ))}
      </div>

      <ModalCrearSucursal
        openModal={openModal}
        setOpenModal={setOpenModal}
        getSucursales={getSucursales}
      />
    </div>
  );
};

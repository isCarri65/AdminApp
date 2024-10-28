import { FC, useState } from "react";
import { ModalCrearSucursal } from "../../modals/ModalCrearSucursal/ModalCrearSucursal";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { SucursalCard } from "../SucursalaCard/SucursalCard";
import { useAppSelector } from "../../../Hooks/hooks";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { Button } from "react-bootstrap";
interface ISucursalComponent {
  company: IEmpresa;
}

export const SucursalComponent: FC<ISucursalComponent> = ({ company }) => {
  const [openModal, setOpenModal] = useState(false);
  const SucursalList : ISucursal[] = useAppSelector((state)=> state.sucursal.sucursalList)
  const getSucursales = () =>{

  }

  return (
    <div style={{ backgroundColor: "#999", height: "100%", width: "100%" }}>
      <div>
        <Button onClick={()=> setOpenModal(true)}>Crear Sucursal</Button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {company.sucursales.map((sucursal) => (
          <SucursalCard sucursal={sucursal} />
        ))}
      </div>
      <ModalCrearSucursal openModal={openModal} setOpenModal={setOpenModal} getSucursales={getSucursales} />
    </div>
  );
};
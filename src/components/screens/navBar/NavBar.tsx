import { useState, FC } from "react";

import "./navBar.css";
import { NavBarCompany } from "../../ui/navBar/NavBarCompany";
import { ModalCreateCompany } from "../../ui/modals/ModalCreateCompany/ModalCreateCompany";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { useNavigate } from "react-router-dom";

interface INavBar {
  getEmpresas: () => void;
  getSucursales: (empresa: IEmpresa) => void;
  company: IEmpresa | null;
}
export const NavBar: FC<INavBar> = ({
  getEmpresas,
  getSucursales,
  company,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate()

  const handleUndo = ()=>{
    navigate("/")
  }
  return (
    <div className="main_navBar">
      <div style={{width:"100%", height:"2rem"}}>
        <button className="buttonUndo" onClick={handleUndo}>
          <span className={`material-symbols-outlined iconUndo`}>undo</span>
          <div>Volver</div>
        </button>
      </div>
      {/* NavBar cuando entras a una empresa */}
      <div className={"navBar_empresa"}>
        <h1 className="sucursal_tittle">Gestion de Sucursales</h1>
        <div className="add_company_container">
          <button
            className="add_company_NavBar"
            onClick={() => setOpenModal(true)}
            
          >
            <span className="material-symbols-outlined icon">add</span>
            Agregar Empresa
          </button>
        </div>
        <NavBarCompany
          getEmpresas={getEmpresas}
          getSucursales={getSucursales}
          company={company}
          setOpenModal={setOpenModal}
        />
      </div>
      <ModalCreateCompany
        openModal={openModal}
        setOpenModal={setOpenModal}
        getEmpresas={getEmpresas}
      />
    </div>
  );
};

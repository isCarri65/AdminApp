import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./navBar.css"
import Button from 'react-bootstrap/Button';
import { NavBarCompany } from "../../ui/navBar/NavBarCompany";
import { ModalCreateCompany } from "../../modals/ModalCreateCompany/ModalCreateCompany";

export const NavBar = ()=>{
    const location = useLocation();
    const [navBarEmpresa, setNavBarEmpresa] = useState(false); 
    const [openModal, setOpenModal] = useState(false);



    useEffect(() => {
        const pathActual = location.pathname;
        if (pathActual === "/") {
            setNavBarEmpresa(true);
        } else {
            setNavBarEmpresa(false);
        }
    }, [location]);
    return (
        <div className="main_navBar" >
            {/* NavBar Pagina Principal */}
            <h1 className={navBarEmpresa ? "main_tittle" : "display_none"}>Sistema de Gestion de Empresas</h1>
            {/* NavBar cuando entras a una empresa */}
            <div className={!navBarEmpresa ? "navBar_empresa" : "display_none"}>
            <h1 className="sucursal_tittle">Sistema de Gestion de Empresas</h1>
            <div className="add_company_NavBar">
           
            <Button onClick={()=> setOpenModal(true)} style={{backgroundColor: '#888690', border: "none",  display: "flex", justifyContent: "space-around", alignItems: "center"}}variant="secondary"  >
            <span className="material-symbols-outlined">add</span>
            Agregar Empresa</Button>
            </div>  
            <NavBarCompany></NavBarCompany>
            </div>  
      <ModalCreateCompany openModal={openModal} setOpenModal={setOpenModal} />
        </div>

    )
}
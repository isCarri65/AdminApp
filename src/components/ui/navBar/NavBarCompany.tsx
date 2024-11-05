import { Link } from "react-router-dom";
import { useAppSelector } from "../../../Hooks/hooks"
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";


import "../../screens/navBar/navBar.css"
import "swiper/css";



export const NavBarCompany = ()=>{
    // const EmpresaList : IEmpresa[] = useAppSelector((state)=> state.empresa.EmpresaList)
    const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
    const [selectCompany, setSelectCompany] = useState(false)

    const EmpresaList = [{
        id: 1,
        nombre: "Branca",
        razonSocial: "asd",
        cuit: 12412412421412,
        logo: "string",
        sucursales: "ISucursal[]",
        pais: "IPais"
    }, {
        id: 2,
        nombre: "Andes",
        razonSocial: "asd",
        cuit: 2212121212,
        logo: "logo2",
        sucursales: "ISucursal[]222",
        pais: "IPais2"
    }, {
        id: 3,
        nombre: "Quilmes",
        razonSocial: "zxc",
        cuit: 34343434343,
        logo: "logo3",
        sucursales: "ISucursal[]333",
        pais: "IPais333"
    },{
        id: 4,
        nombre: "Schneider",
        razonSocial: "vbn",
        cuit: 454545454545,
        logo: "logo4",
        sucursales: "ISucursal[]4444",
        pais: "IPais4444"
    }
    ]
    const handleHover = (empresaId: number) => {
        setSelectedCompanyId(empresaId);
    };
    return (
        <div className="navBar_cards_nombres_container">
            <div className="navBar_swiper">

            <Swiper 
            modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={3}
            onSlideChange={()=>console.log("")}
            onSwiper={(swiper)=> console.log(swiper)}
            pagination={{
                el: ".pagination",
                clickable: true,
              }}
            
            >
            {EmpresaList.map((empresa, index)=>
            <SwiperSlide key={index}>
                 <div onClick={()=>handleHover(empresa.id)} key={index} className={` ${selectedCompanyId === empresa.id ? "navBar_cards_nombres_container_icons_hover" : "navBar_cards_nombres_container_icons"}`}>
            <Link to={`/${empresa.nombre}`} className="link__class__decortaion" >
            <div className="navBar_cards_nombres" >{empresa.nombre}</div>
            </Link>
            <div className="navBar_icons">
            <Link to={`/${empresa.nombre}/edit`} className="link__class__decortaion">
            <span className="material-symbols-outlined">edit</span>
            </Link>
            </div>
            </div>
            </SwiperSlide>
            )}
            </Swiper>
             {/* {EmpresaList.map((empresa, index) => (
            <div onClick={()=>handleHover(empresa.id)} key={index} className={` ${selectedCompanyId === empresa.id ? "navBar_cards_nombres_container_icons_hover" : "navBar_cards_nombres_container_icons"}`}>
            <Link to={`/${empresa.nombre}`} className="link__class__decortaion" >
            <div className="navBar_cards_nombres" >{empresa.nombre}</div>
            </Link>
            <div className="navBar_icons">
            <Link to={`/${empresa.nombre}/edit`} className="link__class__decortaion">
            <span className="material-symbols-outlined">edit</span>
            </Link>
            </div>
            </div>
            
            ))} */}
            </div>
        </div>



    )
}
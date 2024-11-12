import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "../../screens/navBar/navBar.css";
import "swiper/css";
import { setEmpresaModalActiva } from "../../../redux/slices/CompanySlices/EmpresaSlice";
import styles from "./NavBarCompany.module.css"
import { CompanyModalInfo } from "../modals/CompanyModalInfo/CompanyModalInfo";

interface INavBarCompany {
  getEmpresas: () => void;
  getSucursales: (empresa: IEmpresa)=> void,
  company: IEmpresa| null,
  setOpenModal: (state: boolean)=>void,
}

export const NavBarCompany: FC<INavBarCompany> = ({ getEmpresas, getSucursales, company, setOpenModal}) => {
  const dispatch = useAppDispatch();
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [empresaActiva, setEmpresaA] = useState<IEmpresa | null>(null);
  const stateEmpresaList = useAppSelector((state) => state.empresa.empresaList);
  const [openModalInfo, setOpenModalInfo] = useState(false)

  useEffect(() => {
    getEmpresas();
  }, []);

  useEffect(() => {
    setEmpresas(stateEmpresaList);
  }, [stateEmpresaList]);


  useEffect(() => {
    setEmpresaA(company);
  }, [company]);

  const handleHover = async (empresa: IEmpresa) => {
    setEmpresaA(empresa);
    getSucursales(empresa)
  };
  const HandleOpenModal = (event: React.MouseEvent<HTMLDivElement> , empresa:IEmpresa)=>{
    event.stopPropagation()
    dispatch(setEmpresaModalActiva(empresa));
    setOpenModal(true)
  }
  const HandleShowModalInfo = (event: React.MouseEvent<HTMLDivElement> , empresa:IEmpresa)=>{
    event.stopPropagation()
    dispatch(setEmpresaModalActiva(empresa));
    setOpenModalInfo(true)
  }

  return (
    <div className="navBar_cards_nombres_container">
      <div className="navBar_swiper">
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={3}
          pagination={{
            el: ".pagination",
            clickable: true,
          }}
        >
          {empresas.map((empresa, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => handleHover(empresa)}
                key={index}
                className={` ${styles.cardContainer} ${
                  empresaActiva
                    ? empresaActiva.id === empresa.id
                      ? "navBar_cards_nombres_container_icons_hover"
                      : "navBar_cards_nombres_container_icons"
                    : "navBar_cards_nombres_container_icons"
                }`}
              >
                <div className={`navBar_cards_nombres link__class__decortaion ${styles.cardName}`}>{empresa.nombre}</div>

                {/* <Link to={`HomeSecundario/${empresa.id}`} className="link__class__decortaion">
                  <div className="navBar_cards_nombres">{empresa.nombre}</div>
                </Link> */}
                <div className={styles.navBarIcons}>
                  <div onClick={(event)=>HandleOpenModal(event, empresa)} className="link__class__decortaion">
                    <span className={`material-symbols-outlined ${styles.iconEdit}`}>edit</span>
                  </div>
                  <div onClick={(event)=>HandleShowModalInfo(event, empresa)} className="link__class__decortaion">
                  <span className={`material-symbols-outlined ${styles.iconEdit}`}>visibility</span>
                  </div>
        
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
        className={openModalInfo ? styles.openModalInfo : styles.closeModalInfo}
      >
        <CompanyModalInfo setOpenModalInfo={setOpenModalInfo} />
      </div>
      </div>
    </div>
  );
};

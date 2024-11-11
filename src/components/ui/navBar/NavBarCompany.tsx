import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "../../screens/navBar/navBar.css";
import "swiper/css";
import { setEmpresaActiva } from "../../../redux/slices/CompanySlices/EmpresaSlice";

interface INavBarCompany {
  getEmpresas: () => void;
  getSucursales: (empresa: IEmpresa)=> void,
}

export const NavBarCompany: FC<INavBarCompany> = ({ getEmpresas, getSucursales}) => {
  const dispatch = useAppDispatch();
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [empresaActiva, setEmpresaA] = useState<IEmpresa | null>(null);
  const stateEmpresaActiva = useAppSelector((state) => state.empresa.empresaActiva);
  const stateEmpresaList = useAppSelector((state) => state.empresa.empresaList);

  useEffect(() => {
    getEmpresas();
  }, []);

  useEffect(() => {
    setEmpresas(stateEmpresaList);
  }, [stateEmpresaList]);


  useEffect(() => {
    setEmpresaA(stateEmpresaActiva);
  }, [stateEmpresaActiva]);

  const handleHover = async (empresa: IEmpresa) => {
    dispatch(setEmpresaActiva(empresa));
    setEmpresaA(empresa);
    getSucursales(empresa)
  };

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
                className={` ${
                  empresaActiva
                    ? empresaActiva.id === empresa.id
                      ? "navBar_cards_nombres_container_icons_hover"
                      : "navBar_cards_nombres_container_icons"
                    : "navBar_cards_nombres_container_icons"
                }`}
              >
                <div className="navBar_cards_nombres link__class__decortaion">{empresa.nombre}</div>

                {/* <Link to={`HomeSecundario/${empresa.id}`} className="link__class__decortaion">
                  <div className="navBar_cards_nombres">{empresa.nombre}</div>
                </Link> */}
                <div className="navBar_icons">
                  <Link to={`/${empresa.nombre}/edit`} className="link__class__decortaion">
                    <span className="material-symbols-outlined">edit</span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

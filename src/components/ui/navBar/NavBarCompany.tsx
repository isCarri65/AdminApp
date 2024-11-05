import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "../../screens/navBar/navBar.css";
import "swiper/css";
import { setEmpresaActiva } from "../../../redux/slices/CompanySlices/EmpresaSlice";
import { EmpresaService } from "../../../service/EmpresaService";

interface INavBarCompany {
  getEmpresas: () => void;
}

export const NavBarCompany: FC<INavBarCompany> = ({ getEmpresas }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [empresaA, setEmpresaA] = useState<IEmpresa | null>(null);
  const empresaAc = useAppSelector((state) => state.empresa.empresaActiva);
  const empresaList = useAppSelector((state) => state.empresa.empresaList);
  const navigate = useNavigate();

  const empresaService = new EmpresaService();
  const getEmpresaActiva = async () => {
    if (id) {
      await empresaService.getById(Number.parseInt(id)).then((emp) => {
        if (emp) dispatch(setEmpresaActiva(emp));
      });
    }
  };
  useEffect(() => {
    getEmpresas();
    getEmpresaActiva();
  }, [id]);
  useEffect(() => {
    setEmpresas(empresaList);
  }, [empresaList]);
  useEffect(() => {
    setEmpresaA(empresaAc);
  }, [empresaAc]);

  const handleHover = async (id: number) => {
    const empresa = await empresaService.getById(id);
    if (empresa) {
      dispatch(setEmpresaActiva(empresa));
      setEmpresaA(empresaA);
    }
    navigate(`/HomeSecundario/${id}`);
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
                onClick={() => handleHover(empresa.id)}
                key={index}
                className={` ${
                  empresaA
                    ? empresaA.id === empresa.id
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

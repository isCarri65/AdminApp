import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { FC, useEffect, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "../../screens/navBar/navBar.css";
import "swiper/css";
import { setEmpresaActiva, setEmpresaModalActiva } from "../../../redux/slices/CompanySlices/EmpresaSlice";
import styles from "./NavBarCompany.module.css";
import { CompanyModalInfo } from "../modals/CompanyModalInfo/CompanyModalInfo";
import { A11y, Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle"

interface INavBarCompany {
  getEmpresas: () => void;
  setOpenModal: (state: boolean) => void;
}

export const NavBarCompany: FC<INavBarCompany> = ({
  getEmpresas,
  setOpenModal,
}) => {
  const dispatch = useAppDispatch();
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const empresaActiva = useAppSelector((state=>state.empresa.empresaActiva))
  const stateEmpresaList = useAppSelector((state) => state.empresa.empresaList);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

  useEffect(() => {
    getEmpresas();
  }, []);

  useEffect(() => {
    setEmpresas(stateEmpresaList);
  }, [stateEmpresaList]);

  const handleNext = () => {
    if (swiperInstance) {
      if(swiperInstance.params.slidesPerView && swiperInstance.params.slidesPerView != "auto"){
      const maxIndex = swiperInstance.slides.length - swiperInstance.params.slidesPerView
      const newIndex = Math.min(swiperInstance.activeIndex + 3, maxIndex);
      swiperInstance.slideTo(newIndex);
      }
    }
  };
  
  const handlePrev = () => {
    if (swiperInstance) {
      const newIndex = Math.max(swiperInstance.activeIndex - 3, 0);
      swiperInstance.slideTo(newIndex);
    }
  };

  const handleHover = async (empresa: IEmpresa) => {
    dispatch(setEmpresaActiva(empresa));
  };
  const HandleOpenModal = (
    event: React.MouseEvent<HTMLDivElement>,
    empresa: IEmpresa
  ) => {
    event.stopPropagation();
    dispatch(setEmpresaModalActiva(empresa));
    setOpenModal(true);
  };
  const HandleShowModalInfo = (
    event: React.MouseEvent<HTMLDivElement>,
    empresa: IEmpresa
  ) => {
    event.stopPropagation();
    dispatch(setEmpresaModalActiva(empresa));
    setOpenModalInfo(true);
  };
  
  return (
    <div className="navBar_cards_nombres_container">
      <div className="navBar_swiper">
        <Swiper
          modules={[Pagination, Navigation, A11y]}
          spaceBetween={20}
          slidesPerView={3}
          allowTouchMove={false}
          pagination={{
            el: `.pagination`,
            clickable: true,
            type:"fraction",
          }}
          breakpoints={{
            850: {
              slidesPerView: 3, // Valor por defecto para pantallas mayores a 850px
            },
            590: {
              slidesPerView: 2, 
            },
            0: {
              slidesPerView: 1, 
            },
          }}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
        >
          {empresas.map((empresa, index) => (
            <SwiperSlide
              key={index}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                onClick={() => handleHover(empresa)}
                className={` ${styles.cardContainer} ${
                  empresaActiva
                    ? empresaActiva.id === empresa.id
                      ? "navBar_cards_nombres_container_icons_hover"
                      : "navBar_cards_nombres_container_icons"
                    : "navBar_cards_nombres_container_icons"
                }`}
              >
                <div
                  className={`navBar_cards_nombres link__class__decortaion ${styles.cardName}`}
                >
                  {typeof empresa.nombre === "string" ? empresa.nombre.toUpperCase() : ""} 
                </div>
                <div className={empresaActiva && empresaActiva.id === empresa.id ? styles.navBarIcons: styles.navBarIconsDisabled}>
                  <div
                    onClick={(event) => HandleOpenModal(event, empresa)}
                    className="link__class__decortaion"
                  >
                    <span
                      className={`material-symbols-outlined ${styles.iconEdit}`}
                    >
                      edit
                    </span>
                  </div>
                  <div
                    onClick={(event) => HandleShowModalInfo(event, empresa)}
                    className="link__class__decortaion"
                  >
                    <span
                      className={`material-symbols-outlined ${styles.iconEdit}`}
                    >
                      visibility
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.buttonSwiperContainer}>
        <button className={styles.buttonSwiperLeft} onClick={handlePrev}>
          <span className={`material-symbols-outlined ${styles.buttonSwiperIcon}`}>chevron_left</span>
        </button>

        <div className="pagination d-flex justify-content-center" style={{color: "#111", width: "80px"}}></div>

        <button className={styles.buttonSwiperRight} onClick={handleNext}>
          <span className={`material-symbols-outlined ${styles.buttonSwiperIcon}`}>chevron_right</span>
        </button>
      </div>
      <div
        className={openModalInfo ? styles.openModalInfo : styles.closeModalInfo}
      >
        <CompanyModalInfo setOpenModalInfo={setOpenModalInfo} />
      </div>
    </div>
  );
};

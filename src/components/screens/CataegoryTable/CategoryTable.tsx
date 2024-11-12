import { Button } from "react-bootstrap";
import "./CategoryTable.css";
import { NavBarSide } from "../navBarSide/NavBarSide";
import { useEffect, useState } from "react";
import { ModalCrearCategoria } from "../../ui/modals/ModalCategoria/ModalCrearCategoria";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { CategoriaService } from "../../../service/CategoriaService";
import { useParams } from "react-router-dom";
import { setCategoriaList } from "../../../redux/slices/CategorySlices/CategoriaSlice";
import { CategoriaCard } from "../../ui/CategoriaComponent/CategoriaCard";

const CategoryTable = () => {
  /* Categoria service, traer categoria */
  const { id } = useParams();
  const idSucursal = Number(id);
  const dispatch = useAppDispatch();

  const categoriaList = useAppSelector((state) => state.categoria.categoriaList);

  const categoriaService = new CategoriaService();
  const getCategorias = async () => {
    await categoriaService.getCategoriasPorSucursal(idSucursal).then((datos) => {
      dispatch(setCategoriaList(datos));
    });
  };

  useEffect(() => {
    getCategorias();
  }, [idSucursal]);

  /* Cierre Categoria */
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <>
      <header className="header_categoryTable">
        <div className="div_container_navbarCategory">
          <NavBarSide isOpen={isSideBarOpen} toggleMenu={toggleSideBar} />
          <h2 className="title_Product">Categoria</h2>
          <Button variant="primary" className="add-product-btn" onClick={() => setOpenModal(true)}>
            Agregar Categoria
          </Button>
        </div>
      </header>
      <div>
        <CategoriaCard categoria={categoriaList} />
      </div>
      <ModalCrearCategoria
        openModal={openModal}
        setOpenModal={setOpenModal}
        idSucursales={[idSucursal]}
        categoriasAll={categoriaList}
      />
    </>
  );
};

export default CategoryTable;

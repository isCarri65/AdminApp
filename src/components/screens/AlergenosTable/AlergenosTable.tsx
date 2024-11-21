import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { NavBarSide } from "../navBarSide/NavBarSide";
import { AlergenoService } from "../../../service/AlergenoService";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import AgregarAlergenoModal from "./AgregarAlergenoModal";
import EditarAlergenoModal from "./EditarAlergenoModal";  // Importar el nuevo componente
import { ICreateAlergeno } from "../../../types/dtos/alergenos/ICreateAlergeno";
import './AlergenosTable.css';
import { IUpdateAlergeno } from "../../../types/dtos/alergenos/IUpdateAlergeno";

const alergenoService = new AlergenoService();

const AlergenosTable: React.FC = () => {
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAlergenoId, setEditingAlergenoId] = useState<number | null>(null);

  // Estado para el manejo del menú
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchAlergenos = async () => {
      const data = await alergenoService.getAllAlergenos();
      setAlergenos(data);
    };
    fetchAlergenos();
  }, []);

  const handleAddAlergeno = async (newAlergeno: ICreateAlergeno) => {
    const createdAlergeno = await alergenoService.createAlergeno(newAlergeno);
    setAlergenos([...alergenos, createdAlergeno]);
  };

  const handleUpdateAlergeno = async (id: number, updatedAlergeno: IUpdateAlergeno) => {
    const updated = await alergenoService.updateAlergeno(id, updatedAlergeno);
    setAlergenos(alergenos.map(alergeno => (alergeno.id === id ? updated : alergeno)));
  };

  const handleDeleteAlergeno = async (id: number) => {
    await alergenoService.deleteAlergenoById(id);
    setAlergenos(alergenos.filter(alergeno => alergeno.id !== id));
  };

  const toggleAddModal = () => setShowAddModal(!showAddModal);
  const toggleEditModal = (id: number) => {
    setEditingAlergenoId(id);
    setShowEditModal(!showEditModal);
  };

  return (
    <>
      <header className="header_alergenosTable">
        <div className="div_container_navbarAlergenos">
          {/* Pasando las propiedades necesarias al componente NavBarSide */}
          <NavBarSide isOpen={isOpen} toggleMenu={toggleMenu} />
          <h2 className="title_Product">Alergenos</h2>
          <Button variant="primary" className="add-product-btn" onClick={toggleAddModal}>
            Agregar Alergeno
          </Button>
        </div>
      </header>

      {/* Modales */}
      <AgregarAlergenoModal show={showAddModal} handleClose={toggleAddModal} handleAddAlergeno={handleAddAlergeno} />
      <EditarAlergenoModal 
        show={showEditModal} 
        handleClose={() => setShowEditModal(false)} 
        alergenoId={editingAlergenoId!} 
        handleUpdateAlergeno={handleUpdateAlergeno} 
      />

      {/* Tabla de alérgenos */}
      <div className={`container`}>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alergenos.map((alergeno) => (
              <tr key={alergeno.id}>
                <td>{alergeno.denominacion}</td>
                <td>
                  <Button variant="warning" onClick={() => toggleEditModal(alergeno.id)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteAlergeno(alergeno.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AlergenosTable;

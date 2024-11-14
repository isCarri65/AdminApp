import React, { useState } from "react";
import { NavBarSide } from "../navBarSide/NavBarSide";
import { Button } from "react-bootstrap";
import "./AlergenosTable.css";

// Definición de la interfaz para representar un alérgeno
interface Alergeno {
  id: number; // Identificador único del alérgeno
  nombre: string; // Nombre del alérgeno
}

// Definición del estado de la lista de alérgenos con un valor inicial
const AlergenosTable: React.FC = () => {
  const [alergenos, setAlergenos] = useState<Alergeno[]>([
    { id: 1, nombre: "Gluten" },
    { id: 2, nombre: "Lácteos" },
    { id: 3, nombre: "Frutos Secos" },
    { id: 4, nombre: "Mariscos" },
    { id: 5, nombre: "Huevo" },
    { id: 6, nombre: "Soja" },
    { id: 7, nombre: "Pescado" },
    { id: 8, nombre: "Cacahuetes" },
    { id: 9, nombre: "Apio" },
    { id: 10, nombre: "Mostaza" },
    // Puse estos alergenos como ejemplo
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newNombre, setNewNombre] = useState<string>("");
  const [newAlergenoNombre, setNewAlergenoNombre] = useState<string>("");

  // Función para manejar la edicion de un alergeno especifico
  const handleEdit = (id: number, nombre: string) => {
    setEditingId(id);
    setNewNombre(nombre);
  };

  // Función para manejar la eliminación de un alérgeno específico
  const handleDelete = (id: number) => {
    const updatedAlergenos = alergenos.filter((alergeno) => alergeno.id !== id);
    setAlergenos(updatedAlergenos);
  };

  const handleSave = (id: number) => {
    const updatedAlergenos = alergenos.map((alergeno) =>
      alergeno.id === id ? { ...alergeno, nombre: newNombre } : alergeno
    );
    setAlergenos(updatedAlergenos);
    setEditingId(null);
    setNewNombre("");
  };

  // Función para agregar un nuevo alérgeno a la lista
  const handleAddAlergeno = () => {
    if (newAlergenoNombre.trim() !== "") {
      const newAlergeno: Alergeno = {
        id: alergenos.length + 1,
        nombre: newAlergenoNombre,
      };
      setAlergenos([...alergenos, newAlergeno]);
      setNewAlergenoNombre("");
    }
  };
  /* Header Alergenos */
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <>
      <header className="header_alergenosTable">
        <div className="div_container_navbarAlergenos">
          <NavBarSide isOpen={isSideBarOpen} toggleMenu={toggleSideBar} />
          <h2 className="title_Product">Alergenos</h2>
          <Button variant="primary" className="add-product-btn" onClick={() => setOpenModal(true)}>
            Agregar Alergeno
          </Button>
        </div>
      </header>
      <div style={styles.container} className={`${isSideBarOpen ? "shifted" : ""}`}>
        <div style={styles.tableContainer}>
          <div style={styles.addContainer}>
            <input
              type="text"
              placeholder="Nuevo alérgeno"
              value={newAlergenoNombre}
              onChange={(e) => setNewAlergenoNombre(e.target.value)}
              style={styles.input}
            />
            <button style={styles.addButton} onClick={handleAddAlergeno}>
              Agregar
            </button>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.header}>Nombre</th>
                <th style={styles.header}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alergenos.map((alergeno) => (
                <tr key={alergeno.id} style={styles.row}>
                  <td style={styles.cell}>
                    {editingId === alergeno.id ? (
                      <input
                        type="text"
                        value={newNombre}
                        onChange={(e) => setNewNombre(e.target.value)}
                      />
                    ) : (
                      alergeno.nombre
                    )}
                  </td>
                  <td style={styles.cell}>
                    {editingId === alergeno.id ? (
                      <button style={styles.saveButton} onClick={() => handleSave(alergeno.id)}>
                        Guardar
                      </button>
                    ) : (
                      <>
                        <button
                          style={styles.editButton}
                          onClick={() => handleEdit(alergeno.id, alergeno.nombre)}
                        >
                          Editar
                        </button>
                        <button
                          style={styles.deleteButton}
                          onClick={() => handleDelete(alergeno.id)}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

//tabla de estilos

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "80%",
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    width: "100%",
    padding: "10px",
    marginTop: "auto",
    backgroundColor: "#444444",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "bold" as "bold",
    cursor: "pointer" as "pointer",
    textAlign: "center" as "center",
  },
  addContainer: {
    display: "flex",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "8px",
    marginRight: "10px",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "1px solid #ddd",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer" as "pointer",
  },
  tableContainer: {
    flex: 1,
    padding: "20px",
    overflowY: "auto" as "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as "collapse",
  },
  header: {
    padding: "12px",
    backgroundColor: "#f2f2f2",
    textAlign: "left" as "left",
    fontWeight: "bold" as "bold",
    borderBottom: "2px solid #ddd",
    color: "#333333",
  },
  row: {
    backgroundColor: "#ffffff",
  },
  cell: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    color: "#555555",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "5px 10px",
    marginRight: "5px",
    borderRadius: "3px",
    cursor: "pointer" as "pointer",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "3px",
    cursor: "pointer" as "pointer",
  },
  saveButton: {
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "3px",
    cursor: "pointer" as "pointer",
  },
};

export default AlergenosTable;

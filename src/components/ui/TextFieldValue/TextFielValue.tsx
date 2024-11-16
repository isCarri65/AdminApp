import { ErrorMessage, Field } from "formik";
// Importación del archivo de estilos CSS

// Interfaz para los props del componente TextFieldValue
interface props {
  label: string; // Etiqueta del campo
  name: string; // Nombre del campo
  type: string; // Tipo de campo (text, number, etc.)
  placeholder: string; // Placeholder del campo
}

// Componente TextFieldValue
const TextFieldValue = ({ label, name, type, placeholder }: props) => {
  // Componente para crear los input de un formulario con Formik
  return (
    <div className="mt-2" style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: ".3rem 0",
        }}
      >
        {/* Etiqueta del campo */}
        <label
          htmlFor={label}
          style={{
            color: "black",
            fontFamily: "Inter",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          {label}
        </label>
      </div>

      {/* Campo de entrada del formulario */}
      <Field
        className={`form-control  mb-3  input-formulario `}
        placeholder={placeholder}
        name={name}
        type={type}
        autoComplete="off"
        style={{
          border: "solid 1.6px #828690",
          borderRadius: "0.5px",
        }}
      />

      {/* Mensaje de error para el campo */}
      <ErrorMessage component="div" name={name} className="error" />
    </div>
  );
};

export default TextFieldValue; // Exportación del componente TextFieldValue

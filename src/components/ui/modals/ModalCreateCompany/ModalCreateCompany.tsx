import { Formik } from "formik";
import { FC} from "react";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/hooks";
import styles from "./ModalCreateCompany.module.css"
import { removeImageActivo } from "../../../../redux/slices/ImageReducer/ImageReducer";
import { ICreateEmpresaDto } from "../../../../types/dtos/empresa/ICreateEmpresaDto";
import { EmpresaService } from "../../../../service/EmpresaService";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import { IUpdateEmpresaDto } from "../../../../types/dtos/empresa/IUpdateEmpresaDto";
import { CompanyFormInputs } from "../../CompanyFormInputs/CompanyFormInputs";
import { removeEmpresaModalActiva } from "../../../../redux/slices/CompanySlices/EmpresaSlice";
interface IModalCreateCompany {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
  getEmpresas: () => void;
}

interface IinitialValues {
  nombre: string;
  razonSocial: string
  cuit: number;
  logo: string | null;
}

// Definición del componente ModalPersona
export const ModalCreateCompany: FC<IModalCreateCompany> = ({
  openModal,
  setOpenModal,
  getEmpresas,
}) => {
  const initialValues: IinitialValues = {
    nombre: "",
    razonSocial:"",
    cuit: 0,
    logo: null,

  };
  const empresaModalActiva = useAppSelector(
    (state) => state.empresa.empresaModalActiva
  );
  const dispatch = useAppDispatch();
  const empresaService = new EmpresaService();
  const imageActivo = useAppSelector((state)=>state.image.imageStringActivo)
  //const [empresaModalActiva, setEmpresaModalActiva] = useState<IEmpresa|null>(null)

  // Función para cerrar el modal
  const handleClose = () => {
    dispatch(removeImageActivo())
    dispatch(removeEmpresaModalActiva())
    setOpenModal(false);
  };

  /*
  useEffect(()=>{
    setEmpresaModalActiva(stateEmpresaModalActiva)
  }, [stateEmpresaModalActiva])
  */
  const crearInitialValues = (objOrigen: IEmpresa): IinitialValues => {
    const objDestino: IinitialValues = {
      nombre: objOrigen.nombre,
      razonSocial: objOrigen.razonSocial,
      cuit: objOrigen.cuit,
      logo: objOrigen.logo ? objOrigen.logo : null,
    };
    console.log(objOrigen.logo)
    return objDestino;
  };

  return (
    <div >
      {/* Componente Modal de React Bootstrap */}
      <Modal className={styles.modal}
        id={"modal"}
        show={openModal}
        onHide={handleClose}
        size={"lg"}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className={styles.modalHeader} closeButton>
          {/* Título del modal dependiendo de si se está editando o añadiendo una persona */}
          {empresaModalActiva ? (
            <Modal.Title className={`${styles.title} mx-auto`}>Editar Empresa</Modal.Title>
          ) : (
            <Modal.Title className={styles.title}>Crear Empresa</Modal.Title>
          )}
        </Modal.Header  >
        <Modal.Body  className={styles.modalBody}>
          {/* Componente Formik para el formulario */}
          <Formik
            validationSchema={Yup.object({
              nombre: Yup.string().required("Campo requerido"),
              razonSocial: Yup.string().required("Campo requerido"),
              cuit: Yup.string().required("Campo requerido"),
            })}
            initialValues={
              empresaModalActiva
                ? crearInitialValues(empresaModalActiva)
                : initialValues
            }
            enableReinitialize={false}
            onSubmit={async (values: IinitialValues) => {
              console.log("Ramirez");
                try {
                  if (empresaModalActiva) {
                    const updateEmpresa: IUpdateEmpresaDto = {
                      id: empresaModalActiva.id,
                      nombre: values.nombre,
                      razonSocial: values.razonSocial,
                      cuit: values.cuit,
                      logo: imageActivo,
                    };
                    const resultado = await empresaService.updateEmpresa(
                      empresaModalActiva.id,
                      updateEmpresa
                    );
                    console.log(resultado);
                  } else {
                    console.log("Crear Sucursal");
                    const empresaCreate: ICreateEmpresaDto = {
                      nombre: values.nombre,
                      razonSocial: values.razonSocial,
                      cuit: values.cuit,
                      logo: imageActivo,
                    };
                    await empresaService.createEmpresa(empresaCreate);
                  }
                  getEmpresas();
                  handleClose();
                } catch (error) {
                  console.error("Error al enviar los datos:", error);
                  // Podrías mostrar una notificación de error aquí si lo deseas
                }
            }}
          >
            {() => (
              <>
                {/* Formulario */}
                <CompanyFormInputs />
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

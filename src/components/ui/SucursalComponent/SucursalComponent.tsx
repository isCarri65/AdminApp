import { FC } from "react";
import { ModalCreateBranch } from "../../modals/ModalCreateBranch/ModalCreateBranch";
interface IPropsSucursal {
  name: string;
  cuit: string;
  reasonSocial: string;
  img: string;
}
export const SucursalComponent: FC<{ company: string }> = ({ company }) => {
  const sucursales: IPropsSucursal[] = [
    {
      name: "sucursal 1",
      cuit: "12-21283923-9",
      reasonSocial: "vender baterias de celulares",
      img: "/images/photo.img",
    },
    {
      name: "sucursal 2",
      cuit: "12-21283923-9",
      reasonSocial: "vender baterias de celulares",
      img: "/images/photo.img",
    },
    {
      name: "sucursal 3",
      cuit: "12-21283923-9",
      reasonSocial: "vender baterias de celulares",
      img: "/images/photo.img",
    },
    {
      name: "sucursal 4",
      cuit: "12-21283923-9",
      reasonSocial: "Ofrecer seguros de autos",
      img: "/images/photo.img",
    },
  ];
  return (
    <div style={{ backgroundColor: "#999", height: "100%", width:"100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Sucursales: {company}</h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          
        }}
      >
        {sucursales.map(({ name, cuit, reasonSocial, img }) => (
          <div style={{
            border:"solid 2px #222",
            padding:"1rem"
          }}>
            <div className="text-center">
              <h3>{name}</h3>
            </div>
            <div style={{
              display:"flex",
              justifyContent:"center",
              alignItems:"start",
              flexDirection:"column"
            }}>
              <p>Cuit: {cuit}</p>
              <p>Razón Social: {reasonSocial}</p>
              <p>Imagen: {img}</p>

            </div>
            <ModalCreateBranch />
          </div>
        ))}
      </div>
    </div>
  );
};

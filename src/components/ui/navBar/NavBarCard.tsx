import { Button, Card } from "react-bootstrap";
import { FC } from "react";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
interface IEmpresaCard {
  empresa: IEmpresa
}

export const NavBarCard: FC<IEmpresaCard> = ({empresa}) => {
  return (
    <Card style={{ width: "18rem" }}>

    </Card>
  );
};

//StyleComponents
import { Container, Content, ClosedSideBar, OpenSideBar } from "./styles";

//React icons
import { FaBars } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

interface NavBarSideProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const NavBarSide: React.FC<NavBarSideProps> = ({ isOpen, toggleMenu }) => {
  const { id } = useParams();
  const navigate = useNavigate()
  return (
    <Container>
      <Content>
        {!isOpen ? (
          <ClosedSideBar>
            <nav>
              <button onClick={toggleMenu}>
                <FaBars />
              </button>
            </nav>
          </ClosedSideBar>
        ) : (
          <OpenSideBar>
            <section>
              <nav>
                <span>
                  <button onClick={toggleMenu}>
                    <FaBars />
                  </button>
                </span>
                <div>
                  <h1>Sucursal 1</h1>
                </div>

                <ul>
                  <Link to={`/HomeSecundario/sucursal/categoria/${id}`} title="Categoria">
                    <p>Categoria</p>
                  </Link>
                  <Link to={`/HomeSecundario/sucursal/producto/${id}`} title="Producto">
                    <p>Productos</p>
                  </Link>
                  <Link to={`/HomeSecundario/sucursal/alergeno/${id}`} title="Alergenos">
                    <p>Alergenos </p>
                  </Link>
                </ul>
              </nav>
              <div>
                <ul>
                  <a onClick={()=> navigate(`/HomeSecundario/${id}`)}>
                    <p> Volver </p>
                  </a>
                </ul>
              </div>
            </section>
            {/* <aside onClick={handleChangeSideBar} /> */}
          </OpenSideBar>
        )}
      </Content>
    </Container>
  );
};

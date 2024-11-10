//StyleComponents
import { Container, Content, ClosedSideBar, OpenSideBar } from "./styles";

//React icons
import { FaBars } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface NavBarSideProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const NavBarSide: React.FC<NavBarSideProps> = ({ isOpen, toggleMenu }) => {
  const { id } = useParams();
  // const [sideBar, setSideBar] = useState(false);

  // function handleChangeSideBar() {
  //   setSideBar((prevState) => !prevState);
  // }
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
                  <a href={`HomeSecundario/sucursal/categoria/${id}`} title="Categoria">
                    <p>Categoria</p>
                  </a>
                  <a href={`HomeSecundario/sucursal/producto/${id}`} title="Producto">
                    <p>Productos</p>
                  </a>
                  <a href={`HomeSecundario/sucursal/alergenos/${id}`} title="Alergenos">
                    <p>Alergenos </p>
                  </a>
                </ul>
              </nav>
              <div>
                <ul>
                  <a href={`HomeSecundario/${id}`}>
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

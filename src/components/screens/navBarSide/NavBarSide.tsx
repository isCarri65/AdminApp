import { useState } from "react";

//StyleComponents
import { Container, Content, ClosedSideBar, OpenSideBar } from "./styles";

//React icons
import { FaBars } from "react-icons/fa";

export function NavBarSide() {
  const [sideBar, setSideBar] = useState(false);

  function handleChangeSideBar() {
    setSideBar((prevState) => !prevState);
  }
  return (
    <Container>
      <Content>
        {!sideBar ? (
          <ClosedSideBar>
            <nav>
              <button onClick={handleChangeSideBar}>
                <FaBars />
              </button>
            </nav>
          </ClosedSideBar>
        ) : (
          <OpenSideBar>
            <section>
              <nav>
                <span>
                  <button onClick={handleChangeSideBar}>
                    <FaBars />
                  </button>
                </span>
                <div>
                  <h1>Sucursal 1</h1>
                </div>

                <ul>
                  <a href="/" title="Alguma coisa">
                    <p>Categoria</p>
                  </a>
                  <a href="/" title="Alguma coisa">
                    <p>Productos</p>
                  </a>
                  <a href="/" title="Alguma coisa">
                    <p>Alergenos </p>
                  </a>
                </ul>
              </nav>
              <div>
                <ul>
                  <a href="/">
                    <p> Volver </p>
                  </a>
                </ul>
              </div>
            </section>
            <aside onClick={handleChangeSideBar} />
          </OpenSideBar>
        )}
      </Content>
    </Container>
  );
}

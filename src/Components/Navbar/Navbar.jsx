import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarComponent() {
  return (
    <>
      <Navbar className="d-flex justify-content-between align-items-center navbarBackGroundColour">
        <div>
          <Navbar.Brand href="#home" className="textColourWhite ms-4">
            New Feed Extractor
          </Navbar.Brand>
        </div>
        <div>
          <Nav className="me-3">
            <Nav.Link href="#home" className="textColourWhite">
              Home
            </Nav.Link>
            <Nav.Link href="#configure" className="textColourWhite">
              configure URLs and Keywords
            </Nav.Link>
            <Nav.Link href="#logs" className="textColourWhite">
              Logs
            </Nav.Link>
          </Nav>
        </div>
      </Navbar>
    </>
  );
}

export default NavbarComponent;

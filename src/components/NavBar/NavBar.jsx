import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Persistence</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/adherents">Adherents</Nav.Link>
            <Nav.Link href="/auteur">Auteur</Nav.Link>
            <Nav.Link href="/categorie">Categorie</Nav.Link>
            <Nav.Link href="/emprunt">Emprunt</Nav.Link>
            <Nav.Link href="/livre">Livre</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;

import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Bibliotheque } from "../api/bibliotheque";
import { format } from "date-fns";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Livre = () => {
  const [books, setBooks] = useState();
  const navigation = useNavigate();

  async function getAllBooks() {
    const result = await Bibliotheque.getAllBooks();
    if (result.length > 0) {
      console.log(result);
      setBooks(result);
    }
  }

  useEffect(() => {
    getAllBooks();
  }, []);

  const handleDelete = async (livre) => {
    const currentBook = livre;
    currentBook.flag = 1;
    await Bibliotheque.updateBookById(currentBook);
    getAllBooks();
  };

  return (
    <div className="container mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Titre du livre</th>
            <th>Categorie</th>
            <th>Nombre pages</th>
            <th>Auteur</th>
            <th>Date de parution</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.nom}</td>
                <td>{book.categorie.nom}</td>
                <td>{book.nombre_de_pages}</td>
                <td>
                  {book.auteur.prenom} {book.auteur.nom}
                </td>
                <td>
                  {format(new Date(book.date_de_parution), "dd MMM yyyy")}
                </td>
                <td>
                  {/* <Button
                    variant="primary"
                    className="mx-3"
                    onClick={() => handleUpdate(categorie.id)}
                  >
                    Modifier
                  </Button> */}
                  <Button onClick={() => handleDelete(book)} variant="danger">
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan={7}>
              <Button
                onClick={() => navigation("/livre/new")}
                variant="primary"
              >
                Ajouter un livre
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Livre;

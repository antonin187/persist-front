import { useEffect, useState } from "react";
import { Bibliotheque } from "../api/bibliotheque";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Categorie = () => {
  const [categorie, setCategorie] = useState();
  const navigation = useNavigate();

  async function GetAllCategories() {
    const result = await Bibliotheque.getAllNoFlagCategories();
    setCategorie(result);
  }

  useEffect(() => {
    GetAllCategories();
  }, []);

  const handleDelete = async (categorie) => {
    await Bibliotheque.deleteCategorieById(categorie);
    GetAllCategories();
  };

  const handleUpdate = async (idCategorie) => {
    navigation(`/categorie/${idCategorie}`);
  };

  return (
    <div className="container mt-4">
      <h1>Categorie</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>nom</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {categorie &&
            categorie.map((categorie) => (
              <tr key={categorie.id}>
                <td>{categorie.nom}</td>
                <td>
                  <Button
                    variant="primary"
                    className="mx-3"
                    onClick={() => handleUpdate(categorie.id)}
                  >
                    Modifier
                  </Button>
                  <Button
                    onClick={() => handleDelete(categorie)}
                    variant="danger"
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan={6}>
              <Button
                onClick={() => navigation("/categorie/new")}
                variant="primary"
              >
                Ajouter une categorie
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Categorie;

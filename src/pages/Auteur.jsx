import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bibliotheque } from "../api/bibliotheque";
import { Button, Table } from "react-bootstrap";

const Auteur = () => {
  const [auteursList, setAuteursList] = useState();
  const navigation = useNavigate();

  async function getAllAuteurs() {
    const result = await Bibliotheque.getAllAuteurs();
    if (result.length > 0) {
      setAuteursList(result);
    }
  }

  useEffect(() => {
    getAllAuteurs();
  }, []);

  const handleDelete = async (auteur) => {
    await Bibliotheque.deleteAuteurById(auteur.id);
  };

  const handleUpdate = async (auteur) => {
    navigation(`/auteur/${auteur.id}`);
  };

  return (
    <div className="container mt-4">
      <h1>Auteur</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
          </tr>
        </thead>
        <tbody>
          {auteursList &&
            auteursList.map((auteur) => (
              <tr key={auteur.id}>
                <td>{auteur.nom}</td>
                <td>{auteur.prenom}</td>
                <td colSpan={2}>
                  <Button
                    variant="primary"
                    className="mx-3"
                    onClick={() => handleUpdate(auteur)}
                  >
                    Modifier
                  </Button>
                  <Button onClick={() => handleDelete(auteur)} variant="danger">
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan={6}>
              <Button
                onClick={() => navigation("/auteur/new")}
                variant="primary"
              >
                Ajouter un auteur
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Auteur;

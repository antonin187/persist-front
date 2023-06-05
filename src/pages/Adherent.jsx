import { useEffect, useState } from "react";
import { Bibliotheque } from "../api/bibliotheque";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

const Adherent = () => {
  const [adherents, setAdherents] = useState();
  const navigation = useNavigate();

  async function getAllAdherents() {
    const result = await Bibliotheque.getAllAdherents();
    if (result.length > 0) {
      setAdherents(result);
    }
  }

  useEffect(() => {
    getAllAdherents();
  }, []);

  const handleDelete = async (adherent) => {
    await Bibliotheque.deleteAdherentById(adherent.id);
  };

  const handleUpdate = async (adherent) => {
    navigation(`/adherent/${adherent.id}`);
  };

  return (
    <div className="container mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            <th>Date d'inscription</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {adherents &&
            adherents.map((adherent) => (
              <tr key={adherent.id}>
                <td>{adherent.nom}</td>
                <td>{adherent.prenom}</td>
                <td>{adherent.email}</td>
                <td>
                  {format(new Date(adherent.date_inscription), "dd MMM yyyy")}
                </td>
                <td>
                  <Button
                    variant="primary"
                    className="mx-3"
                    onClick={() => handleUpdate(adherent)}
                  >
                    Modifier
                  </Button>
                  <Button
                    onClick={() => handleDelete(adherent)}
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
                onClick={() => navigation("/adherent/new")}
                variant="primary"
              >
                Ajouter un utilisateur
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Adherent;

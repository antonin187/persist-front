import { useEffect, useState } from "react";
import { Bibliotheque } from "../api/bibliotheque";
import { Button, Table } from "react-bootstrap";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Emprunt = () => {
  const [emprunts, setEmprunts] = useState();

  const navigation = useNavigate();

  async function GetAllEmprunts() {
    const result = await Bibliotheque.getAllEmprunts();
    setEmprunts(result);
    console.log(result);
  }

  useEffect(() => {
    GetAllEmprunts();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Emprunt</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Adhérent</th>
            <th>Date d'emprunt</th>
            <th>Date prévisionnelle de retour</th>
            <th>Date de retour effective</th>
            <th>Livres empruntés</th>
          </tr>
        </thead>
        <tbody>
          {emprunts &&
            emprunts.map((emprunt) => (
              <tr key={emprunt.id}>
                <td>
                  {emprunt.adherent.nom} {emprunt.adherent.prenom}
                </td>
                <td>{format(new Date(emprunt.date_emprunt), "dd MMM yyyy")}</td>
                <td>
                  {format(new Date(emprunt.date_fin_prevue), "dd MMM yyyy")}
                </td>
                <td>{format(new Date(emprunt.date_retour), "dd MMM yyyy")}</td>
                <td>
                  <ul>
                    {emprunt.livre.map((livre) => (
                      <li key={livre.id}>{livre.nom}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan={6}>
              <Button
                onClick={() => navigation("/emprunt/new")}
                variant="primary"
              >
                Créer un nouvel emprunt
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Emprunt;

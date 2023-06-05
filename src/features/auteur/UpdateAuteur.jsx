import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bibliotheque } from "../../api/bibliotheque";
import { Button } from "react-bootstrap";

const UpdateAuteur = () => {
  const [auteur, setAuteur] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  async function GetAuteurById(idAuteur) {
    const result = await Bibliotheque.findAuteurById(idAuteur);
    setAuteur(result);
  }

  useEffect(() => {
    GetAuteurById(id);
  }, [id]);

  const handleClick = async () => {
    await Bibliotheque.updateAuteurById(auteur);
    navigate("/auteur");
  };

  return (
    <div className="container mt-4">
      {auteur && (
        <>
          <input
            type="text"
            value={auteur.nom}
            onChange={(e) => setAuteur({ ...auteur, nom: e.target.value })}
          />
          <input
            type="text"
            value={auteur.prenom}
            onChange={(e) => setAuteur({ ...auteur, prenom: e.target.value })}
          />
        </>
      )}
      <Button className="mx-2" onClick={handleClick} variant="primary">
        Valider
      </Button>
    </div>
  );
};

export default UpdateAuteur;

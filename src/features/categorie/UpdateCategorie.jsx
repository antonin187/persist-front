import { useNavigate, useParams } from "react-router-dom";
import { Bibliotheque } from "../../api/bibliotheque";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const UpdateCategorie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ========== State ===========
  const [categorie, setCategorie] = useState();

  useEffect(() => {
    GetCategorieById(id);
  }, [id]);

  async function GetCategorieById(idCategorie) {
    const result = await Bibliotheque.findCategorieById(idCategorie);
    setCategorie(result);
  }

  const handleClick = async () => {
    await Bibliotheque.updateCategorieById(categorie);
    navigate("/categorie");
  };

  return (
    <div className="container mt-4">
      {categorie && (
        <input
          type="text"
          value={categorie.nom}
          onChange={(e) => setCategorie({ ...categorie, nom: e.target.value })}
        />
      )}
      <Button className="mx-2" onClick={handleClick} variant="primary">
        Valider
      </Button>
    </div>
  );
};

export default UpdateCategorie;

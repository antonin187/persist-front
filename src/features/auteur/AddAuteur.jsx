import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bibliotheque } from "../../api/bibliotheque";

const AddAuteur = () => {
  const [auteur, setAuteur] = useState({
    nom: "",
    prenom: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setAuteur((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Bibliotheque.addAuteur(auteur);
    navigate("/auteur");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>Ajouter un auteur</h1>
      <label>Nom:</label>
      <input
        required
        type="text"
        value={auteur.nom}
        name="nom"
        onChange={(e) => handleChange(e)}
      />
      <label>Prenom:</label>
      <input
        required
        type="text"
        value={auteur.prenom}
        name="prenom"
        onChange={(e) => handleChange(e)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddAuteur;

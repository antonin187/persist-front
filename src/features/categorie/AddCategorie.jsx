import { useState } from "react";
import { Bibliotheque } from "../../api/bibliotheque";
import { useNavigate } from "react-router-dom";

const AddCategorie = () => {
  const navigation = useNavigate();
  const [categorie, setCategorie] = useState({
    nom: "",
    flag: false
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setCategorie({
      nom: value,
      flag: false
    });
  };

  async function AddNewCategorie(nouvelleCategorie) {
    await Bibliotheque.addCategorie(nouvelleCategorie);
    navigation("/categorie");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    AddNewCategorie(categorie);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Catégorie:</label>
      <input type="text" value={categorie.nom} onChange={handleChange} />

      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddCategorie;

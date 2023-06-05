import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Bibliotheque } from "../../api/bibliotheque";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();
  const [listeAutheurs, setListeAutheurs] = useState();
  const [listeCategories, setListeCategories] = useState();
  const [currentAuteurID, setCurrentAuteurID] = useState(-1);
  const [currentCategorieID, setCurrentCategorieID] = useState(-1);

  const [book, setBook] = useState({
    date_de_parution: "",
    nombre_de_pages: "",
    auteur: {
      id: 1,
      nom: "",
      prenom: "",
    },
    categorie: {
      id: 1,
      nom: "",
      categorie: false
    },
    nom: "",
  });

  async function getAuteurs() {
    const result = await Bibliotheque.getAllAuteurs();
    setListeAutheurs(result);
  }

  async function getCategories() {
    const result = await Bibliotheque.getAllNoFlagCategories();
    setListeCategories(result);
  }
  useEffect(() => {
    getAuteurs();
    getCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const fieldNames = name.split(".");

    if (fieldNames.length === 1) {
      setBook((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (fieldNames.length === 2) {
      const [parentField, childField] = fieldNames;
      setBook((prevState) => ({
        ...prevState,
        [parentField]: {
          ...prevState[parentField],
          [childField]: value,
        },
      }));
    }
  };

  const handleDateChange = (date) => {
    setBook((prevState) => ({
      ...prevState,
      date_de_parution: date,
    }));
  };

  async function AddBook(livre) {
    await Bibliotheque.addBook(livre);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auteur = await Bibliotheque.findAuteurById(currentAuteurID);
    const categorie = await Bibliotheque.findCategorieById(currentCategorieID);

    const newBook = {
      ...book,
      auteur: auteur,
      categorie: categorie,
    };
    setBook(newBook);

    AddBook(newBook);
    navigate("/livre");
  };

  const onChangeAuteur = (e) => {
    setCurrentAuteurID(e.target.value);
  };

  const onChangeCategorie = (e) => {
    setCurrentCategorieID(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date de parution:</label>
      <DatePicker
        selected={book.date_de_parution}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        required
      />

      <label>Nombre de pages:</label>
      <input
        type="text"
        name="nombre_de_pages"
        value={book.nombre_de_pages}
        onChange={handleChange}
        required
      />

      <label>Nom de l'auteur:</label>
      <select onChange={onChangeAuteur}>
        <option value={-1}>Selectionner une valeur</option>
        {listeAutheurs &&
          listeAutheurs.map((auteur) => (
            <option value={auteur.id} key={auteur.id}>
              {auteur.nom} {auteur.prenom}
            </option>
          ))}
      </select>

      <label>Catégorie:</label>
      <select onChange={onChangeCategorie}>
        <option value={-1}>Selectionner une valeur</option>
        {listeCategories &&
          listeCategories.map((categorie) => (
            <option value={categorie.id} key={categorie.id}>
              {categorie.nom}
            </option>
          ))}
      </select>

      <label>Nom du livre:</label>
      <input
        type="text"
        name="nom"
        value={book.nom}
        onChange={handleChange}
        required
      />

      {currentAuteurID > -1 && currentCategorieID > -1 && (
        <button type="submit">Ajouter le livre</button>
      )}
    </form>
  );
};

export default AddBook;

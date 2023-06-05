import { useState } from "react";
import DatePicker from "react-datepicker";
import { Bibliotheque } from "../../api/bibliotheque";
import { useNavigate } from "react-router-dom";

const AddAdherent = () => {
  const navigate = useNavigate();
  const [adherent, setAdherent] = useState({
    nom: "",
    prenom: "",
    email: "",
    date_inscription: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setAdherent((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setAdherent((prevState) => ({
      ...prevState,
      date_inscription: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Bibliotheque.addAdherent(adherent);
    navigate("/adherents");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>Nom:</label>
      <input
        required
        type="text"
        value={adherent.nom}
        name="nom"
        onChange={(e) => handleChange(e)}
      />
      <label>Prenom:</label>
      <input
        required
        type="text"
        value={adherent.prenom}
        name="prenom"
        onChange={(e) => handleChange(e)}
      />
      <label>Email:</label>
      <input
        required
        type="text"
        value={adherent.email}
        name="email"
        onChange={(e) => handleChange(e)}
      />
      <label>Date d'inscription:</label>
      <DatePicker
        selected={adherent.date_inscription}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddAdherent;

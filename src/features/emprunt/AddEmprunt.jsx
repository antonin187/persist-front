import { useEffect, useState } from "react";
import { Bibliotheque } from "../../api/bibliotheque";
import { useNavigate } from "react-router-dom";

const AddEmprunt = () => {
  const [emprunt, setEmprunt] = useState({
    date_emprunt: "",
    date_fin_prevue: "",
    date_retour: "",
    adherent: {},
    livre: [],
  });

  const [adherents, setListeAdherents] = useState();
  const [books, setListeBooks] = useState();
  const [currentBookId, setCurrentBookId] = useState(-1);
  const [currentAdherentId, setCurrentAdherentId] = useState(-1);

  const navigate = useNavigate();

  async function GetAllAdherents() {
    const result = await Bibliotheque.getAllAdherents();
    setListeAdherents(result);
  }

  async function GetAllBooks() {
    const result = await Bibliotheque.getAllBooks();
    setListeBooks(result);
  }

  useEffect(() => {
    GetAllAdherents();
    GetAllBooks();
  }, []);

  const addEmprunt = async (emprunt) => {
    const result = await Bibliotheque.addEmprunt(emprunt);
    console.log(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [currentBook, currentAdherent] = await Promise.all([
      Bibliotheque.findBookById(currentBookId),
      Bibliotheque.findAdherentById(currentAdherentId),
    ]);

    console.log(currentBook, currentAdherent);

    const newEmprunt = {
      ...emprunt,
      adherent: currentAdherent,
      livre: [currentBook],
    };

    setEmprunt(newEmprunt);

    addEmprunt(newEmprunt);
    navigate("/emprunt");
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onSubmit={(e) => handleSubmit(e)}
    >
      <label style={{ marginTop: "15px" }}>Identité de l'adherent</label>
      <select required onChange={(e) => setCurrentAdherentId(e.target.value)}>
        <option value={-1}>Selectionner une valeur</option>
        {adherents &&
          adherents.map((adherent) => (
            <option value={adherent.id} key={adherent.id}>
              {adherent.nom} {adherent.prenom}
            </option>
          ))}
      </select>
      <label style={{ marginTop: "15px" }}>Livre</label>
      <select required onChange={(e) => setCurrentBookId(e.target.value)}>
        <option value={-1}>Selectionner une valeur</option>
        {books &&
          books.map((book) => (
            <option value={book.id} key={book.id}>
              {book.nom}
            </option>
          ))}
      </select>

      <label style={{ marginTop: "15px" }}>Date d'emprunt</label>
      <input
        required
        onChange={(e) =>
          setEmprunt((previousState) => ({
            ...previousState,
            date_emprunt: e.target.value,
          }))
        }
        type="date"
      />
      <label style={{ marginTop: "15px" }}>Date de fin prévue</label>
      <input
        required
        onChange={(e) =>
          setEmprunt((previousState) => ({
            ...previousState,
            date_fin_prevue: e.target.value,
          }))
        }
        type="date"
      />
      <label style={{ marginTop: "15px" }}>Date de retour</label>
      <input
        required
        onChange={(e) =>
          setEmprunt((previousState) => ({
            ...previousState,
            date_retour: e.target.value,
          }))
        }
        type="date"
      />

      {currentAdherentId > -1 && currentBookId > -1 && (
        <button type="submit">Ajouter</button>
      )}
    </form>
  );
};

export default AddEmprunt;

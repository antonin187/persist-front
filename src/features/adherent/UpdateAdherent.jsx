import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bibliotheque } from "../../api/bibliotheque";
import { Button } from "react-bootstrap";
import { format } from "date-fns";

const UpdateAdherent = () => {
  const [adherent, setAdherent] = useState();
  const navigate = useNavigate();

  const { id } = useParams();

  async function FindAdherentById(idAdherent) {
    const result = await Bibliotheque.findAdherentById(idAdherent);
    setAdherent(result);
  }

  useEffect(() => {
    FindAdherentById(id);
  }, [id]);

  const handleClick = async () => {
    await Bibliotheque.updateAdherentById (adherent);
    navigate("/adherents");
  };

  return (
    <div className="container mt-4">
      {adherent && (
        <>
          <input
            type="text"
            value={adherent.nom}
            onChange={(e) => setAdherent({ ...adherent, nom: e.target.value })}
          />
          <input
            type="text"
            value={adherent.prenom}
            onChange={(e) =>
              setAdherent({ ...adherent, prenom: e.target.value })
            }
          />
          <input
            type="text"
            value={adherent.email}
            onChange={(e) =>
              setAdherent({ ...adherent, email: e.target.value })
            }
          />
          <input
            type="date"
            value={format(new Date(adherent.date_inscription), "yyyy-MM-dd")}
            onChange={(e) =>
              setAdherent({ ...adherent, date_inscription: e.target.value })
            }
          />
        </>
      )}
      <Button className="mx-2" onClick={handleClick} variant="primary">
        Valider
      </Button>
    </div>
  );
};

export default UpdateAdherent;

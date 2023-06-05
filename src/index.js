import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Adherent from "./pages/Adherent";
import Auteur from "./pages/Auteur";
import Categorie from "./pages/Categorie";
import Emprunt from "./pages/Emprunt";
import Livre from "./pages/Livre";
import AddBook from "./features/livre/AddBook";
import AddCategorie from "./features/categorie/AddCategorie";
import App from "./App";
import UpdateCategorie from "./features/categorie/UpdateCategorie";
import AddAdherent from "./features/adherent/AddAdherent";
import UpdateAdherent from "./features/adherent/UpdateAdherent";
import AddAuteur from "./features/auteur/AddAuteur";
import UpdateAuteur from "./features/auteur/UpdateAuteur";
import AddEmprunt from "./features/emprunt/AddEmprunt";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/adherents" element={<Adherent />} />
        <Route path="/adherent/new" element={<AddAdherent />} />
        <Route path="/adherent/:id" element={<UpdateAdherent />} />
        <Route path="/auteur" element={<Auteur />} />
        <Route path="/auteur/:id" element={<UpdateAuteur />} />
        <Route path="/auteur/new" element={<AddAuteur />} />
        <Route path="/categorie" element={<Categorie />} />
        <Route path="/categorie/new" element={<AddCategorie />} />
        <Route path="/categorie/:id" element={<UpdateCategorie />} />
        <Route path="/emprunt" element={<Emprunt />} />
        <Route path="/emprunt/new" element={<AddEmprunt />} />
        <Route path="/livre" element={<Livre />} />
        <Route path="/livre/new" element={<AddBook />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

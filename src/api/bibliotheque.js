import axios from "axios";
import { BASE_URL } from "../config";

export class Bibliotheque {
  // ================== LIVRES ====================
  static async getAllBooks() {
    const response = await axios.get(`${BASE_URL}/livres/noflag`);
    return response.data;
  }

  static async getAllBooksFlag() {
    const result = await axios.get(`${BASE_URL}/livres/flag`);
    return result.data;
  }

  static async addBook(book) {
    const response = await axios.post(`${BASE_URL}/livre`, book);
    return response.data;
  }

  static async findBookById(idBook) {
    const response = await axios.get(`${BASE_URL}/livre?id=${idBook}`);
    return response.data;
  }

  static async updateBookById(book) {
    const response = await axios.patch(`${BASE_URL}/livre`, book);
    return response.data;
  }

  static async deleteBookById(idBook) {
    await axios.delete(`${BASE_URL}/livre?id=${idBook}`);
  }

  // ================== Adherent ===============

  static async getAllAdherents() {
    const response = await axios.get(`${BASE_URL}/adherents`);
    return response.data;
  }

  static async addAdherent(adherent) {
    const response = await axios.post(`${BASE_URL}/adherent`, adherent);
    return response.data;
  }

  static async findAdherentById(idAdherent) {
    const response = await axios.get(`${BASE_URL}/adherent?id=${idAdherent}`);
    return response.data;
  }

  static async updateAdherentById(adherent) {
    const response = await axios.patch(`${BASE_URL}/adherent`, adherent);
    return response.data;
  }

  static async deleteAdherentById(idAdherent) {
    await axios.delete(`${BASE_URL}/adherent?id=${idAdherent}`);
  }

  // ================ AUTEUR ==============

  static async getAllAuteurs() {
    const response = await axios.get(`${BASE_URL}/auteurs`);
    return response.data;
  }

  static async addAuteur(auteur) {
    const response = await axios.post(`${BASE_URL}/auteur`, auteur);
    return response.data;
  }

  static async findAuteurById(idAuteur) {
    const response = await axios.get(`${BASE_URL}/auteur?id=${idAuteur}`);
    return response.data;
  }

  static async updateAuteurById(auteur) {
    const response = await axios.patch(`${BASE_URL}/auteur`, auteur);
    return response.data;
  }

  static async deleteAuteurById(idAuteur) {
    await axios.delete(`${BASE_URL}/auteur?id=${idAuteur}`);
  }

  // ================ CATEGORIE ==============

  static async getAllCategories() {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  }

  static async getAllNoFlagCategories() {
    const response = await axios.get(`${BASE_URL}/categories/noflag`);
    return response.data;
  }

  static async addCategorie(categorie) {
    const response = await axios.post(`${BASE_URL}/categorie`, categorie);
    return response.data;
  }

  static async findCategorieById(idCategorie) {
    const response = await axios.get(`${BASE_URL}/categorie?id=${idCategorie}`);
    return response.data;
  }

  static async updateCategorieById(categorie) {
    const response = await axios.patch(`${BASE_URL}/categorie`, categorie);
    return response.data;
  }

  // static async deleteCategorieById(idCategorie) {
  //   await axios.delete(`${BASE_URL}/categorie?id=${idCategorie}`);
  // }

  static async deleteCategorieById(categorie) {
    await axios.patch(`${BASE_URL}/categorie/delete`, categorie);
  }

  // ================ EMPRUNT ==============

  static async getAllEmprunts() {
    const response = await axios.get(`${BASE_URL}/emprunts`);
    return response.data;
  }

  static async addEmprunt(emprunt) {
    const response = await axios.post(`${BASE_URL}/emprunt`, emprunt);
    return response.data;
  }

  static async findEmpruntById(idEmprunt) {
    const response = await axios.get(`${BASE_URL}/emprunt?id=${idEmprunt}`);
    return response.data;
  }

  static async updateEmpruntById(emprunt) {
    const response = await axios.patch(`${BASE_URL}/emprunt`, emprunt);
    return response.data;
  }

  static async deleteEmpruntById(idEmprunt) {
    await axios.delete(`${BASE_URL}/emprunt?id=${idEmprunt}`);
  }
}

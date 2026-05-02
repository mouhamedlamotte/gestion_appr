const ApprovRepo = require('../repositories/approv.repository');
const ProduitService = require('./produit.service');
const FournisseurService = require('./fournisseur.service');

const getAll = () => ApprovRepo.findAll();

const getById = async (id) => {
  const approv = await ApprovRepo.findById(id);
  if (!approv) throw { status: 404, message: 'Approvisionnement introuvable' };
  return approv;
};

const create = async (data) => {
  await FournisseurService.getById(data.fournisseurId);
  const prod = await ProduitService.getById(data.produitId);
  const approv = await ApprovRepo.create(data);
  await ProduitService.updateQuantite(data.produitId, prod.quantite + data.quantite);
  return approv;
};

const update = async (id, data) => {
  const approv = await getById(id);
  await FournisseurService.getById(data.fournisseurId);
  const prod = await ProduitService.getById(data.produitId);
  // Retire l'ancienne quantité et ajoute la nouvelle
  const newQuantite = prod.quantite - approv.quantite + data.quantite;
  await ProduitService.updateQuantite(data.produitId, newQuantite);
  return ApprovRepo.update(id, data);
};

const remove = async (id) => {
  const approv = await getById(id);
  const prod = await ProduitService.getById(approv.produitId);
  await ProduitService.updateQuantite(approv.produitId, prod.quantite - approv.quantite);
  return ApprovRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };

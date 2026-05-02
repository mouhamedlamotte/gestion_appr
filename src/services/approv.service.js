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
  const existing = await FournisseurService.getById(data.fournisseurId);

  
  if (!existing) throw { status: 404, message: 'Fournisseur introuvable' };
  const prod = await ProduitService.getById(data.produitId);
  if (!prod) throw { status: 404, message: 'Produit introuvable' };
  const approv = await ApprovRepo.create(data);
  const newQuantite = prod.quantite + data.quantite;
  await ProduitService.updateQuantite(data.produitId, newQuantite);
  return approv;
};

const update = async (id, data) => {
  await getById(id);
  const existing = await FournisseurService.getById(data.fournisseurId);
  if (!existing) throw { status: 404, message: 'Fournisseur introuvable' };
  const prod = await ProduitService.getById(data.produitId);
  if (!prod) throw { status: 404, message: 'Produit introuvable' };
  const previousQuantite = existing.quantite;
  const productQunatiteToremove = prod - previousQuantite;
  const prodToDate = await ProduitService.updateQuantite(data.produitId, productQunatiteToremove);
  const newQuantity = prodToDate.quantite + data.quantite;
  await ProduitService.updateQuantite(data.produitId, newQuantity);
  return ApprovRepo.update(id, data);
};

const remove = async (id) => {
  const approv = await getById(id);
  return ApprovRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };

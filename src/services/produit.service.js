const ProductRepo = require('../repositories/produit.repository');

const getAll = () => ProductRepo.findAll();

const getById = async (id) => {
  const produit = await ProductRepo.findById(id);
  if (!produit) throw { status: 404, message: 'Produit introuvable' };
  return produit;
};

const create = async (data) => {
  return ProductRepo.create(data);
};

const update = async (id, data) => {
  await getById(id);
  return ProductRepo.update(id, data);
};

const remove = async (id) => {
  await getById(id);
  return ProductRepo.remove(id);
};

const increment = async (id) => {
  await getById(id);
  return ProductRepo.increment(id);
};

const decrement = async (id) => {
  await getById(id);
  return ProductRepo.decrement(id);
};

const updateQuantite = async (id, quantite) => {
  await getById(id);
  return ProductRepo.updateQuantite(id, quantite);
}

const haveStock = async (id, quantite) => {
  const produit = await getById(id);
  return produit.quantite >= quantite;
}


module.exports = { getAll, getById, create, update, remove, increment, decrement, updateQuantite, haveStock };

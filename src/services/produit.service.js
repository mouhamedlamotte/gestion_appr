const ProductRepo = require('../repositories/produit.repository');
const CloudinaryService = require('./cloudinary.service');

const getAll = () => ProductRepo.findAll();

const getById = async (id) => {
  const produit = await ProductRepo.findById(id);
  if (!produit) throw { status: 404, message: 'Produit introuvable' };
  return produit;
};

const create = async (data, file) => {
  if (file) {
    const { public_id } = await CloudinaryService.uploadImage(file.buffer, 'produits');
    data.image = public_id;
  }
  return ProductRepo.create(data);
};

const update = async (id, data, file) => {
  const produit = await getById(id);
  if (file) {
    if (produit.image) await CloudinaryService.deleteImage(produit.image);
    const { public_id } = await CloudinaryService.uploadImage(file.buffer, 'produits');
    data.image = public_id;
  }
  return ProductRepo.update(id, data);
};

const remove = async (id) => {
  const produit = await getById(id);
  if (produit.image) await CloudinaryService.deleteImage(produit.image);
  return ProductRepo.remove(id);
};

const getImageUrl = async (id) => {
  const produit = await getById(id);
  if (!produit.image) throw { status: 404, message: 'Aucune image pour ce produit' };
  return CloudinaryService.getImageUrl(produit.image);
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


module.exports = { getAll, getById, create, update, remove, increment, decrement, updateQuantite, haveStock, getImageUrl };

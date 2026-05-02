const fournisseur = require('../repositories/forunisseur.repository');

const getAll = () => fournisseur.findAll();

const getById = async (id) => {
  const fournisseurData = await fournisseur.findById(id);
  if (!fournisseurData) throw { status: 404, message: 'Fournisseur introuvable' };
  return fournisseurData;
};

const create = async (data) => {
  const existing = await fournisseur.findByEmail(data.email);
  if (existing) throw { status: 409, message: `L'email "${data.email}" est déjà utilisé` };
  return fournisseur.create(data);
};

const update = async (id, data) => {
  await getById(id);
  if (data.email) {
    const existing = await fournisseur.findByEmail(data.email);
    if (existing && existing.id !== id) throw { status: 409, message: `L'email "${data.email}" est déjà utilisé` };
  }
  return fournisseur.update(id, data);
};

const remove = async (id) => {
  await getById(id);
  // const hasRes = await clientRepo.hasReservations(id);
  // if (hasRes) throw { status: 400, message: 'Impossible de supprimer un client ayant des réservations' };
  return fournisseur.remove(id);
};

module.exports = { getAll, getById, create, update, remove };

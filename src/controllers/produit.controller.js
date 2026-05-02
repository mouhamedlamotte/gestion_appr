const ProduitService = require('../services/produit.service');

const getAll = async (req, res, next) => {
  try {
    const data = await ProduitService.getAll();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const data = await ProduitService.getById(Number(req.params.id));
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const data = await ProduitService.create(req.body);
    res.status(201).json({ success: true, message: 'Produit créé avec succès', data });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const data = await ProduitService.update(Number(req.params.id), req.body);
    res.json({ success: true, message: 'Produit mis à jour', data });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await ProduitService.remove(Number(req.params.id));
    res.json({ success: true, message: 'Produit supprimé avec succès' });
  } catch (err) { next(err); }
};

const increment = async (req, res, next) => {
  try {
    const data = await ProduitService.increment(Number(req.params.id));
    res.json({ success: true, message: 'Quantité augmentée', data });
  } catch (err) { next(err); }
};

const decrement = async (req, res, next) => {
  try {
    const data = await ProduitService.decrement(Number(req.params.id));
    res.json({ success: true, message: 'Quantité diminée', data });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove, increment, decrement};

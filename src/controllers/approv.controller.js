const ApprovService = require('../services/approv.service');

const getAll = async (req, res, next) => {
  try {
    const data = await ApprovService.getAll();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const data = await ApprovService.getById(Number(req.params.id));
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const data = await ApprovService.create(req.body);
    res.status(201).json({ success: true, message: 'Approvisionment créé avec succès', data });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const data = await ApprovService.update(Number(req.params.id), req.body);
    res.json({ success: true, message: 'Approvisionment mis à jour', data });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await ApprovService.remove(Number(req.params.id));
    res.json({ success: true, message: 'Approvisionment supprimé avec succès' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };

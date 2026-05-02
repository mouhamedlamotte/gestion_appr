const prisma = require('../config/prisma');

const findAll = () => prisma.approvisionnement.findMany({ include: { fournisseur: true, produit: true } });

const findById = (id) => prisma.approvisionnement.findUnique({ where: { id } , include: { fournisseur: true, produit: true } });

const create = (data) => prisma.approvisionnement.create({ data, include: { fournisseur: true, produit: true } });

const update = (id, data) => prisma.approvisionnement.update({ where: { id }, data , include: { fournisseur: true, produit: true } });

const remove = (id) => prisma.approvisionnement.delete({ where: { id } });


module.exports = { findAll, findById, create, update, remove };

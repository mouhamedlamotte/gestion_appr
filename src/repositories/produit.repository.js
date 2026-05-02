const prisma = require('../config/prisma');

const findAll = () => prisma.produit.findMany();

const findById = (id) => prisma.produit.findUnique({ where: { id } });

const create = (data) => prisma.produit.create({ data });

const update = (id, data) => prisma.produit.update({ where: { id }, data });

const remove = (id) => prisma.produit.delete({ where: { id } });

const increment = (id) => prisma.produit.update({ where: { id }, data: { quantite: { increment: 1 } } });

const decrement = (id) => prisma.produit.update({ where: { id }, data: { quantite: { decrement: 1 } } });

const updateQuantite = (id, quantite) => prisma.produit.update({ where: { id }, data: { quantite } });

const haveStock = (id, quantite) => prisma.produit.findUnique({ where: { id } }).quantite >= quantite;


module.exports = { findAll, findById, create, update, remove, increment, decrement, updateQuantite, haveStock };
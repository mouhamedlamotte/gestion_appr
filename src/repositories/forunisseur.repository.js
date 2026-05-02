const prisma = require('../config/prisma');

const findAll = () => prisma.fournisseur.findMany();

const findById = (id) => prisma.fournisseur.findUnique({ where: { id } });

const findByEmail = (email) => {
	if (!email) return null;
	return prisma.fournisseur.findUnique({ where: { email } });
};

const create = (data) => prisma.fournisseur.create({ data });

const update = (id, data) => prisma.fournisseur.update({ where: { id }, data });

const remove = (id) => prisma.fournisseur.delete({ where: { id } });



module.exports = { findAll, findById, findByEmail, create, update, remove };

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/produit.controller');
const validate = require('../middlewares/validate');
const { produitSchema } = require('../validations/schemas');

/**
 * @swagger
 * /api/produit:
 *   get:
 *     summary: Lister tous les produits
 *     tags: [Produit]
 *     responses:
 *       200:
 *         description: Liste des produitss
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Produit'
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /api/produit/{id}:
 *   get:
 *     summary: Obtenir un Produit par ID
 *     tags: [Produit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Produit trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produit'
 *       404:
 *         description: Produit introuvable
 */
router.get('/:id', ctrl.getById);

/**
 * @swagger
 * /api/produit:
 *   post:
 *     summary: Créer un nouveau Produit
 *     tags: [Produit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProduitInput'
 *     responses:
 *       201:
 *         description: Produit créé
 *       400:
 *         description: Données invalides
 */
router.post('/', validate(produitSchema), ctrl.create);

/**
 * @swagger
 * /api/produit/{id}:
 *   put:
 *     summary: Mettre à jour un Produit
 *     tags: [Produit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProduitInput'
 *     responses:
 *       200:
 *         description: Produit mis à jour
 *       404:
 *         description: Produit introuvable
 */
router.put('/:id', validate(produitSchema), ctrl.update);

/**
 * @swagger
 * /api/fournisseur/{id}:
 *   delete:
 *     summary: Supprimer un Produit
 *     tags: [Produit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Produit supprimé
 *       400:
 *         description: Produit a des réservations
 *       404:
 *         description: Produit introuvable
 */
router.delete('/:id', ctrl.remove);


/** * @swagger
 * /api/produit/{id}/increment:
 *   post:
 *     summary: Augmenter la quantité d'un Produit
 *     tags: [Produit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Quantité augmentée
 *       404:
 *         description: Produit introuvable
 */
router.post('/:id/increment', ctrl.increment);

/**
 * @swagger
 * /api/produit/{id}/decrement:
 *   post:
 *     summary: Diminuer la quantité d'un Produit
 *     tags: [Produit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Quantité diminuée
 *       404:
 *         description: Produit introuvable
 */
router.post('/:id/decrement', ctrl.decrement);

module.exports = router;

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/fournisseur.controller');
const validate = require('../middlewares/validate');
const { fournisseurSchema } = require('../validations/schemas');

/**
 * @swagger
 * /api/fournisseur:
 *   get:
 *     summary: Lister tous les fournisseurs
 *     tags: [Fournisseur]
 *     responses:
 *       200:
 *         description: Liste des fournisseurs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Fournisseur'
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /api/fournisseur/{id}:
 *   get:
 *     summary: Obtenir un client par ID
 *     tags: [Fournisseur]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Client trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fournisseur'
 *       404:
 *         description: Client introuvable
 */
router.get('/:id', ctrl.getById);

/**
 * @swagger
 * /api/fournisseur:
 *   post:
 *     summary: Créer un nouveau client
 *     tags: [Fournisseur]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FournisseurInput'
 *     responses:
 *       201:
 *         description: Client créé
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Email déjà utilisé
 */
router.post('/', validate(fournisseurSchema), ctrl.create);

/**
 * @swagger
 * /api/fournisseur/{id}:
 *   put:
 *     summary: Mettre à jour un client
 *     tags: [Fournisseur]
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
 *             $ref: '#/components/schemas/FournisseurInput'
 *     responses:
 *       200:
 *         description: Client mis à jour
 *       404:
 *         description: Client introuvable
 */
router.put('/:id', validate(fournisseurSchema), ctrl.update);

/**
 * @swagger
 * /api/fournisseur/{id}:
 *   delete:
 *     summary: Supprimer un client
 *     tags: [Fournisseur]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Client supprimé
 *       400:
 *         description: Client a des réservations
 *       404:
 *         description: Client introuvable
 */
router.delete('/:id', ctrl.remove);

module.exports = router;

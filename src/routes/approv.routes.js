const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/approv.controller');
const validate = require('../middlewares/validate');
const { approvSchema } = require('../validations/schemas');

/**
 * @swagger
 * /api/approvisionnement:
 *   get:
 *     summary: Lister tous les approvisionnements
 *     tags: [Approvisionnement]
 *     responses:
 *       200:
 *         description: Liste des approvisionnements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Approvisionnement'
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /api/approvisionnement/{id}:
 *   get:
 *     summary: Obtenir un approvisionnement par ID
 *     tags: [Approvisionnement]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Approvisionnement trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Approvisionnement'
 *       404:
 *         description: Approvisionnement introuvable
 */
router.get('/:id', ctrl.getById);

/**
 * @swagger
 * /api/approvisionnement:
 *   post:
 *     summary: Créer un nouvel approvisionnement
 *     tags: [Approvisionnement]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApprovisionnementInput'
 *     responses:
 *       201:
 *         description: Approvisionnement créé
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Email déjà utilisé
 */
router.post('/', validate(approvSchema), ctrl.create);

/**
 * @swagger
 * /api/approvisionnement/{id}:
 *   put:
 *     summary: Mettre à jour un approvisionnement
 *     tags: [Approvisionnement]
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
 *             $ref: '#/components/schemas/ApprovisionnementInput'
 *     responses:
 *       200:
 *         description: Approv mis à jour
 *       404:
 *         description: Approv introuvable
 */
router.put('/:id', validate(approvSchema), ctrl.update);

/**
 * @swagger
 * /api/approvisionnement/{id}:
 *   delete:
 *     summary: Supprimer un approvisionnement
 *     tags: [Approvisionnement]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Approvisionnement supprimé
 *       400:
 *         description: Approvisionnement a des réservations
 *       404:
 *         description: Approvisionnement introuvable
 */
router.delete('/:id', ctrl.remove);

module.exports = router;

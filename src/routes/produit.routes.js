const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/produit.controller');
const validate = require('../middlewares/validate');
const { produitSchema } = require('../validations/schemas');
const upload = require('../middlewares/upload');

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [libelle, prix_unitaire, quantite]
 *             properties:
 *               libelle:
 *                 type: string
 *                 example: Produit A
 *               prix_unitaire:
 *                 type: number
 *                 example: 100
 *               quantite:
 *                 type: number
 *                 example: 10
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image du produit (optionnel)
 *     responses:
 *       201:
 *         description: Produit créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', upload.single('image'), validate(produitSchema), ctrl.create);

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [libelle, prix_unitaire, quantite]
 *             properties:
 *               libelle:
 *                 type: string
 *                 example: Produit A
 *               prix_unitaire:
 *                 type: number
 *                 example: 100
 *               quantite:
 *                 type: number
 *                 example: 10
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Nouvelle image (remplace l'ancienne si fournie)
 *     responses:
 *       200:
 *         description: Produit mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Produit introuvable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', upload.single('image'), validate(produitSchema), ctrl.update);

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


/**
 * @swagger
 * /api/produit/{id}/image:
 *   get:
 *     summary: Récupérer l'URL de l'image d'un Produit
 *     tags: [Produit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: URL de l'image Cloudinary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     url: { type: string, example: 'https://res.cloudinary.com/...' }
 *       404:
 *         description: Produit introuvable ou sans image
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id/image', ctrl.getImage);

/**
 * @swagger
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

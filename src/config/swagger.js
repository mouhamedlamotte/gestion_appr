const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GESTION APPROVISIONNEMT',
      version: '1.0.0',
      description: 'API de gestion d approvisionnement',
      contact: {
        name: 'Serigne F. Seck',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'https://event221-api-latest.onrender.com'
          : `http://localhost:${process.env.PORT || 3000}`,
        description: process.env.NODE_ENV === 'production' ? 'Production (Render)' : 'Développement local',
      },
    ],
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Fournisseur', description: 'Gestion des fournisseurs' },
    ],
    components: {
      schemas: {
        Fournisseur: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nom: { type: 'string', example: 'lamotte' },
            email: { type: 'string', example: 'amadou.lamotte@email.com' },
            telephone: { type: 'string', example: '+221 70 987 65 43' },
          },
        },
        FournisseurInput: {
          type: 'object',
          required: ['prenom', 'nom', 'email', 'type'],
          properties: {
            nom: { type: 'string', example: 'lamotte' },
            email: { type: 'string', format: 'email', example: 'amadou.lamotte@email.com' },
            telephone: { type: 'string', example: '+221 70 987 65 43' },
          },
        },
        Produit: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            libelle: { type: 'string', example: 'Produit A' },
            prix_unitaire: { type: 'number', example: 100 },
            quantite: { type: 'number', example: 10 },
          },
        },
        ProduitInput: {
          type: 'object',
          required: ['libelle', 'prix_unitaire', 'quantite'],
          properties: {
            libelle: { type: 'string', example: 'Produit A' },
            prix_unitaire: { type: 'number', example: 100 },
            quantite: { type: 'number', example: 10 },
          },
        },
        Approvisionnement: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            fournisseur_id: { type: 'integer', example: 1 },
            produit_id: { type: 'integer', example: 1 },
            quantite: { type: 'number', example: 10 },
            date: { type: 'string', format: 'date-time', example: '2024-06-01T12:00:00Z' },
          },
        },
        ApprovisionnementInput: {
          type: 'object',
          required: ['fournisseurId', 'produitId', 'quantite'],
          properties: {
            fournisseurId: { type: 'integer', example: 1 },
            produitId: { type: 'integer', example: 1 },
            quantite: { type: 'number', example: 10 },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Message d\'erreur' },
            errors: { type: 'array', items: { type: 'string' } },
          },
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Opération réussie' },
            data: { type: 'object' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

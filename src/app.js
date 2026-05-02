require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler');

const fournisseurRoutes = require('./routes/fournisseur.routes');
const produitRoutes = require('./routes/produit.routes');
const approvRoutes = require('./routes/approv.routes');

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'API Approvisionnement E221 — API Docs',
  customCss: `
    .swagger-ui .topbar { background-color: #1a1a2e; }
    .swagger-ui .topbar-wrapper img { content: none; }
    .swagger-ui .topbar-wrapper::before {
      content: '🎪 API Approvisionnement E221';
      color: #e94560;
      font-size: 1.4rem;
      font-weight: bold;
    }
  `,
}));

// Route d'accueil
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🎪 Bienvenue sur l\'API EVENT 221 — Centre d\'Événements',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      fournisseur:      '/api/fournisseur',
    },
  });
});


app.use('/api/fournisseur', fournisseurRoutes);
app.use('/api/produit', produitRoutes);
app.use('/api/approvisionnement', approvRoutes);

// Route 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route "${req.originalUrl}" introuvable` });
});

// Gestionnaire d'erreurs global
app.use(errorHandler);

module.exports = app;

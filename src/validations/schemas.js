const { z } = require('zod');

const fournisseurSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().optional(),
});

const produitSchema = z.object({
  libelle: z.string().min(1, 'Le nom est requis'),
  prix_unitaire: z.number().min(1, 'Le prix doit être supérieur à 0'),
  quantite: z.number().min(1, 'La quantité doit être supérieur à 0'),
});

const approvSchema = z.object({
  fournisseurId: z.number({ invalid_type_error: 'L\'ID du fournisseur doit être un nombre' }),
  produitId: z.number({ invalid_type_error: 'L\'ID du produit doit être un nombre' }),
  quantite: z.number().min(1, 'La quantité doit être supérieur à 0'),
});



module.exports = {
  fournisseurSchema,
  produitSchema,
  approvSchema,
};

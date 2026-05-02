-- CreateTable
CREATE TABLE "Fournisseur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Fournisseur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produit" (
    "id" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,
    "prix_unitaire" DOUBLE PRECISION NOT NULL,
    "quantite" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Approvisionnement" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "quantite" INTEGER NOT NULL,
    "fournisseurId" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,

    CONSTRAINT "Approvisionnement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fournisseur_telephone_key" ON "Fournisseur"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Fournisseur_email_key" ON "Fournisseur"("email");

-- AddForeignKey
ALTER TABLE "Approvisionnement" ADD CONSTRAINT "Approvisionnement_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approvisionnement" ADD CONSTRAINT "Approvisionnement_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

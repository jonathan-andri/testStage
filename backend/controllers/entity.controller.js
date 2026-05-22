const prisma = require('../config/db'); 

// 1. Créer une entité (POST)
exports.createEntity = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Le nom est obligatoire" });

    const newEntity = await prisma.entity.create({ data: { name } });
    res.status(201).json(newEntity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Récupérer toutes les entités (GET)
exports.getAllEntities = async (req, res) => {
  try {
    const entities = await prisma.entity.findMany();
    res.json(entities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Récupérer une entité par son ID (GET /:id)
exports.getEntityById = async (req, res) => {
  try {
    const entity = await prisma.entity.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!entity) return res.status(404).json({ error: "Entité non trouvée" });
    res.json(entity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Mettre à jour une entité (PUT)
exports.updateEntity = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedEntity = await prisma.entity.update({
      where: { id: parseInt(req.params.id) },
      data: { name }
    });
    res.json(updatedEntity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Supprimer une entité (DELETE)
exports.deleteEntity = async (req, res) => {
  try {
    await prisma.entity.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: "Entité supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

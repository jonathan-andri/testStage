import prisma from '../config/db.js';

// 1. Associer une entité à un utilisateur (POST)
export const createUserEntity = async (req, res) => {
  try {
    const { userId, entityId } = req.body;
    if (!userId || !entityId)
      return res.status(400).json({ error: "userId et entityId sont obligatoires" });

    // Vérifier que l'user existe
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    // Vérifier que l'entité existe
    const entity = await prisma.entity.findUnique({ where: { id: parseInt(entityId) } });
    if (!entity) return res.status(404).json({ error: "Entité non trouvée" });

    const newUserEntity = await prisma.userEntity.create({
      data: {
        userId: parseInt(userId),
        entityId: parseInt(entityId)
      },
      include: { user: true, entity: true }
    });

    res.status(201).json(newUserEntity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Récupérer toutes les associations (GET)
export const getAllUserEntities = async (req, res) => {
  try {
    const userEntities = await prisma.userEntity.findMany({
      include: {
        user:   { select: { id: true, username: true, email: true } },
        entity: { select: { id: true, name: true } }
      }
    });
    res.json(userEntities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Récupérer une association par son ID (GET /:id)
export const getUserEntityById = async (req, res) => {
  try {
    const userEntity = await prisma.userEntity.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        user:   { select: { id: true, username: true, email: true } },
        entity: { select: { id: true, name: true } }
      }
    });
    if (!userEntity) return res.status(404).json({ error: "Association non trouvée" });
    res.json(userEntity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Mettre à jour une association (PUT /:id)
export const updateUserEntity = async (req, res) => {
  try {
    const { userId, entityId } = req.body;
    const data = {};

    if (userId)   data.userId   = parseInt(userId);
    if (entityId) data.entityId = parseInt(entityId);

    const updatedUserEntity = await prisma.userEntity.update({
      where: { id: parseInt(req.params.id) },
      data,
      include: {
        user:   { select: { id: true, username: true, email: true } },
        entity: { select: { id: true, name: true } }
      }
    });
    res.json(updatedUserEntity);
  } catch (error) {
    if (error.code === 'P2025')
      return res.status(404).json({ error: "Association non trouvée" });
    res.status(500).json({ error: error.message });
  }
};

// 5. Supprimer une association (DELETE /:id)
export const deleteUserEntity = async (req, res) => {
  try {
    await prisma.userEntity.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: "Association supprimée avec succès" });
  } catch (error) {
    if (error.code === 'P2025')
      return res.status(404).json({ error: "Association non trouvée" });
    res.status(500).json({ error: error.message });
  }
};
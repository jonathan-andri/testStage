import prisma from '../config/db.js';
import bcrypt from 'bcrypt';

// 1. Créer un utilisateur (POST)
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: "Tous les champs sont obligatoires" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword }
    });

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (error.code === 'P2002')
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    res.status(500).json({ error: error.message });
  }
};

// 2. Récupérer tous les utilisateurs (GET)
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true, userEntities: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Récupérer un utilisateur par son ID (GET /:id)
export const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      select: { id: true, username: true, email: true }
    });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Mettre à jour un utilisateur (PUT /:id)
export const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const data = {};

    if (username) data.username = username;
    if (email)    data.email    = email;
    if (password) data.password = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data,
      select: { id: true, username: true, email: true }
    });
    res.json(updatedUser);
  } catch (error) {
    if (error.code === 'P2002')
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    res.status(500).json({ error: error.message });
  }
};

// 5. Supprimer un utilisateur (DELETE /:id)
export const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
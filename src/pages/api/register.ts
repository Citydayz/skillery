// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    // Validation des données
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    // Exemple de logique d'inscription (tu pourrais y ajouter une base de données)
    // Vérification si l'utilisateur existe déjà dans la base de données
    // Ex : const userExists = await db.users.find({ email });

    // Si l'utilisateur existe déjà
    // if (userExists) {
    //   return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
    // }

    // Créer l'utilisateur dans la base de données (logique simplifiée)
    // await db.users.create({ data: { username, email, password } });

    return res.status(201).json({ message: "Utilisateur créé avec succès." });
  } else {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
}

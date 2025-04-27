// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Validation des données
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Les champs email et mot de passe sont requis." });
    }

    // Exemple de logique de connexion
    // Vérification de l'utilisateur dans la base de données
    // Ex : const user = await db.users.find({ email });

    // Si l'utilisateur n'existe pas
    // if (!user) {
    //   return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    // }

    // Si le mot de passe est incorrect
    // if (password !== user.password) {
    //   return res.status(401).json({ error: 'Mot de passe incorrect.' });
    // }

    return res.status(200).json({ message: "Connexion réussie." });
  } else {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
}

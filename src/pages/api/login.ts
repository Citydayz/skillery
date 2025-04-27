import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2";
import bcrypt from "bcryptjs";

// Connexion à la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

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

    // Recherche de l'utilisateur dans la base de données
    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], async (err, result) => {
      if (err) {
        console.error("Erreur lors de la récupération de l'utilisateur:", err);
        return res.status(500).json({ error: "Erreur de connexion" });
      }

      // Vérifier si le résultat est un tableau et non un objet OkPacket
      if (Array.isArray(result) && result.length === 0) {
        return res.status(404).json({ error: "Utilisateur non trouvé." });
      }

      if (Array.isArray(result) && result.length > 0) {
        const user = result[0]; // Si c'est un tableau, on prend le premier utilisateur trouvé

        // Comparaison des mots de passe
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          return res.status(200).json({ message: "Connexion réussie" });
        } else {
          return res.status(401).json({ error: "Mot de passe incorrect" });
        }
      }

      // Si ce n'est ni un tableau ni un objet valide, on renvoie une erreur
      return res.status(500).json({ error: "Erreur interne" });
    });
  } else {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
}

// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2"; // On importe le module mysql2
import bcrypt from "bcryptjs"; // Pour la vérification du mot de passe haché

// Connexion à la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "skillery_admin", // Utilisateur que tu utilises
  password: process.env.MYSQL_PASSWORD, // Utilise le mot de passe depuis .env pour la sécurité
  database: "skillery_db", // La base de données où tu veux vérifier les utilisateurs
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

    // Vérifier si l'utilisateur existe dans la base de données
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erreur de base de données" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Utilisateur non trouvé." });
      }

      const user = result[0];

      // Comparer le mot de passe saisi avec le mot de passe haché dans la base de données
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Erreur lors de la comparaison du mot de passe" });
        }

        if (!isMatch) {
          return res.status(401).json({ error: "Mot de passe incorrect." });
        }

        return res.status(200).json({ message: "Connexion réussie." });
      });
    });
  } else {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
}

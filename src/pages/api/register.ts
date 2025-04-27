// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2"; // On importe le module mysql2
import bcrypt from "bcryptjs"; // Pour le hachage du mot de passe

// Connexion à la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "skillery_admin", // Utilisateur que tu utilises
  password: process.env.MYSQL_PASSWORD, // Utilise le mot de passe depuis .env pour la sécurité
  database: "skillery_db", // La base de données où tu veux enregistrer les utilisateurs
});

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

    // Vérifier si l'utilisateur existe déjà dans la base de données
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erreur de base de données" });
      }

      if (result.length > 0) {
        return res.status(400).json({ error: "Cet utilisateur existe déjà." });
      }

      // Hachage du mot de passe avant de l'enregistrer
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Erreur lors du hachage du mot de passe" });
        }

        // Insertion de l'utilisateur dans la base de données
        db.query(
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
          [username, email, hashedPassword],
          (err) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ error: "Erreur lors de l'enregistrement" });
            }
            return res
              .status(201)
              .json({ message: "Utilisateur créé avec succès." });
          }
        );
      });
    });
  } else {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
}

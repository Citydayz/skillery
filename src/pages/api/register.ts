import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2";
import bcrypt from "bcryptjs";

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

    // Connexion à la base de données
    const db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Requête pour vérifier si l'utilisateur existe déjà
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) {
        console.error("Erreur lors de la vérification de l'utilisateur :", err);
        return res.status(500).json({ error: "Erreur interne" });
      }

      // Forcer TypeScript à savoir que result est un tableau d'objets de type RowDataPacket[]
      const users = result as mysql.RowDataPacket[]; // on force le résultat comme étant un tableau de RowDataPacket

      if (users.length > 0) {
        return res.status(400).json({ error: "Cet utilisateur existe déjà." });
      }

      // Hasher le mot de passe
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error("Erreur lors du hashage du mot de passe :", err);
          return res.status(500).json({ error: "Erreur interne" });
        }

        // Insérer l'utilisateur dans la base de données
        db.query(
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
          [username, email, hashedPassword],
          (err, result) => {
            if (err) {
              console.error(
                "Erreur lors de l'insertion dans la base de données :",
                err
              );
              return res
                .status(500)
                .json({ error: "Erreur lors de la création de l'utilisateur" });
            }
            return res
              .status(201)
              .json({ message: "Utilisateur créé avec succès" });
          }
        );
      });
    });
  } else {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
}

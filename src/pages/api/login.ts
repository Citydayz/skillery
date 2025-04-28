import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2";
import bcrypt from "bcryptjs";

// Définir un type pour l'utilisateur (par exemple avec une interface)
interface User {
  id: number;
  email: string;
  password: string;
}

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

    // Connexion à la base de données
    const db = mysql.createConnection({
      host: "51.178.24.24",
      user: "ubuntu",
      password: "@30B3H-11u05g19o99",
      database: "skillery",
    });

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error(
            "Erreur lors de la récupération de l'utilisateur :",
            err
          );
          return res.status(500).json({ error: "Erreur interne" });
        }

        // Spécifier que results est un tableau d'objets de type User
        const user = (results as mysql.RowDataPacket[])[0]; // On force les résultats comme un tableau de RowDataPacket

        if (!user) {
          return res.status(404).json({ error: "Utilisateur non trouvé." });
        }

        // Comparer le mot de passe hashé avec le mot de passe fourni
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          return res.status(200).json({ message: "Connexion réussie" });
        } else {
          return res.status(401).json({ error: "Mot de passe incorrect" });
        }
      }
    );
  } else {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
}

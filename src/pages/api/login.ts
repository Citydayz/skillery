import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2";
import bcrypt from "bcryptjs";

// Définir un type pour l'utilisateur
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

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Les champs email et mot de passe sont requis." });
    }

    // Connexion à la base de données
    const db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (
        err: mysql.QueryError | null,
        results:
          | mysql.RowDataPacket[]
          | mysql.RowDataPacket[][]
          | mysql.OkPacket
          | mysql.OkPacket[]
      ) => {
        if (err) {
          console.error(
            "Erreur lors de la récupération de l'utilisateur :",
            err
          );
          return res.status(500).json({ error: "Erreur interne" });
        }

        // On force les résultats comme un tableau de RowDataPacket
        const rows = results as mysql.RowDataPacket[];
        const user = rows[0] as User;

        if (!user) {
          return res.status(404).json({ error: "Utilisateur non trouvé." });
        }

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

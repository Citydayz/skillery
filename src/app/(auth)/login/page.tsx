// Login page
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/login", credentials);
      toast.success("Connexion réussie !");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data.message || "Erreur de connexion.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 shadow rounded-lg bg-white">
      <h1 className="text-xl font-bold mb-4">Connexion</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Mot de passe"
          required
          onChange={handleChange}
        />
        <Button type="submit" className="w-full">
          Se connecter
        </Button>
      </form>
    </div>
  );
}

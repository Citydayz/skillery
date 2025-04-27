"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await axios.post("/api/register", form);
      toast.success("Inscription réussie !");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data.message || "Erreur d'inscription.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 shadow rounded-lg bg-white">
      <h1 className="text-xl font-bold mb-4">Inscription</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          name="username"
          placeholder="Nom d'utilisateur"
          required
          onChange={handleChange}
        />
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
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmer mot de passe"
          required
          onChange={handleChange}
        />
        <Button type="submit" className="w-full">
          S'inscrire
        </Button>
      </form>
    </div>
  );
}

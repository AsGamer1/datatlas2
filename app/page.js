import { History, Medal, Trophy } from "lucide-react";
import { HomeCard } from "@/components/custom/home-card";

export default function Home() {
  return (
    <main className="text-white flex flex-col flex-1 justify-center">
      <div className="w-full max-w-full lg:max-w-[calc(min(100vw-60px,1220px))] mx-auto px-5">
        <div className="flex flex-col w-full px-5 items-center">
          <h1 className="text-center text-[calc(1.475rem+2.7vw)] lg:text-[3.5rem] leading-[1.2] mb-6 font-semibold">La <span className="bg-clip-text text-transparent bg-secondary capitalize">base</span><span className="bg-clip-text text-transparent bg-tertiary capitalize"> de </span><span className="bg-clip-text text-transparent bg-primary capitalize">datos</span><br /> de tu club favorito</h1>
          <div className="flex flex-col lg:flex-row gap-4">
            <HomeCard title="Marcas personales" Icon={Medal} contentTitle="Temporadas" content="desde 2023 hasta hoy" />
            <HomeCard title="Récords del club" Icon={Trophy} contentTitle="Pruebas" content="todas las de pista" />
            <HomeCard title="Historial de competiciones" Icon={History} contentTitle="Participaciones" content="pista, cross, trail, ruta" />
          </div>
        </div>
      </div>
    </main>
  );
}

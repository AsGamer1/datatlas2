"use server";

import { db } from "@/lib/db";
import dayjs from "dayjs";

export async function getEntrenadoresRegistrados() {
  try {
    const fetch = await db.usuario.findMany({
      where: {
        rol: "entrenador"
      }
    });

    const data = fetch.map(entrenador => ({
      id: entrenador.id,
      Nombre: entrenador.nombre,
      "Fecha de nacimiento": dayjs(entrenador.nacimiento).format("DD/MM/YYYY"),
      DNI: entrenador.dni
    }))

    const columns = ["Nombre", "Fecha de nacimiento", "DNI"].map((field) => {
      return {
        field: field,
        flex: 1,
        headerAlign: 'center',
        align: 'center'
      }
    })

    return { columns: columns, data: data }
  } catch (error) {
    return null
  }
}
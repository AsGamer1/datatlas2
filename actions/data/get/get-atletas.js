"use server";

import { db } from "@/lib/db";
import dayjs from "dayjs";

export async function getAtletasRegistrados() {
  try {
    const fetch = await db.usuario.findMany({
      where: {
        rol: "atleta"
      }
    });

    const data = fetch.map(atleta => ({
      id: atleta.id,
      Nombre: atleta.nombre,
      "Fecha de nacimiento": dayjs(atleta.nacimiento).format("DD/MM/YYYY"),
      DNI: atleta.dni
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
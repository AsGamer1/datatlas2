"use server";

import { db } from "@/lib/db";

export async function getEditableMarcas() {
  try {
    const fetch = await db.compite.findMany({
      include: {
        usuario: true,
        participacion: {
          include: {
            competicion: {
              include: {
                prueba: true
              }
            }
          }
        }
      }
    });

    const data = fetch.map(compite => ({
      id: compite.id_participacion & compite.id_usuario,
      Nombre: compite.usuario.nombre,
      Prueba: compite.participacion.competicion.prueba.nombre,
      Marca: compite.participacion.marca,
    }))

    const columns = [
      { field: "Nombre", flex: 1, headerAlign: "center", align: "center", editable: true },
      { field: "Prueba", flex: 1, headerAlign: "center", align: "center", editable: true },
      { field: "Marca", flex: 1, headerAlign: "center", align: "center", editable: true }
    ]

    return { columns: columns, data: data }
  } catch (error) {
    return null
  }
}

export async function getMarcasRegistradas() {
  try {
    const fetch = await db.compite.findMany({
      include: {
        usuario: true,
        participacion: {
          include: {
            competicion: {
              include: {
                prueba: true
              }
            }
          }
        }
      },
      take: -10
    })

    const data = fetch.map(compite => ({
      id: compite.id_participacion & compite.id_usuario,
      Nombre: compite.usuario.nombre,
      Prueba: compite.participacion.competicion.prueba.nombre,
      Marca: compite.participacion.marca,
    }))

    const columns = ["Nombre", "Prueba", "Marca"].map((field) => {
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
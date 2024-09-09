import { getLugares } from "@/actions/data/get/get-lugares";
import { CustomEditDate } from "@/components/tables/fields/edit-date";
import { CustomEditLugar } from "@/components/tables/fields/edit-lugar";
import dayjs from "dayjs";

export async function formatColumns(columns) {
  const lugares = await getLugares()
  return columns.map((column) => {
    if (column.field === "Fecha") {
      return {
        ...column,
        valueFormatter: (params) => params ? dayjs(params).format("DD/MM/YYYY") : params,
        renderEditCell: (params) => <CustomEditDate {...params} />,
      }
    } else if (column.field === "Lugar") {
      return {
        ...column,
        renderEditCell: (params) => <CustomEditLugar {...params} label="Selecciona un lugar" savedOptions={lugares} />
      }
    }
    return column
  })
}
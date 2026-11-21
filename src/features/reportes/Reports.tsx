import { Download, Filter } from "lucide-react";
import { useMemo, useState } from "react";

type ReportStatus = "Listo" | "En proceso";

type Report = {
  id: number;
  date: string;
  type: string;
  description: string;
  status: ReportStatus;
};

const reports: Report[] = [
  {
    id: 1,
    date: "2024-05-15",
    type: "Bautismos",
    description: "Listado de bautismos por fecha",
    status: "Listo",
  },
  {
    id: 2,
    date: "2024-05-12",
    type: "Misas",
    description: "Resumen de misas realizadas",
    status: "Listo",
  },
  {
    id: 3,
    date: "2024-05-08",
    type: "Solicitudes",
    description: "Solicitudes por estado en el mes",
    status: "En proceso",
  },
  {
    id: 4,
    date: "2024-05-15",
    type: "Confirmaciones",
    description: "Confirmaciones por fecha",
    status: "Listo",
  },
  {
    id: 5,
    date: "2024-05-10",
    type: "Personas",
    description: "Registro de personas nuevas",
    status: "Listo",
  },
  {
    id: 6,
    date: "2024-05-05",
    type: "Primeras comuniones",
    description: "Primeras comuniones celebradas",
    status: "Listo",
  },
];

function downloadCsv(rows: Report[]) {
  const csv = [
    ["Fecha", "Tipo de reporte", "Descripción", "Estado"],
    ...rows.map((report) => [
      report.date.split("-").reverse().join("/"),
      report.type,
      report.description,
      report.status,
    ]),
  ]
    .map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "reportes-parroquia-san-juan-bautista.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function Reports() {
  const [date, setDate] = useState("");
  const [type, setType] = useState("Todos");
  const [appliedDate, setAppliedDate] = useState("");
  const [appliedType, setAppliedType] = useState("Todos");

  const filtered = useMemo(
    () =>
      reports.filter(
        (report) =>
          (!appliedDate || report.date === appliedDate) &&
          (appliedType === "Todos" || report.type === appliedType),
      ),
    [appliedDate, appliedType],
  );

  return (
    <section className="min-h-full bg-white px-5 py-6 text-[#002B5C] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Reportes</h1>
        <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold">
              Fecha
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-1.5 block h-11 w-full rounded-lg border border-slate-300 px-3 font-normal text-slate-700 outline-none focus:border-[#0F5CA9]"
              />
            </label>
            <label className="text-sm font-semibold">
              Tipo de reporte
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="mt-1.5 block h-11 w-full rounded-lg border border-slate-300 bg-white px-3 font-normal text-slate-700 outline-none focus:border-[#0F5CA9]"
              >
                <option>Todos</option>
                {[...new Set(reports.map((report) => report.type))].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setAppliedDate(date);
                setAppliedType(type);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#0F5CA9] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#002B5C]"
            >
              <Filter size={16} /> Filtrar
            </button>
            <button
              type="button"
              onClick={() => downloadCsv(filtered)}
              className="inline-flex items-center gap-2 rounded-full border border-[#0F5CA9] px-6 py-2.5 text-sm font-semibold text-[#0F5CA9] hover:bg-slate-50"
            >
              <Download size={16} /> Exportar
            </button>
          </div>
        </div>

        <div className="mt-7 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-[#002B5C] text-[#002B5C]">
                <th className="px-4 py-3 font-bold">Fecha</th>
                <th className="px-4 py-3 font-bold">Tipo de reporte</th>
                <th className="px-4 py-3 font-bold">Descripción</th>
                <th className="px-4 py-3 text-center font-bold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((report) => (
                <tr key={report.id} className="border-b border-slate-200 hover:bg-[#f7faff]">
                  <td className="px-4 py-4 text-slate-600">
                    {report.date.split("-").reverse().join("/")}
                  </td>
                  <td className="px-4 py-4 font-semibold">{report.type}</td>
                  <td className="px-4 py-4 text-slate-600">{report.description}</td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-flex min-w-24 justify-center rounded-full px-3 py-1 text-xs font-bold ${
                        report.status === "Listo"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-[#FEEB75]/60 text-[#9E690B]"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="rounded-b-xl bg-slate-50 py-10 text-center text-sm text-slate-500">
              No hay reportes que coincidan con los filtros.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

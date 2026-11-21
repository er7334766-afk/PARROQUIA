import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  Baby,
  CalendarDays,
  Check,
  Church,
  CircleUserRound,
  Cross,
  Edit3,
  Eye,
  HeartHandshake,
  IdCard,
  MapPin,
  NotebookPen,
  Pencil,
  Plus,
  Search,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";

type Mode = "list" | "profile" | "edit" | "new";

type FeligresesProps = {
  mode: Mode;
  onNavigate: (view: string) => void;
  onSaved: () => void;
  onDelete: () => void;
  onOpenCertificate: (kind: string) => void;
};

const parishioners = [
  {
    id: "001",
    name: "María Fernanda Martínez López",
    dni: "0201-1992-00418",
    birth: "14/08/1992",
    status: "Activo",
    address: "Barrio El Centro, Trujillo, Colón",
  },
  {
    id: "002",
    name: "José Antonio Rivera García",
    dni: "0201-1987-01235",
    birth: "22/02/1987",
    status: "Activo",
    address: "Barrio Cristales, Trujillo, Colón",
  },
  {
    id: "003",
    name: "Ana Lucía Mejía Flores",
    dni: "0207-2001-00352",
    birth: "06/11/2001",
    status: "Activo",
    address: "Santa Fe, Colón",
  },
  {
    id: "004",
    name: "Carlos Enrique Pineda Reyes",
    dni: "0201-1979-00873",
    birth: "30/05/1979",
    status: "Inactivo",
    address: "Barrio San Martín, Trujillo, Colón",
  },
  {
    id: "005",
    name: "Sofía Isabel Hernández Cruz",
    dni: "0204-1998-00196",
    birth: "19/09/1998",
    status: "Activo",
    address: "Santa Rosa de Aguán, Colón",
  },
];

const fields = [
  { label: "Nombres", name: "names", placeholder: "María Fernanda" },
  { label: "Apellidos", name: "lastNames", placeholder: "Martínez López" },
  { label: "DNI", name: "dni", placeholder: "0201-1992-00418" },
  { label: "Fecha de nacimiento", name: "birth", type: "date" },
  { label: "Estado civil", name: "civilStatus", placeholder: "Soltera" },
  { label: "Sexo", name: "sex", placeholder: "Femenino" },
  { label: "Teléfono", name: "phone", placeholder: "9954-1287" },
  { label: "Teléfono de emergencia", name: "emergencyPhone", placeholder: "9721-4068" },
  { label: "Dirección", name: "address", placeholder: "Barrio El Centro, Trujillo" },
  { label: "Originario", name: "origin", placeholder: "Trujillo, Colón" },
];

function ModuleBar({
  title,
  backLabel,
  onBack,
}: {
  title: string;
  backLabel?: string;
  onBack?: () => void;
}) {
  return (
    <div className="mb-5 flex min-h-14 items-center justify-between rounded-[18px] bg-gradient-to-r from-[#002B5C] via-[#0F5CA9] to-[#4FA3E3] px-5 text-white shadow-sm">
      <div className="flex items-center gap-3">
        <Users size={31} fill="currentColor" strokeWidth={1.2} />
        <h1 className="text-[19px] font-bold">{title}</h1>
      </div>
      {backLabel && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-[11px] font-bold text-[#002B5C] shadow-sm transition hover:bg-[#FEEB75]"
        >
          <ArrowLeft size={14} /> {backLabel}
        </button>
      )}
    </div>
  );
}

function ParishionerHeader({ onEdit }: { onEdit: () => void }) {
  return (
    <article className="mb-5 rounded-[24px] border border-[#C6D4DF] bg-white/70 px-5 py-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="flex min-w-[260px] items-center gap-4">
          <div className="flex size-24 shrink-0 items-center justify-center rounded-full bg-[#EAB025] text-[#FFF5D1]">
            <CircleUserRound size={75} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#002B5C]">María Fernanda</h2>
            <span className="mt-1 inline-block rounded-full bg-[#9AF284] px-3 py-1 text-[10px] font-bold text-[#246A2B]">
              Feligrés activo
            </span>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 border-[#91AAB9] sm:border-r">
            <IdCard size={31} className="text-black" strokeWidth={1.5} />
            <div>
              <strong className="block text-[13px] text-[#002B5C]">DNI</strong>
              <span className="text-[12px] text-slate-600">0201-1992-00418</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-[#91AAB9] sm:border-r">
            <CalendarDays size={30} className="text-black" strokeWidth={1.5} />
            <div>
              <strong className="block text-[13px] text-[#002B5C]">Fecha de nacimiento</strong>
              <span className="text-[12px] text-slate-600">14/08/1992</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={31} className="text-black" strokeWidth={1.5} />
            <div>
              <strong className="block text-[13px] text-[#002B5C]">Dirección</strong>
              <span className="text-[12px] text-slate-600">Barrio El Centro, Trujillo</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="self-start rounded-md border border-dashed border-[#002B5C] bg-white px-3 py-2 text-[11px] font-bold text-[#002B5C] hover:bg-slate-50"
        >
          <span className="flex items-center gap-2">
            <Pencil size={14} fill="#FEEB75" /> Editar perfil
          </span>
        </button>
      </div>
    </article>
  );
}

function ListView({ onNavigate, onDelete }: Pick<FeligresesProps, "onNavigate" | "onDelete">) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("dni");
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return parishioners;
    return parishioners.filter((person) => {
      if (filter === "dni") return person.dni.includes(needle);
      const [first, ...rest] = person.name.toLowerCase().split(" ");
      if (filter === "nombre") return first.includes(needle);
      return rest.join(" ").includes(needle);
    });
  }, [filter, query]);

  return (
    <>
      <ModuleBar title="Gestión de feligreses" />
      <article className="rounded-[22px] border border-[#C5D6E2] bg-white/75 p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-[#002B5C]">
            <Users size={34} fill="#002B5C" />
            <h2 className="text-[20px] font-bold">Listado de feligreses</h2>
          </div>
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#4FA3E3] px-4 py-1.5 text-[11px] font-bold text-white">
            <Users size={15} /> 1,250
          </span>
        </div>

        <div className="mb-3 flex flex-col gap-3 lg:flex-row">
          <div className="flex flex-1">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-10 w-full rounded-l-lg border border-[#9DB5C5] bg-white pl-10 pr-3 text-sm outline-none focus:border-[#0F5CA9]"
                aria-label="Buscar feligreses"
              />
            </div>
            <button
              type="button"
              className="flex h-10 w-14 items-center justify-center rounded-r-lg bg-[#002B5C] text-white hover:bg-[#0F5CA9]"
              aria-label="Buscar"
            >
              <Search size={19} />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="rounded-lg border border-dashed border-[#0F5CA9] px-4 py-2 text-[11px] font-bold text-[#0F5CA9]"
          >
            Limpiar filtros
          </button>
          <button
            type="button"
            onClick={() => onNavigate("feligreses-new")}
            className="rounded-lg bg-[#0F5CA9] px-7 py-2 text-[12px] font-bold text-white hover:bg-[#002B5C]"
          >
            Registrar
          </button>
        </div>

        <fieldset className="mb-5 flex flex-wrap items-center gap-5 text-[12px] text-slate-600">
          <legend className="mr-1 inline font-bold text-[#002B5C]">Filtrar por:</legend>
          {[
            ["dni", "DNI"],
            ["nombre", "Nombre"],
            ["apellido", "Apellido"],
          ].map(([value, label]) => (
            <label key={value} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="filter"
                value={value}
                checked={filter === value}
                onChange={() => setFilter(value)}
                className="accent-[#0F5CA9]"
              />
              {label}
            </label>
          ))}
        </fieldset>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-[12px]">
            <thead className="bg-[#002B5C] text-white">
              <tr>
                {[
                  "ID",
                  "Nombre completo",
                  "Número de identidad",
                  "Fecha de nacimiento",
                  "Estado",
                  "Acciones",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border-r border-white/30 px-4 py-3 text-center font-semibold"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((person) => (
                <tr
                  key={person.id}
                  className="border-b border-[#9EC4E2] text-slate-600 hover:bg-[#EEF6FC]"
                >
                  <td className="px-4 py-3 text-center">{person.id}</td>
                  <td className="px-4 py-3 font-semibold text-[#002B5C]">{person.name}</td>
                  <td className="px-4 py-3 text-center">{person.dni}</td>
                  <td className="px-4 py-3 text-center">{person.birth}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                        person.status === "Activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {person.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        aria-label={`Ver perfil de ${person.name}`}
                        onClick={() => onNavigate("feligreses-profile")}
                        className="flex size-7 items-center justify-center rounded-full bg-[#0F5CA9] text-white"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Editar ${person.name}`}
                        onClick={() => onNavigate("feligreses-edit")}
                        className="flex size-7 items-center justify-center rounded-full bg-[#F4CF2F] text-[#002B5C]"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Eliminar ${person.name}`}
                        onClick={onDelete}
                        className="flex size-7 items-center justify-center rounded-full bg-[#CF3D32] text-white"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 flex flex-col gap-3 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>1 - {results.length} de 1,250 registros</span>
          <div className="flex items-center gap-1">
            {["1", "2", "3", "…", "250"].map((page, index) => (
              <button
                type="button"
                key={`${page}-${index}`}
                className={`size-7 rounded-md ${
                  page === "1" ? "bg-[#0F5CA9] text-white" : "border border-slate-300 bg-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}

function HistoryTab({
  onNavigate,
  onOpenCertificate,
}: Pick<FeligresesProps, "onNavigate" | "onOpenCertificate">) {
  const sacraments = [
    {
      kind: "bautismo",
      title: "Bautismo",
      icon: Baby,
      date: "22/12/1992",
      registered: true,
    },
    {
      kind: "primera-comunion",
      title: "Primera comunión",
      icon: Church,
      date: "",
      registered: false,
    },
    {
      kind: "confirmacion",
      title: "Confirmación",
      icon: Cross,
      date: "17/08/2008",
      registered: true,
    },
    {
      kind: "matrimonio",
      title: "Matrimonio",
      icon: HeartHandshake,
      date: "05/03/2016",
      registered: true,
    },
  ];
  return (
    <div>
      <h3 className="mb-5 text-[18px] font-bold text-[#002B5C]">Historial de sacramentos</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {sacraments.map((item, index) => {
          const Icon = item.icon;
          const blue = index % 2 === 0;
          return (
            <article
              key={item.kind}
              className={`rounded-[20px] border-2 bg-white p-4 text-center ${
                blue ? "border-[#0F5CA9]" : "border-[#DCA123]"
              }`}
            >
              <div
                className={`mx-auto flex size-12 items-center justify-center rounded-full ${
                  blue ? "bg-[#E4F2FC] text-[#0F5CA9]" : "bg-[#FFF4CE] text-[#DCA123]"
                }`}
              >
                <Icon size={27} />
              </div>
              <h4 className="mt-2 font-bold text-[#002B5C]">{item.title}</h4>
              <span
                className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold ${
                  item.registered ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-500"
                }`}
              >
                {item.registered && <Check size={10} />}{" "}
                {item.registered ? "Registrado" : "No registrado"}
              </span>
              {item.registered ? (
                <>
                  <dl className="my-3 text-left text-[10px] text-slate-500">
                    <div className="flex justify-between gap-2 border-b py-1">
                      <dt>Fecha</dt>
                      <dd className="font-semibold text-[#002B5C]">{item.date}</dd>
                    </div>
                    <div className="flex justify-between gap-2 py-1">
                      <dt>Parroquia</dt>
                      <dd className="text-right font-semibold text-[#002B5C]">San Juan Bautista</dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={() => onOpenCertificate(item.kind)}
                    className="text-[11px] font-bold text-[#0F5CA9] underline"
                  >
                    Ver certificado
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate("primera-comunion")}
                  className="mt-7 rounded-lg bg-[#0F5CA9] px-4 py-2 text-[10px] font-bold text-white"
                >
                  Agregar primera comunión
                </button>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function ProfileView({
  onNavigate,
  onOpenCertificate,
}: Pick<FeligresesProps, "onNavigate" | "onOpenCertificate">) {
  const [tab, setTab] = useState<"history" | "personal" | "notes">("history");
  const tabs = [
    { key: "history", label: "Historial de sacramentos", icon: Church },
    { key: "personal", label: "Datos personales", icon: UserRound },
    { key: "notes", label: "Observaciones", icon: NotebookPen },
  ] as const;
  return (
    <>
      <ModuleBar
        title="Feligreses"
        backLabel="Volver al listado"
        onBack={() => onNavigate("feligreses-list")}
      />
      <ParishionerHeader onEdit={() => onNavigate("feligreses-edit")} />
      <div className="flex overflow-x-auto">
        {tabs.map((item) => {
          const Icon = item.icon;
          return (
            <button
              type="button"
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex min-w-[210px] flex-1 items-center justify-center gap-2 rounded-t-[14px] border border-b-0 px-4 py-3 text-[12px] font-bold ${
                tab === item.key
                  ? "bg-white text-[#002B5C]"
                  : "border-[#C6D4DF] bg-slate-50 text-slate-500"
              }`}
            >
              <Icon size={17} className={tab === item.key ? "text-[#0F5CA9]" : ""} />
              {item.label}
            </button>
          );
        })}
      </div>
      <article className="min-h-[315px] rounded-b-[24px] rounded-tr-[24px] border border-[#C6D4DF] bg-white/75 p-6 shadow-sm">
        {tab === "history" && (
          <HistoryTab onNavigate={onNavigate} onOpenCertificate={onOpenCertificate} />
        )}
        {tab === "personal" && (
          <div>
            <h3 className="mb-6 text-[18px] font-bold text-[#002B5C]">Datos personales</h3>
            <dl className="grid max-w-3xl grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2">
              {[
                ["Sexo", "Femenino"],
                ["Estado civil", "Casada"],
                ["Teléfono", "9954-1287"],
                ["Teléfono de emergencia", "9721-4068"],
                ["Originario", "Trujillo, Colón"],
                ["Fecha de registro", "08/01/2021"],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-slate-200 pb-2">
                  <dt className="text-[11px] font-bold text-slate-500">{label}:</dt>
                  <dd className="mt-1 text-[13px] font-semibold text-[#002B5C]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {tab === "notes" && (
          <div>
            <h3 className="mb-5 text-[18px] font-bold text-[#002B5C]">Observaciones</h3>
            <textarea
              defaultValue="Participa activamente en las celebraciones dominicales y en el grupo pastoral familiar."
              className="min-h-44 w-full resize-none rounded-xl border border-[#9DB5C5] bg-white p-4 text-sm text-slate-600 outline-none focus:border-[#0F5CA9]"
              placeholder="Escribir observaciones..."
            />
          </div>
        )}
      </article>
    </>
  );
}

function FormView({
  mode,
  onNavigate,
  onSaved,
}: Pick<FeligresesProps, "mode" | "onNavigate" | "onSaved">) {
  const editing = mode === "edit";
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSaved();
  }
  return (
    <div className="mx-auto max-w-[680px]">
      <div className="mb-5 flex flex-col gap-4 rounded-[22px] border border-[#C6D4DF] bg-white/80 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-[#FEEB75] text-[#0F5CA9]">
            {editing ? <Edit3 size={23} /> : <Plus size={25} />}
          </div>
          <div>
            <h1 className="text-[19px] font-bold text-[#002B5C]">
              {editing ? "Editar perfil" : "Agregar nuevo feligrés"}
            </h1>
            <p className="text-[9px] text-slate-500">
              {editing
                ? "Modifique los datos personales del feligrés"
                : "Ingrese los datos para registrar un nuevo feligrés"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate(editing ? "feligreses-profile" : "feligreses-list")}
          className="flex items-center justify-center gap-2 rounded-md border border-dashed border-[#0F5CA9] px-3 py-2 text-[10px] font-bold text-[#002B5C]"
        >
          <ArrowLeft size={13} />
          {editing ? "Volver al perfil" : "Volver al listado"}
        </button>
      </div>

      <form
        onSubmit={submit}
        className="rounded-[22px] border border-[#C6D4DF] bg-white/80 p-6 shadow-sm"
      >
        <h2 className="mb-6 text-[16px] font-bold text-[#0F5CA9]">Datos personales</h2>
        <div className="grid grid-cols-1 gap-x-7 gap-y-5 sm:grid-cols-2">
          {fields.map((field) => (
            <label key={field.name} className="text-[11px] font-bold text-[#002B5C]">
              {field.label}
              <input
                type={field.type ?? "text"}
                name={field.name}
                defaultValue={editing && field.name !== "birth" ? field.placeholder : undefined}
                className="mt-2 h-9 w-full rounded-md border border-[#8DABB9] bg-white px-3 text-[12px] font-normal text-slate-700 outline-none focus:border-[#0F5CA9] focus:ring-2 focus:ring-[#4FA3E3]/20"
              />
            </label>
          ))}
        </div>
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => onNavigate(editing ? "feligreses-profile" : "feligreses-list")}
            className="min-w-36 rounded-lg border border-[#0F5CA9] bg-white px-5 py-2.5 text-[12px] font-bold text-[#0F5CA9]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="min-w-48 rounded-lg bg-[#0F5CA9] px-5 py-2.5 text-[12px] font-bold text-white hover:bg-[#002B5C]"
          >
            {editing ? "Guardar cambios" : "Guardar feligrés"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Feligreses({ mode, onNavigate, onSaved, onDelete, onOpenCertificate }: FeligresesProps) {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-4 py-7 sm:px-7">
      {mode === "list" && <ListView onNavigate={onNavigate} onDelete={onDelete} />}
      {mode === "profile" && (
        <ProfileView onNavigate={onNavigate} onOpenCertificate={onOpenCertificate} />
      )}
      {(mode === "edit" || mode === "new") && (
        <FormView mode={mode} onNavigate={onNavigate} onSaved={onSaved} />
      )}
    </section>
  );
}

export default Feligreses;

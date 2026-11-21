import { ChevronLeft, ChevronRight, Pencil, Plus, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";

type PetitionKind = "Novena" | "Cumpleaños";

type Petition = {
  id: number;
  day: number;
  kind: PetitionKind;
  title: string;
  motive: string;
  repeat: boolean;
};

type EditorState =
  | { mode: "new"; petition?: undefined }
  | { mode: "detail" | "edit" | "delete"; petition: Petition }
  | null;

type CalendarProps = {
  onSaved: () => void;
  onDelete: () => void;
};

const initialPetitions: Petition[] = [
  {
    id: 1,
    day: 3,
    kind: "Novena",
    title: "† Juan Pérez · 1/9",
    motive: "Por el eterno descanso de Juan Pérez, ofrecida por su familia.",
    repeat: true,
  },
  ...Array.from({ length: 8 }, (_, index) => ({
    id: index + 2,
    day: index + 4,
    kind: "Novena" as const,
    title: `† Juan Pérez · ${index + 2}/9`,
    motive: "Por el eterno descanso de Juan Pérez, ofrecida por su familia.",
    repeat: true,
  })),
  {
    id: 10,
    day: 14,
    kind: "Cumpleaños",
    title: "Cumpleaños - Ana",
    motive: "Por el cumpleaños de Ana Martínez, ofrecida por su esposo y sus hijos.",
    repeat: false,
  },
  {
    id: 11,
    day: 22,
    kind: "Cumpleaños",
    title: "Cumpleaños - Carlos",
    motive: "Por la vida y salud de Carlos Mejía y toda su familia.",
    repeat: false,
  },
];

const weeks = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 1, 2, 3, 4, 5],
];

const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function ModalShell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#00182f]/55 p-4 backdrop-blur-[1px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="relative w-full max-w-[520px] rounded-[22px] border-t-[5px] border-[#DCA123] bg-white px-8 py-7 shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}

function PetitionForm({
  petition,
  onCancel,
  onSubmit,
}: {
  petition?: Petition;
  onCancel: () => void;
  onSubmit: (day: number, motive: string, repeat: boolean) => void;
}) {
  const [date, setDate] = useState(
    petition ? `2026-11-${String(petition.day).padStart(2, "0")}` : "2026-11-14",
  );
  const [motive, setMotive] = useState(petition?.motive ?? "");
  const [repeat, setRepeat] = useState(petition?.repeat ?? false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(Number(date.slice(-2)), motive, repeat);
      }}
    >
      <h2 className="font-serif text-2xl font-bold text-[#002B5C]">
        {petition ? "Editar petición" : "Nueva petición"}
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        {petition
          ? "Cambia la fecha o el motivo de la petición."
          : "Agrega una intención para las misas."}
      </p>
      <label className="mt-6 block text-sm font-semibold text-[#002B5C]" htmlFor="petition-date">
        Fecha de la misa
      </label>
      <input
        id="petition-date"
        type="date"
        min="2026-11-01"
        max="2026-11-30"
        required
        value={date}
        onChange={(event) => setDate(event.target.value)}
        className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-[#0F5CA9] focus:ring-2 focus:ring-[#4FA3E3]/20"
      />
      <label className="mt-4 flex items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={repeat}
          onChange={(event) => setRepeat(event.target.checked)}
          className="size-4 accent-[#0F5CA9]"
        />
        Repetir en 9 misas seguidas (novena)
      </label>
      <label className="mt-4 block text-sm font-semibold text-[#002B5C]" htmlFor="petition-motive">
        Motivo de la petición
      </label>
      <textarea
        id="petition-motive"
        required
        rows={6}
        value={motive}
        onChange={(event) => setMotive(event.target.value)}
        placeholder="Escribe el motivo y quién ofrece la petición. Ej.: Por el eterno descanso de (nombre), ofrecida por su familia."
        className="mt-1 w-full resize-none rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-[#0F5CA9] focus:ring-2 focus:ring-[#4FA3E3]/20"
      />
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-[#0F5CA9] px-5 py-2.5 text-sm font-semibold text-[#0F5CA9] hover:bg-slate-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-full bg-[#0F5CA9] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#002B5C]"
        >
          {petition ? "Guardar cambios" : "Guardar petición"}
        </button>
      </div>
    </form>
  );
}

export default function Calendar({ onSaved, onDelete }: CalendarProps) {
  const [petitions, setPetitions] = useState(initialPetitions);
  const [editor, setEditor] = useState<EditorState>(null);
  const [monthOffset, setMonthOffset] = useState(0);

  const monthLabel = useMemo(() => {
    const date = new Date(2026, 10 + monthOffset, 1);
    return new Intl.DateTimeFormat("es-HN", { month: "long", year: "numeric" }).format(date);
  }, [monthOffset]);

  const savePetition = (day: number, motive: string, repeat: boolean) => {
    if (editor?.mode === "edit") {
      setPetitions((current) =>
        current.map((item) =>
          item.id === editor.petition.id
            ? {
                ...item,
                day,
                motive,
                repeat,
                kind: repeat ? "Novena" : item.kind,
                title: repeat ? `† Intención especial · ${item.id}/9` : "Petición de misa",
              }
            : item,
        ),
      );
    } else {
      setPetitions((current) => [
        ...current,
        {
          id: Math.max(...current.map((item) => item.id), 0) + 1,
          day,
          motive,
          repeat,
          kind: repeat ? "Novena" : "Cumpleaños",
          title: repeat ? "† Nueva intención · 1/9" : "Petición de misa",
        },
      ]);
    }
    setEditor(null);
    onSaved();
  };

  return (
    <section className="min-h-full bg-[#f2f6fc] text-[#002B5C]">
      <div className="flex min-h-16 items-center justify-between bg-gradient-to-r from-[#0F5CA9] to-[#002B5C] px-6 text-white shadow-sm">
        <h1 className="text-xl font-bold sm:text-2xl">Parroquia San Juan Bautista</h1>
        <span className="text-sm font-semibold">Peticiones de misas</span>
      </div>

      <div className="mx-auto max-w-[1420px] px-4 py-5 sm:px-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Mes anterior"
              onClick={() => setMonthOffset((value) => value - 1)}
              className="grid size-10 place-items-center rounded-full border-2 border-[#002B5C] bg-white hover:bg-slate-100"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="min-w-40 text-center text-xl font-bold capitalize">
              {monthOffset === 0 ? (
                <>
                  Noviembre <span className="block text-base">2026</span>
                </>
              ) : (
                monthLabel
              )}
            </h2>
            <button
              type="button"
              aria-label="Mes siguiente"
              onClick={() => setMonthOffset((value) => value + 1)}
              className="grid size-10 place-items-center rounded-full border-2 border-[#002B5C] bg-white hover:bg-slate-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setEditor({ mode: "new" })}
            className="inline-flex items-center gap-2 rounded-full bg-[#DCA123] px-5 py-3 text-sm font-bold text-[#002B5C] shadow-sm hover:bg-[#FEEB75]"
          >
            <Plus size={18} /> Nueva petición
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#aab9c9] bg-white shadow-sm">
          <div className="min-w-[860px]">
            <div className="grid grid-cols-7 bg-[#e8eef6]">
              {dayNames.map((name) => (
                <div
                  key={name}
                  className="border-r border-[#aab9c9] px-3 py-2 text-center text-sm font-bold text-[#0F5CA9] last:border-0"
                >
                  {name}
                </div>
              ))}
            </div>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7">
                {week.map((day, dayIndex) => {
                  const isNextMonth = weekIndex === 4 && dayIndex > 1;
                  const dayPetitions =
                    monthOffset === 0 && !isNextMonth
                      ? petitions.filter((petition) => petition.day === day)
                      : [];
                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`min-h-28 border-r border-t border-[#8395a9] p-1.5 last:border-r-0 ${
                        isNextMonth ? "bg-slate-100 text-slate-400" : "bg-white"
                      }`}
                    >
                      <span className="text-xs font-bold">{day}</span>
                      <div className="mt-1 space-y-1">
                        {dayPetitions.map((petition) => (
                          <button
                            type="button"
                            key={petition.id}
                            onClick={() => setEditor({ mode: "detail", petition })}
                            className={`block w-full truncate rounded px-2 py-1.5 text-left text-xs font-semibold ${
                              petition.kind === "Novena"
                                ? "bg-[#0F5CA9] text-white hover:bg-[#002B5C]"
                                : "bg-[#FEEB75] text-[#59420c] hover:bg-[#f5d94f]"
                            }`}
                          >
                            {petition.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {editor?.mode === "new" && (
        <ModalShell onClose={() => setEditor(null)}>
          <PetitionForm onCancel={() => setEditor(null)} onSubmit={savePetition} />
        </ModalShell>
      )}
      {editor?.mode === "edit" && (
        <ModalShell onClose={() => setEditor(null)}>
          <PetitionForm
            petition={editor.petition}
            onCancel={() => setEditor({ mode: "detail", petition: editor.petition })}
            onSubmit={savePetition}
          />
        </ModalShell>
      )}
      {editor?.mode === "detail" && (
        <ModalShell onClose={() => setEditor(null)}>
          <button
            type="button"
            onClick={() => setEditor(null)}
            aria-label="Cerrar detalle"
            className="absolute right-5 top-5 grid size-8 place-items-center rounded-full bg-slate-100 text-slate-600"
          >
            <X size={16} />
          </button>
          <span className="inline-flex rounded-full bg-[#FEEB75] px-3 py-1 text-xs font-bold text-[#72520b]">
            {editor.petition.kind}
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#002B5C]">Petición de misa</h2>
          <div className="mt-4 text-sm">
            <p className="font-bold">Fecha</p>
            <p>Sábado {editor.petition.day} de noviembre de 2026</p>
            <p className="mt-4 font-bold">Motivo</p>
            <p className="mt-1 rounded-lg bg-[#f3f6fa] p-4 text-slate-600">
              {editor.petition.motive}
            </p>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setEditor({ mode: "delete", petition: editor.petition })}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#9E690B] py-2.5 text-sm font-semibold text-[#9E690B]"
            >
              <Trash2 size={16} /> Eliminar
            </button>
            <button
              type="button"
              onClick={() => setEditor({ mode: "edit", petition: editor.petition })}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F5CA9] py-2.5 text-sm font-semibold text-white"
            >
              <Pencil size={16} /> Editar
            </button>
          </div>
        </ModalShell>
      )}
      {editor?.mode === "delete" && (
        <ModalShell onClose={() => setEditor(null)}>
          <div className="text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#FEEB75] text-[#002B5C]">
              <Trash2 size={29} />
            </span>
            <h2 className="mt-5 font-serif text-3xl font-bold text-[#002B5C]">
              ¿Eliminar petición?
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-slate-600">
              Se quitará del calendario la petición del {editor.petition.day} de noviembre. Esta
              acción no se puede deshacer.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEditor({ mode: "detail", petition: editor.petition })}
                className="rounded-full border border-[#0F5CA9] py-2.5 text-sm font-semibold text-[#0F5CA9]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setPetitions((current) =>
                    current.filter((item) => item.id !== editor.petition.id),
                  );
                  setEditor(null);
                  onDelete();
                }}
                className="rounded-full bg-[#9E690B] py-2.5 text-sm font-semibold text-white"
              >
                Eliminar
              </button>
            </div>
          </div>
        </ModalShell>
      )}
    </section>
  );
}

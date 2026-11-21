import { BookOpen, Church, Eraser, Search, UsersRound } from "lucide-react";
import { useRef, type FormEvent } from "react";

type SacramentKind = "bautismo" | "comunion" | "confirmacion" | "matrimonio";

type SacramentFormProps = {
  kind: SacramentKind;
  onCancel: () => void;
  onSaved: () => void;
};

type Field = {
  label: string;
  type?: "text" | "date" | "select" | "textarea";
  options?: string[];
  span?: 1 | 2 | 3;
};

type Section = {
  title: string;
  fields: Field[];
};

const sharedBookFields: Field[] = [
  { label: "Libro No.", type: "text" },
  { label: "Pág. / Folio", type: "text" },
  { label: "Partida No.", type: "text" },
];

const formContent: Record<SacramentKind, { title: string; barTitle: string; sections: Section[] }> =
  {
    bautismo: {
      title: "Formulario Registro de Bautismos",
      barTitle: "Registro de Sacramentos - Bautismo",
      sections: [
        {
          title: "Referencia del Libro Físico",
          fields: sharedBookFields,
        },
        {
          title: "Datos de la Celebración",
          fields: [
            { label: "Lugar del Bautismo", span: 2 },
            { label: "Fecha del Bautismo", type: "date" },
            { label: "Sacerdote Oficiante (Rev. P.)", span: 3 },
          ],
        },
        {
          title: "Datos del Bautizado y Nacimiento",
          fields: [
            { label: "Nombre(s) del niño(a)", span: 2 },
            { label: "Fecha de nacimiento", type: "date" },
            { label: "Lugar de nacimiento", span: 2 },
            {
              label: "Sexo",
              type: "select",
              options: ["Femenino", "Masculino"],
            },
          ],
        },
        {
          title: "Datos de los Padres y Filiación",
          fields: [
            { label: "Nombre del padre", span: 3 },
            { label: "Nombre de la madre", span: 3 },
          ],
        },
        {
          title: "Testigos y Autoridades",
          fields: [{ label: "Padrino" }, { label: "Madrina" }, { label: "Celebrante" }],
        },
        {
          title: "Cierre y Notas Oficiales",
          fields: [
            { label: "Lugar de emisión", span: 2 },
            { label: "Fecha de emisión", type: "date" },
            { label: "Observaciones", type: "textarea", span: 3 },
          ],
        },
      ],
    },
    comunion: {
      title: "Formulario Registro de Primera Comunión",
      barTitle: "Registro de Sacramentos - Primera Comunión",
      sections: [
        {
          title: "Referencia del Libro Físico",
          fields: sharedBookFields,
        },
        {
          title: "Datos del Comulgante y Nacimiento",
          fields: [
            { label: "Nombre completo", span: 2 },
            {
              label: "Sexo",
              type: "select",
              options: ["Femenino", "Masculino"],
            },
            { label: "Lugar de nacimiento", span: 2 },
            { label: "Fecha de nacimiento", type: "date" },
          ],
        },
        {
          title: "Datos de los Padres y Filiación",
          fields: [
            { label: "Nombre del padre", span: 3 },
            { label: "Nombre de la madre", span: 3 },
            { label: "Bautizado en", span: 2 },
            { label: "Fecha de bautismo", type: "date" },
            { label: "Celebrante del bautismo", span: 3 },
          ],
        },
        {
          title: "Datos de la Celebración",
          fields: [
            { label: "Lugar de la celebración", span: 2 },
            { label: "Fecha de la Primera Comunión", type: "date" },
            { label: "Sacerdote Celebrante (Rev. P.)", span: 3 },
          ],
        },
        {
          title: "Cierre y Emisión",
          fields: [
            { label: "Lugar de emisión", span: 2 },
            { label: "Fecha de emisión", type: "date" },
          ],
        },
      ],
    },
    confirmacion: {
      title: "Formulario Registro de Confirmación",
      barTitle: "Registro de Sacramentos - Confirmación",
      sections: [
        {
          title: "Referencia del Libro Físico",
          fields: sharedBookFields,
        },
        {
          title: "Datos de la Celebración",
          fields: [
            { label: "Parroquia / Iglesia de celebración", span: 2 },
            { label: "Fecha de confirmación", type: "date" },
            { label: "Realizada por Monseñor", span: 3 },
          ],
        },
        {
          title: "Datos del Confirmado y Antecedentes",
          fields: [
            { label: "Nombre del confirmando", span: 2 },
            { label: "Fecha de nacimiento", type: "date" },
            { label: "Lugar de nacimiento", span: 2 },
            { label: "Fecha de bautismo", type: "date" },
            { label: "Bautizado en", span: 3 },
          ],
        },
        {
          title: "Datos de los Padres y Filiación",
          fields: [
            { label: "Nombre del padre", span: 3 },
            { label: "Nombre de la madre", span: 3 },
            { label: "Nombre del padrino o madrina", span: 3 },
          ],
        },
        {
          title: "Cierre y Emisión",
          fields: [
            { label: "Ciudad de emisión", span: 2 },
            { label: "Fecha de emisión", type: "date" },
          ],
        },
      ],
    },
    matrimonio: {
      title: "Formulario Registro de Celebración Matrimonial",
      barTitle: "Registro de Sacramentos - Matrimonio",
      sections: [
        {
          title: "Referencia del Libro Físico",
          fields: sharedBookFields,
        },
        {
          title: "Datos de la Celebración Matrimonial",
          fields: [
            { label: "Iglesia o templo de celebración", span: 2 },
            { label: "Fecha del matrimonio", type: "date" },
            {
              label: "Sacerdote u Oficiante (En presencia del R.P.)",
              span: 3,
            },
          ],
        },
        {
          title: "Datos de los Contrayentes",
          fields: [
            { label: "Nombre completo del esposo", span: 3 },
            { label: "Nombre completo de la esposa", span: 3 },
          ],
        },
        {
          title: "Testigos del Matrimonio",
          fields: [
            { label: "Testigo 1", span: 3 },
            { label: "Testigo 2", span: 3 },
          ],
        },
        {
          title: "Cierre y Emisión",
          fields: [
            { label: "Lugar de expedición de la constancia", span: 2 },
            { label: "Fecha de expedición", type: "date" },
          ],
        },
      ],
    },
  };

function fieldSpan(span: Field["span"]) {
  if (span === 3) return "md:col-span-3";
  if (span === 2) return "md:col-span-2";
  return "";
}

function InputField({ field, index }: { field: Field; index: number }) {
  const id = `sacrament-field-${index}-${field.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const classes =
    "h-8 w-full rounded-[5px] border border-[#86a0ad] bg-white px-2 text-[11px] text-[#163a58] outline-none transition focus:border-[#0F5CA9] focus:ring-2 focus:ring-[#4FA3E3]/20";

  return (
    <label className={`block min-w-0 ${fieldSpan(field.span)}`} htmlFor={id}>
      <span className="mb-1 block text-[10px] font-bold text-[#163a58]">{field.label}</span>
      {field.type === "select" ? (
        <select className={classes} defaultValue="" id={id}>
          <option disabled value="">
            Seleccionar
          </option>
          {field.options?.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          className={`${classes} min-h-16 resize-y py-2`}
          id={id}
          placeholder="Escriba aquí..."
        />
      ) : (
        <input className={classes} id={id} type={field.type ?? "text"} />
      )}
    </label>
  );
}

export default function SacramentForm({ kind, onCancel, onSaved }: SacramentFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const content = formContent[kind];

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSaved();
  }

  function clearForm() {
    formRef.current?.reset();
  }

  return (
    <div className="mx-auto w-full max-w-[1080px] pb-8 text-[#002B5C]">
      <div className="mb-4 flex min-h-12 items-center gap-3 rounded-full bg-gradient-to-r from-[#002B5C] via-[#0F5CA9] to-[#4FA3E3] px-5 text-white shadow-sm">
        <Church aria-hidden="true" className="size-5 shrink-0" />
        <h1 className="text-sm font-bold sm:text-base">{content.barTitle}</h1>
      </div>

      <form
        className="rounded-[18px] border border-[#cad7df] bg-[#f7fbff] p-4 shadow-[0_8px_24px_rgba(0,43,92,0.06)] sm:p-6"
        onSubmit={submit}
        ref={formRef}
      >
        <div className="mb-5 flex items-center justify-center gap-2">
          <BookOpen aria-hidden="true" className="size-5 text-[#DCA123]" />
          <h2 className="text-center text-base font-bold text-[#002B5C] sm:text-lg">
            {content.title}
          </h2>
        </div>

        <div className="mb-4 grid gap-2 sm:grid-cols-[auto_minmax(180px,1fr)_38px_auto] sm:items-end">
          <label className="text-[10px] font-bold text-[#163a58]" htmlFor="find-member">
            Buscar feligrés
          </label>
          <input
            className="h-8 rounded-[5px] border border-[#86a0ad] bg-white px-2 text-xs outline-none focus:border-[#0F5CA9] focus:ring-2 focus:ring-[#4FA3E3]/20"
            id="find-member"
            placeholder="Nombre o número de identidad"
          />
          <button
            aria-label="Buscar feligrés"
            className="flex h-8 items-center justify-center rounded-[5px] bg-[#0F5CA9] text-white transition hover:bg-[#002B5C]"
            type="button"
          >
            <Search aria-hidden="true" className="size-4" />
          </button>
          <button
            className="flex h-8 items-center justify-center gap-1 rounded-[5px] border border-dashed border-[#0F5CA9] bg-white px-3 text-[10px] font-semibold text-[#0F5CA9] transition hover:bg-[#eaf5fd]"
            onClick={clearForm}
            type="button"
          >
            <Eraser aria-hidden="true" className="size-3.5" />
            Limpiar filtros
          </button>
        </div>

        <div className="space-y-4">
          {content.sections.map((section, sectionIndex) => (
            <fieldset
              className="rounded-xl border border-[#d5e0e7] bg-white/75 px-3 pb-3 pt-2"
              key={section.title}
            >
              <legend className="flex items-center gap-1.5 px-1 text-[11px] font-bold text-[#002B5C]">
                <UsersRound aria-hidden="true" className="size-3.5 text-[#DCA123]" />
                {section.title}
              </legend>
              <div className="mt-1 grid gap-x-3 gap-y-2 md:grid-cols-3">
                {section.fields.map((field, fieldIndex) => (
                  <InputField
                    field={field}
                    index={sectionIndex * 20 + fieldIndex}
                    key={`${section.title}-${field.label}`}
                  />
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#d6e1e8] pt-4">
          <button
            className="flex h-9 items-center gap-1.5 rounded-full border border-dashed border-[#0F5CA9] bg-white px-5 text-xs font-bold text-[#0F5CA9] transition hover:bg-[#eaf5fd]"
            onClick={clearForm}
            type="button"
          >
            <Eraser aria-hidden="true" className="size-4" />
            Limpiar casillas
          </button>
          <div className="flex flex-1 justify-end gap-3">
            <button
              className="h-9 min-w-28 rounded-full border border-[#0F5CA9] bg-white px-5 text-xs font-bold text-[#0F5CA9] transition hover:bg-[#eef7fd]"
              onClick={onCancel}
              type="button"
            >
              Cancelar
            </button>
            <button
              className="h-9 min-w-28 rounded-full bg-[#0F5CA9] px-5 text-xs font-bold text-white shadow-sm transition hover:bg-[#002B5C]"
              type="submit"
            >
              Registrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

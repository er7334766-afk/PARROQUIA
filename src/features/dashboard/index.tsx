import { Baby, BookOpen, Church, Cross, HeartHandshake, TrendingUp, Users } from "lucide-react";

type DashboardProps = {
  onNavigate: (view: string) => void;
};

const cards = [
  {
    label: "Feligreses registrados",
    value: "1,250",
    icon: Users,
    view: "feligreses",
    tone: "dark",
  },
  {
    label: "Registros sacramentales",
    value: "846",
    icon: BookOpen,
    view: "bautismo",
    tone: "gold",
  },
  {
    label: "Bautismos",
    value: "328",
    icon: Baby,
    view: "bautismo",
    tone: "mid",
  },
  {
    label: "Primeras comuniones",
    value: "214",
    icon: Church,
    view: "primera-comunion",
    tone: "mid",
  },
  {
    label: "Confirmaciones",
    value: "187",
    icon: Cross,
    view: "confirmacion",
    tone: "gold",
  },
  {
    label: "Matrimonios",
    value: "117",
    icon: HeartHandshake,
    view: "matrimonio",
    tone: "dark",
  },
] as const;

const cardClasses = {
  dark: "bg-[#002B5C] text-white",
  mid: "bg-[#416F98] text-white",
  gold: "bg-[#F2E3BC] text-[#002B5C]",
};

function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-4 py-7 sm:px-7">
      <div className="mb-7">
        <h1 className="text-[25px] font-bold leading-tight text-[#002B5C]">
          ¡Bienvenido al sistema!
        </h1>
        <p className="mt-1 text-[13px] text-slate-500">Resumen general de la gestión parroquial</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.label}
              className={`overflow-hidden rounded-[22px] shadow-sm ${cardClasses[card.tone]}`}
            >
              <div className="flex min-h-[112px] items-center gap-5 px-6 py-4">
                <div
                  className={`flex size-16 shrink-0 items-center justify-center rounded-full ${
                    card.tone === "gold"
                      ? "bg-white/55 text-[#DCA123]"
                      : "bg-white/12 text-[#FEEB75]"
                  }`}
                >
                  <Icon size={39} strokeWidth={1.45} />
                </div>
                <div>
                  <strong className="block text-[29px] leading-none">{card.value}</strong>
                  <span className="mt-2 block text-[13px] font-semibold">{card.label}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate(card.view)}
                className={`flex w-full items-center justify-center gap-2 border-t px-4 py-2.5 text-[12px] font-semibold transition hover:bg-white/10 ${
                  card.tone === "gold"
                    ? "border-[#D1C195] text-[#002B5C]"
                    : "border-white/30 text-white"
                }`}
              >
                Ver detalles <span aria-hidden="true">→</span>
              </button>
            </article>
          );
        })}
      </div>

      <article className="mt-8 overflow-hidden rounded-[24px] border border-[#C9D7E3] bg-white shadow-sm">
        <div className="flex flex-col gap-3 bg-gradient-to-r from-[#002B5C] via-[#0F5CA9] to-[#4FA3E3] px-6 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp size={28} strokeWidth={1.6} />
            <h2 className="text-[17px] font-bold">Registros por mes</h2>
          </div>
          <div className="flex gap-1 text-[11px] font-semibold">
            {["2022", "2023", "2024", "2025", "2026"].map((year) => (
              <span
                key={year}
                className={`rounded-full px-3 py-1 ${
                  year === "2026" ? "bg-[#FEEB75] text-[#002B5C]" : "bg-white/15"
                }`}
              >
                {year}
              </span>
            ))}
          </div>
        </div>
        <div className="relative h-[255px] px-5 pb-5 pt-7 sm:px-9">
          <div className="absolute inset-x-9 top-7 bottom-12 flex flex-col justify-between text-[10px] text-slate-400">
            {[50, 40, 30, 20, 10].map((value) => (
              <div key={value} className="flex items-center gap-3">
                <span className="w-5 text-right">{value}</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
            ))}
          </div>
          <svg
            viewBox="0 0 900 190"
            className="absolute inset-x-11 bottom-9 h-[185px] w-[calc(100%-5.5rem)] overflow-visible"
            aria-label="Gráfica de registros mensuales"
            role="img"
          >
            <defs>
              <linearGradient id="dashboard-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#4FA3E3" stopOpacity=".28" />
                <stop offset="100%" stopColor="#4FA3E3" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M25 158 L100 148 L175 151 L250 127 L325 135 L400 112 L475 105 L550 79 L625 85 L700 48 L775 36 L855 31 L855 180 L25 180 Z"
              fill="url(#dashboard-area)"
            />
            <path
              d="M25 158 L100 148 L175 151 L250 127 L325 135 L400 112 L475 105 L550 79 L625 85 L700 48 L775 36 L855 31"
              fill="none"
              stroke="#0F5CA9"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            {[
              ["25", "158"],
              ["250", "127"],
              ["475", "105"],
              ["700", "48"],
              ["855", "31"],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} fill="#0F5CA9" r="5" />
            ))}
          </svg>
          <div className="absolute inset-x-12 bottom-3 flex justify-between text-[10px] font-semibold text-slate-500">
            {["Ene", "Mar", "May", "Jul", "Sep", "Nov", "Dic"].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}

export default Dashboard;

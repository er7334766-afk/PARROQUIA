import { useState, type ReactNode } from "react";
import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  FileBarChart,
  History,
  Home,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";

type AppShellProps = {
  children: ReactNode;
  activeView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
};

const navigation = [
  { id: "dashboard", label: "Inicio", icon: Home },
  { id: "feligreses-list", label: "Feligreses", icon: Users },
  { id: "solicitudes", label: "Solicitudes", icon: CalendarDays },
  { id: "reportes", label: "Reportes", icon: FileBarChart },
  { id: "logs", label: "Logs", icon: History },
  { id: "configuracion", label: "Configuración", icon: Settings },
];

const sacraments = [
  ["sacramento-bautismo", "Bautismo"],
  ["sacramento-comunion", "Primera Comunión"],
  ["sacramento-confirmacion", "Confirmación"],
  ["sacramento-matrimonio", "Matrimonio"],
];

export default function AppShell({ children, activeView, onNavigate, onLogout }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sacramentsOpen, setSacramentsOpen] = useState(activeView.startsWith("sacramento"));
  const [accountOpen, setAccountOpen] = useState(false);

  const navigate = (view: string) => {
    setMobileOpen(false);
    onNavigate(view);
  };

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-[#002B5C]">
      <button
        className="fixed left-4 top-4 z-50 rounded-lg bg-[#002B5C] p-2 text-white shadow-lg lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menú"
      >
        <Menu size={22} />
      </button>

      {mobileOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/45 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Cerrar menú"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[230px] flex-col overflow-y-auto bg-[#002B5C] px-4 pb-5 text-white transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute right-3 top-3 text-white/80 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Cerrar menú"
        >
          <X size={22} />
        </button>
        <img
          src={`${import.meta.env.BASE_URL}assets/parish-logo.png`}
          alt="Parroquia San Juan Bautista"
          className="mx-auto mt-7 h-36 w-auto object-contain"
        />
        <nav className="mt-5 space-y-1.5" aria-label="Navegación principal">
          {navigation.slice(0, 2).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => navigate(id)}
              className={`sidebar-link ${activeView === id || activeView.startsWith(id.split("-")[0]) ? "sidebar-link-active" : ""}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}

          <button
            onClick={() => setSacramentsOpen((open) => !open)}
            className={`sidebar-link ${activeView.startsWith("sacramento") ? "sidebar-link-active" : ""}`}
          >
            <BookOpen size={18} />
            <span className="flex-1 text-left">Sacramentos</span>
            <ChevronDown size={15} className={sacramentsOpen ? "rotate-180" : ""} />
          </button>
          {sacramentsOpen && (
            <div className="ml-7 space-y-1 border-l border-white/20 pl-3">
              {sacraments.map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => navigate(id)}
                  className={`block w-full rounded-md px-2 py-1.5 text-left text-xs transition ${
                    activeView === id
                      ? "bg-white/15 text-[#FEEB75]"
                      : "text-white/75 hover:bg-white/10"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {navigation.slice(2).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => navigate(id)}
              className={`sidebar-link ${activeView === id ? "sidebar-link-active" : ""}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-8 text-center text-[10px] leading-relaxed text-white/50">
          Sistema de Gestión Parroquial
          <br />
          Trujillo, Colón
        </div>
      </aside>

      <div className="lg:pl-[230px]">
        <header className="sticky top-0 z-20 px-4 pt-4 sm:px-6 lg:px-9">
          <div className="gold-top flex h-[62px] items-center justify-between rounded-2xl bg-white px-5 shadow-sm sm:px-7">
            <h1 className="ml-10 text-sm font-bold text-[#002B5C] sm:ml-0 sm:text-base">
              Parroquia San Juan Bautista
            </h1>
            <div className="relative">
              <button
                onClick={() => setAccountOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full px-2 py-1.5 text-xs font-semibold hover:bg-slate-50"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#002B5C] text-white">
                  <Users size={15} />
                </span>
                <span className="hidden sm:inline">Administrador</span>
                <ChevronDown size={14} />
                <span className="h-2 w-2 rounded-sm bg-green-600" />
              </button>
              {accountOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                  <button
                    onClick={() => {
                      setAccountOpen(false);
                      onLogout();
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-slate-100"
                  >
                    <LogOut size={16} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1380px] p-4 sm:p-6 lg:p-9">{children}</main>
      </div>
    </div>
  );
}

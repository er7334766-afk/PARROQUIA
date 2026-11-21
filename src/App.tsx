import { useCallback, useEffect, useRef, useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import AppShell from "./components/layout/AppShell";
import ModalSystem, { type ModalKind } from "./components/modals/ModalSystem";
import Certificate from "./features/certificados/Certificate";
import Dashboard from "./features/dashboard";
import Feligreses from "./features/feligreses";
import Logs from "./features/logs";
import Reports from "./features/reportes";
import SacramentForm from "./features/sacramentos/SacramentForm";
import Calendar from "./features/solicitudes";

type View =
  | "login"
  | "dashboard"
  | "feligreses-list"
  | "feligreses-profile"
  | "feligreses-edit"
  | "feligreses-new"
  | "sacramento-bautismo"
  | "sacramento-comunion"
  | "sacramento-confirmacion"
  | "sacramento-matrimonio"
  | "solicitudes"
  | "reportes"
  | "logs"
  | "certificado-bautismo"
  | "certificado-comunion"
  | "certificado-confirmacion"
  | "certificado-matrimonio";

const demoStates: { kind: Exclude<ModalKind, null>; label: string }[] = [
  { kind: "offline", label: "Sin conexión" },
  { kind: "permissions", label: "Sin permisos" },
  { kind: "success", label: "Registro guardado" },
  { kind: "inactivity", label: "Sesión inactiva" },
  { kind: "logout", label: "Cerrar sesión" },
  { kind: "delete", label: "Eliminar registro" },
  { kind: "loading", label: "Pantalla de carga" },
  { kind: "loadError", label: "Error al cargar" },
  { kind: "connectionLost", label: "Pérdida de conexión" },
  { kind: "loginError", label: "Error de inicio" },
  { kind: "recordError", label: "Error de registro" },
];

function Login({ onLogin, onError }: { onLogin: () => void; onError: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (user.trim() !== "PARROQUIA" || password !== "PARROQUIA") {
      onError();
      return;
    }
    onLogin();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef3fb] p-4 sm:p-8">
      <div className="login-card grid w-full max-w-[1040px] overflow-hidden bg-[#f7f9fd] shadow-2xl md:grid-cols-[1.08fr_1fr]">
        <section className="login-brand relative flex min-h-[390px] flex-col items-center justify-center overflow-hidden bg-[#002B5C] px-10 py-12 text-center text-white md:min-h-[630px]">
          <img
            src="/assets/parish-logo.png"
            alt="Parroquia San Juan Bautista"
            className="relative z-10 h-[300px] w-auto object-contain md:h-[365px]"
          />
          <h1 className="relative z-10 mt-5 text-3xl font-bold leading-tight">
            Sistema de Gestión
            <br />
            Parroquial
          </h1>
        </section>
        <section className="flex items-center px-7 py-12 sm:px-14 md:px-16">
          <form onSubmit={submit} className="w-full">
            <h2 className="text-4xl font-extrabold text-[#002B5C]">Bienvenido</h2>
            <p className="mt-2 text-sm text-slate-600">Ingresa tus credenciales</p>
            <label
              className="mt-10 block text-sm font-semibold text-slate-700"
              htmlFor="login-user"
            >
              Usuario
            </label>
            <input
              id="login-user"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              className="mt-2 h-12 w-full rounded-xl border-0 bg-[#c8d5e3] px-4 text-[#002B5C] outline-none ring-[#0F5CA9] focus:ring-2"
              autoComplete="username"
            />
            <label
              className="mt-6 block text-sm font-semibold text-slate-700"
              htmlFor="login-password"
            >
              Contraseña
            </label>
            <div className="relative mt-2">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 w-full rounded-xl border-0 bg-[#c8d5e3] px-4 pr-12 text-[#002B5C] outline-none ring-[#0F5CA9] focus:ring-2"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((show) => !show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#002B5C]"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="mt-10 h-12 w-full rounded-xl bg-[#e6ad32] text-sm font-bold text-[#1e293b] shadow-sm transition hover:bg-[#DCA123]"
            >
              Iniciar Sesión
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default function App() {
  const [view, setView] = useState<View>("login");
  const [modal, setModal] = useState<ModalKind>(null);
  const [demoOpen, setDemoOpen] = useState(false);
  const [countdown, setCountdown] = useState(39);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const authenticated = view !== "login";

  const resetInactivity = useCallback(() => {
    if (!authenticated) return;
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      setCountdown(39);
      setModal("inactivity");
    }, 90_000);
  }, [authenticated]);

  useEffect(() => {
    const toggleDemo = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "d") {
        event.preventDefault();
        setDemoOpen((open) => !open);
      } else if (event.key === "Escape") {
        setDemoOpen(false);
        if (modal !== "loading") setModal(null);
      }
    };
    window.addEventListener("keydown", toggleDemo);
    return () => window.removeEventListener("keydown", toggleDemo);
  }, [modal]);

  useEffect(() => {
    if (!authenticated) return;
    const activity = () => {
      if (modal !== "inactivity") resetInactivity();
    };
    const events = ["mousedown", "keydown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, activity));
    resetInactivity();
    return () => {
      events.forEach((event) => window.removeEventListener(event, activity));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [authenticated, modal, resetInactivity]);

  useEffect(() => {
    if (modal !== "inactivity") return;
    const timer = window.setInterval(() => {
      setCountdown((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          setModal(null);
          setView("login");
          return 39;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [modal]);

  useEffect(() => {
    const lost = () => {
      if (authenticated) setModal("connectionLost");
    };
    window.addEventListener("offline", lost);
    return () => window.removeEventListener("offline", lost);
  }, [authenticated]);

  useEffect(
    () => () => {
      if (pendingTimer.current) clearTimeout(pendingTimer.current);
    },
    [],
  );

  const closeModal = () => {
    setModal(null);
    resetInactivity();
  };

  const navigate = (requested: string) => {
    if (!navigator.onLine) {
      setModal("offline");
      return;
    }
    if (requested === "configuracion") {
      setModal("permissions");
      return;
    }
    const normalized: Record<string, View> = {
      feligreses: "feligreses-list",
      bautismo: "sacramento-bautismo",
      "primera-comunion": "sacramento-comunion",
      confirmacion: "sacramento-confirmacion",
      matrimonio: "sacramento-matrimonio",
    };
    setView(normalized[requested] ?? (requested as View));
  };

  const saveRecord = () => {
    if (!navigator.onLine) {
      setModal("offline");
      return;
    }
    setModal("loading");
    pendingTimer.current = setTimeout(() => setModal("success"), 1150);
  };

  const startLogin = () => {
    setModal("loading");
    pendingTimer.current = setTimeout(() => {
      setModal(null);
      setView("dashboard");
    }, 1200);
  };

  const logout = () => {
    setModal(null);
    setDemoOpen(false);
    setView("login");
  };

  const confirmModal = () => {
    if (modal === "logout" || modal === "inactivity") logout();
    else closeModal();
  };

  const renderView = () => {
    if (view === "dashboard") return <Dashboard onNavigate={navigate} />;
    if (view.startsWith("feligreses-")) {
      return (
        <Feligreses
          mode={view.replace("feligreses-", "") as "list" | "profile" | "edit" | "new"}
          onNavigate={navigate}
          onSaved={saveRecord}
          onDelete={() => setModal("delete")}
          onOpenCertificate={(kind) => setView(`certificado-${kind}` as View)}
        />
      );
    }
    if (view.startsWith("sacramento-")) {
      return (
        <SacramentForm
          kind={
            view.replace("sacramento-", "") as
              | "bautismo"
              | "comunion"
              | "confirmacion"
              | "matrimonio"
          }
          onCancel={() => setView("dashboard")}
          onSaved={saveRecord}
        />
      );
    }
    if (view === "solicitudes") {
      return <Calendar onSaved={saveRecord} onDelete={() => undefined} />;
    }
    if (view === "reportes") return <Reports />;
    if (view === "logs") return <Logs />;
    return <Dashboard onNavigate={navigate} />;
  };

  if (view.startsWith("certificado-")) {
    return (
      <Certificate
        kind={
          view.replace("certificado-", "") as
            | "bautismo"
            | "comunion"
            | "confirmacion"
            | "matrimonio"
        }
        onBack={() => setView("feligreses-profile")}
      />
    );
  }

  return (
    <>
      {view === "login" ? (
        <Login onLogin={startLogin} onError={() => setModal("loginError")} />
      ) : (
        <AppShell activeView={view} onNavigate={navigate} onLogout={() => setModal("logout")}>
          {renderView()}
        </AppShell>
      )}

      <ModalSystem
        kind={modal}
        countdown={countdown}
        onClose={closeModal}
        onConfirm={confirmModal}
        onRetry={() => {
          if (navigator.onLine) closeModal();
          else setModal("offline");
        }}
      />

      {demoOpen && (
        <aside className="fixed bottom-5 right-5 z-[120] w-[280px] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#002B5C]">Estados de demo</h2>
              <p className="text-[10px] text-slate-500">Ctrl + Alt + D</p>
            </div>
            <button
              onClick={() => setDemoOpen(false)}
              className="rounded-full bg-slate-100 p-1.5"
              aria-label="Cerrar panel de demo"
            >
              <X size={15} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {demoStates.map((state) => (
              <button
                key={state.kind}
                onClick={() => {
                  setDemoOpen(false);
                  setModal(state.kind);
                }}
                className="rounded-lg border border-slate-200 px-2 py-2 text-left text-[11px] font-semibold text-[#002B5C] hover:border-[#0F5CA9] hover:bg-blue-50"
              >
                {state.label}
              </button>
            ))}
          </div>
        </aside>
      )}
    </>
  );
}

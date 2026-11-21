import type { ReactNode } from "react";
import {
  CircleCheckBig,
  CircleX,
  Clock3,
  LogOut,
  LockKeyhole,
  TriangleAlert,
  Trash2,
  WifiOff,
  X,
} from "lucide-react";

export type ModalKind =
  | "offline"
  | "permissions"
  | "success"
  | "inactivity"
  | "logout"
  | "delete"
  | "loading"
  | "loadError"
  | "connectionLost"
  | "loginError"
  | "recordError"
  | null;

type ModalSystemProps = {
  kind: ModalKind;
  countdown?: number;
  onClose: () => void;
  onConfirm?: () => void;
  onRetry?: () => void;
};

function Dialog({
  children,
  onClose,
  dismissible = true,
  wide = false,
}: {
  children: ReactNode;
  onClose: () => void;
  dismissible?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#00152e]/65 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`gold-modal relative w-full rounded-[28px] bg-white px-7 py-10 text-center shadow-2xl ${
          wide ? "max-w-[560px]" : "max-w-[470px]"
        }`}
      >
        {dismissible && (
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full bg-slate-100 p-1.5 text-slate-500 hover:bg-slate-200"
            aria-label="Cerrar"
          >
            <X size={17} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

const PrimaryButton = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => (
  <button onClick={onClick} className="btn-primary min-w-32">
    {children}
  </button>
);

const SecondaryButton = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => (
  <button onClick={onClick} className="btn-secondary min-w-32">
    {children}
  </button>
);

export default function ModalSystem({
  kind,
  countdown = 39,
  onClose,
  onConfirm = onClose,
  onRetry = onClose,
}: ModalSystemProps) {
  if (!kind) return null;

  if (kind === "loading") {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#00152e]/65 p-4">
        <div className="loading-frame w-full max-w-[470px] rounded-[26px] bg-[#0F5CA9] p-5 shadow-2xl">
          <div className="flex min-h-[285px] flex-col items-center justify-center rounded-2xl bg-[#dce5ee] px-6 text-center">
            <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-full border-[7px] border-[#4FA3E3] bg-[#397db9] shadow-inner">
              <span className="loading-dot bg-[#FEEB75]" />
              <span className="loading-dot bg-[#0F5CA9]" />
              <span className="loading-dot bg-[#9E690B]" />
            </div>
            <h2 className="text-xl font-bold text-[#002B5C]">Procesando solicitud...</h2>
            <p className="mt-4 text-sm text-slate-600">Por favor espere un momento</p>
          </div>
        </div>
      </div>
    );
  }

  const iconClass = "mx-auto mb-5 h-16 w-16";
  const buttons = (secondary: string, primary: string, primaryAction = onConfirm) => (
    <div className="mt-7 flex flex-wrap justify-center gap-3">
      <SecondaryButton onClick={onClose}>{secondary}</SecondaryButton>
      <PrimaryButton onClick={primaryAction}>{primary}</PrimaryButton>
    </div>
  );

  if (kind === "offline") {
    return (
      <Dialog onClose={onClose}>
        <WifiOff className={`${iconClass} text-red-600`} strokeWidth={1.7} />
        <h2 className="modal-title">Sin Conexión</h2>
        <p className="modal-copy">
          No pudimos conectarnos a internet. Revisa tu WiFi o tus datos móviles e inténtalo de
          nuevo.
        </p>
        {buttons("Cancelar", "Reintentar", onRetry)}
      </Dialog>
    );
  }

  if (kind === "permissions") {
    return (
      <Dialog onClose={onClose}>
        <LockKeyhole className={`${iconClass} text-slate-700`} strokeWidth={1.5} />
        <h2 className="modal-title">Sin Permisos</h2>
        <p className="modal-copy">
          No tienes los permisos necesarios para acceder a esta ventana. Contacta al administrador.
        </p>
        <div className="mt-7">
          <PrimaryButton onClick={onClose}>Cerrar</PrimaryButton>
        </div>
      </Dialog>
    );
  }

  if (kind === "success") {
    return (
      <Dialog onClose={onClose}>
        <CircleCheckBig className={`${iconClass} text-[#eab43b]`} strokeWidth={2.2} />
        <h2 className="modal-title leading-tight">Registro guardado exitosamente</h2>
        <p className="modal-copy">El registro se guardó correctamente en el sistema.</p>
        <div className="mt-7">
          <PrimaryButton onClick={onClose}>Cerrar</PrimaryButton>
        </div>
      </Dialog>
    );
  }

  if (kind === "inactivity") {
    return (
      <Dialog onClose={onClose} dismissible={false} wide>
        <Clock3 className="mx-auto mb-4 h-12 w-12 text-[#0F5CA9]" />
        <h2 className="modal-title text-xl">Sesión de inactividad</h2>
        <p className="modal-copy">Tu sesión está a punto de cerrarse por falta de actividad</p>
        <p className="mt-5 text-sm font-semibold text-slate-700">
          ¿Deseas continuar con tu sesión?
          <br />
          Tiempo restante ({countdown}s...)
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <PrimaryButton onClick={onClose}>Continuar sesión</PrimaryButton>
          <SecondaryButton onClick={onConfirm}>Cerrar sesión</SecondaryButton>
        </div>
      </Dialog>
    );
  }

  if (kind === "logout") {
    return (
      <Dialog onClose={onClose} dismissible={false} wide>
        <LogOut className={`${iconClass} text-[#0F5CA9]`} />
        <h2 className="modal-title leading-tight">¿Estás seguro de que deseas cerrar sesión?</h2>
        <p className="modal-copy">Asegúrate de haber guardado tus cambios antes de salir</p>
        {buttons("Volver al menú principal", "Cerrar sesión")}
      </Dialog>
    );
  }

  if (kind === "delete") {
    return (
      <Dialog onClose={onClose} dismissible={false} wide>
        <TriangleAlert className={`${iconClass} text-[#0F5CA9]`} />
        <h2 className="modal-title leading-tight">
          ¿Estás seguro de que deseas eliminar este registro?
        </h2>
        <p className="modal-copy">Esta acción es permanente y no se podrá deshacer</p>
        {buttons("Cancelar", "Sí, eliminar")}
      </Dialog>
    );
  }

  const errorContent = {
    loadError: [
      "No fue posible cargar la información",
      "Intenta nuevamente o vuelve al inicio",
      "Volver al inicio",
    ],
    connectionLost: [
      "Pérdida de conexión a internet...",
      "Intenta nuevamente o vuelve al inicio",
      "Volver al inicio",
    ],
    loginError: [
      "No fue posible iniciar sesión...",
      "Intenta nuevamente o vuelve al inicio",
      "Volver al inicio",
    ],
    recordError: [
      "No fue posible ingresar el registro...",
      "Intenta nuevamente o cancela el intento",
      "Cancelar",
    ],
  }[kind];

  if (errorContent) {
    return (
      <Dialog onClose={onClose} wide>
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-[#eef4fb]">
          {kind === "loginError" ? (
            <CircleX className="h-16 w-16 text-[#0F5CA9]" strokeWidth={1.6} />
          ) : (
            <TriangleAlert className="h-16 w-16 text-[#0F5CA9]" strokeWidth={1.6} />
          )}
        </div>
        <h2 className="modal-title">Ha ocurrido un error</h2>
        <p className="mt-3 text-base text-slate-700">{errorContent[0]}</p>
        <p className="mt-3 text-sm text-slate-500">{errorContent[1]}</p>
        {buttons(errorContent[2], "Reintentar", onRetry)}
      </Dialog>
    );
  }

  return null;
}

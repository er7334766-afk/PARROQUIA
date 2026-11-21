import { ArrowLeft, Printer } from "lucide-react";
import "./certificate.css";

type CertificateKind = "bautismo" | "comunion" | "confirmacion" | "matrimonio";

type CertificateProps = {
  kind: CertificateKind;
  onBack: () => void;
};

const data = {
  bautismo: {
    title: "CERTIFICADO DE BAUTISMO",
    content: (
      <>
        <p>
          El Infrascrito, Cura Párroco de: <span className="cert-line" /> de la Diócesis de Trujillo
          (Deptos. de Colón y Gracias a Dios) Certifica que en el Libro de Bautismos No.{" "}
          <span className="cert-line short" /> Pág. <span className="cert-line short" /> Hay una
          partida que dice:
        </p>
        <p>
          En <span className="cert-line long" /> el día <span className="cert-line" /> de{" "}
          <span className="cert-line" /> de 20
          <span className="cert-line short" />, el Rev. P. <span className="cert-line long" />{" "}
          bautizó solemnemente a un niño que dijeron haber nacido en{" "}
          <span className="cert-line long" /> Depto. de Colón, el día <span className="cert-line" />{" "}
          y a quien se puso por nombre <strong>José Daniel Martínez López</strong>.
        </p>
        <p>
          Hijo de <span className="cert-line long" /> y de <span className="cert-line long" />.
          Padrino: <span className="cert-line" /> Madrina: <span className="cert-line" />{" "}
          Celebrante: <span className="cert-line" />.
        </p>
        <p>
          Y para que conste, lo firma y sella en Trujillo, Colón, a los{" "}
          <span className="cert-line short" /> días del mes de <span className="cert-line" /> de 20
          <span className="cert-line short" />.
        </p>
        <p className="mt-5 font-semibold">
          NOTAS MARGINALES: <span className="cert-line long" />
        </p>
      </>
    ),
  },
  confirmacion: {
    title: "CERTIFICADO DE CONFIRMA",
    content: (
      <>
        <p>
          EL INFRASCRITO PÁRROCO DE LA IGLESIA PARROQUIA SAN JUAN BAUTISTA DE LA DIÓCESIS DE
          TRUJILLO
        </p>
        <h3 className="my-4 text-center font-serif text-lg font-bold">CERTIFICA QUE:</h3>
        <p>
          EN EL LIBRO DE CONFIRMAS No. <span className="cert-line" /> PÁG.{" "}
          <span className="cert-line" /> AÑO <span className="cert-line" />
        </p>
        <p>
          NOMBRE DEL CONFIRMANDO: <strong>José Daniel Martínez López</strong>
        </p>
        <p>
          LUGAR Y FECHA DE NACIMIENTO: Trujillo, Colón <span className="cert-line" />
        </p>
        <p>
          BAUTIZADO EN: <span className="cert-line long" /> EL DÍA <span className="cert-line" />
        </p>
        <p>
          NOMBRE DEL PADRE: <span className="cert-line long" />
        </p>
        <p>
          NOMBRE DE LA MADRE: <span className="cert-line long" />
        </p>
        <p>
          NOMBRE DEL PADRINO O MADRINA: <span className="cert-line long" />
        </p>
        <p>
          REALIZADA POR MONSEÑOR: <span className="cert-line long" />
        </p>
        <p className="mt-5">
          Y para los fines que convenga, se extiende el presente certificado en la ciudad de
          Trujillo.
        </p>
      </>
    ),
  },
  comunion: {
    title: "CERTIFICADO DE PRIMERA COMUNIÓN",
    content: (
      <>
        <p>
          El Infrascrito Párroco de la Iglesia Parroquia San Juan Bautista de la Diócesis de
          Trujillo, Departamentos de Colón y Gracias a Dios.
        </p>
        <p>
          Certifica que en el libro de Primeras Comuniones N.º <span className="cert-line" /> pág.{" "}
          <span className="cert-line" /> año <span className="cert-line" /> hay una inscripción que
          dice: primeras comuniones celebradas en <span className="cert-line long" />.
        </p>
        <p>
          El Rev. P. <span className="cert-line long" /> celebró la primera comunión a{" "}
          <strong>José Daniel Martínez López</strong>, nacido en Trujillo, Depto. de Colón.
        </p>
        <p>
          Hijo de <span className="cert-line long" /> y de <span className="cert-line long" />.
        </p>
        <p>
          Bautizado en <span className="cert-line long" /> el día <span className="cert-line" />.
        </p>
        <p>
          Celebrante Bautismo: <span className="cert-line long" />
        </p>
        <p className="mt-5">Y para que conste, lo firma y sella en Trujillo, Colón.</p>
      </>
    ),
  },
  matrimonio: {
    title: "CERTIFICADO DE CELEBRACIÓN MATRIMONIAL",
    content: (
      <>
        <p>
          El suscrito, Párroco de la Iglesia Parroquia San Juan Bautista de la Diócesis de Trujillo
        </p>
        <h3 className="my-5 text-center font-serif text-lg font-bold">HACE CONSTAR QUE</h3>
        <p>
          ESPOSO: <strong>Carlos Roberto Mejía Hernández</strong>
        </p>
        <p>
          ESPOSA: <strong>Ana Lucía Martínez López</strong>
        </p>
        <p className="mt-5">
          CELEBRARON MATRIMONIO SACRAMENTAL EN ESTA PARROQUIA, EN LA IGLESIA{" "}
          <span className="cert-line long" /> DE TRUJILLO, EL DÍA <span className="cert-line" /> DEL
          AÑO <span className="cert-line" /> EN PRESENCIA DEL R.P.{" "}
          <span className="cert-line long" />.
        </p>
        <p className="mt-4">Y DE LOS SIGUIENTES TESTIGOS:</p>
        <p>
          1. <span className="cert-line long" />
        </p>
        <p>
          2. <span className="cert-line long" />
        </p>
        <p className="mt-5">
          Y para los fines que convenga, se extiende la presente en la ciudad de Trujillo, Colón.
        </p>
      </>
    ),
  },
};

export default function Certificate({ kind, onBack }: CertificateProps) {
  const certificate = data[kind];
  return (
    <div className="certificate-screen min-h-screen bg-slate-200 p-4 sm:p-8">
      <div className="certificate-actions mx-auto mb-4 flex max-w-[820px] justify-between">
        <button onClick={onBack} className="btn-secondary flex items-center gap-2 bg-white">
          <ArrowLeft size={17} /> Volver al perfil
        </button>
        <button onClick={() => window.print()} className="btn-primary flex items-center gap-2">
          <Printer size={17} /> Imprimir
        </button>
      </div>
      <article className="certificate-page mx-auto">
        <div className="certificate-inner">
          <span className="cert-corner cert-corner-tl" />
          <span className="cert-corner cert-corner-tr" />
          <span className="cert-corner cert-corner-bl" />
          <span className="cert-corner cert-corner-br" />
          <header className="cert-header">
            <div className="cert-placeholder">Logo</div>
            <div className="min-w-0 flex-1 text-center">
              <h1>{certificate.title}</h1>
              <div className="cert-rule" />
            </div>
            <img
              src={`${import.meta.env.BASE_URL}assets/parish-logo.png`}
              alt="Parroquia San Juan Bautista"
            />
          </header>
          <div className="cert-diocese">
            <strong>OBISPADO DE TRUJILLO</strong>
            <span>República de Honduras, C. A.</span>
          </div>
          <div className="cert-body">{certificate.content}</div>
          <footer className="cert-footer">
            <div className="cert-seal" />
            <div className="text-center">
              <span className="block border-t border-slate-500 px-10 pt-2">PÁRROCO</span>
            </div>
            <div className="text-right text-[9px] leading-relaxed">
              Obispado de Trujillo
              <br />
              Trujillo, Colón
              <br />
              HONDURAS (C.A.)
              <br />
              Cel. 3372-1179
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
}

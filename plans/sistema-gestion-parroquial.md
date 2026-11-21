# Plan de implementación — Sistema de Gestión Parroquial

## 1. Objetivo y alcance

Construir un prototipo web interactivo en React + Vite + Tailwind CSS v4 que reproduzca fielmente el diseño del PDF de la Parroquia San Juan Bautista de Trujillo, Colón, Honduras.

El prototipo será únicamente de gestión parroquial: feligreses, sacramentos, peticiones de misas, reportes, eventos/logs y certificados. No se agregarán módulos de contabilidad, pagos ni finanzas.

Se implementarán exclusivamente las pantallas funcionales solicitadas:

- Login.
- Estructura global con menú lateral y encabezado.
- Dashboard.
- Feligreses: listado, perfil con tres pestañas, edición y registro.
- Sacramentos: Bautismo, Primera Comunión, Confirmación y Matrimonio.
- Peticiones de misas: calendario y sus cuatro modales.
- Reportes.
- Logs/Eventos.
- Certificados imprimibles de los cuatro sacramentos.
- Modales de conexión, permisos, éxito, inactividad, cierre de sesión, eliminación, carga y cuatro variantes de error.

No se implementarán como pantallas las páginas separadoras o listas de trabajo indicadas por el usuario. Tampoco se reproducirán post-its, nombres del equipo, textos tachados ni anotaciones de diseño.

## 2. Estado actual del proyecto y fuente visual

- El repositorio contiene el scaffold mínimo de React 19 + Vite 8 + Tailwind CSS v4.
- `src/App.tsx` está vacío y `src/index.css` solo importa Tailwind.
- No existe backend, enrutador, librería de componentes ni modelo de datos previo.
- El PDF tiene 51 páginas en formato panorámico 16:9 y usa principalmente Open Sans.
- Paleta confirmada:
  - Azul marino: `#002B5C`
  - Azul medio: `#0F5CA9`
  - Azul claro: `#4FA3E3`
  - Dorado/café: `#DCA123`
  - Dorado oscuro: `#9E690B`
  - Amarillo claro: `#FEEB75`
  - Blanco y fondos azul-gris muy claros
- El logotipo parroquial se extraerá del propio PDF y se reutilizará en login, menú lateral y certificados.

## 3. Enfoque técnico

### 3.1 Arquitectura de interfaz

Se organizará el código por responsabilidades para evitar un `App.tsx` monolítico:

- `src/App.tsx`: autenticación simulada, vista activa, navegación, overlays globales y acceso de demo.
- `src/components/layout/`: shell autenticado, menú lateral y encabezado.
- `src/components/ui/`: botones, campos, barras de módulo, tablas, pestañas, badges y modal base.
- `src/features/dashboard/`
- `src/features/feligreses/`
- `src/features/sacramentos/`
- `src/features/solicitudes/`
- `src/features/reportes/`
- `src/features/logs/`
- `src/features/certificados/`
- `src/components/modals/`: todos los estados emergentes.
- `src/data/mockData.ts`: datos hondureños de demostración.
- `src/types.ts`: tipos compartidos.
- `public/assets/`: logo extraído y cualquier recurso rasterizado imprescindible.
- `src/index.css`: tokens visuales, fuente Open Sans, estilos base, animaciones, responsividad e impresión.

La navegación se manejará como una máquina de estados ligera dentro de React, sin backend ni persistencia real. Se conservará el contexto necesario para volver de perfil a listado, de edición a perfil y de certificados al perfil.

### 3.2 Dependencias y recursos

- Mantener React, Vite y Tailwind existentes.
- Añadir `lucide-react` para reproducir de forma coherente los iconos lineales del diseño: inicio, usuarios, sacramentos, calendario, reportes, logs, configuración, búsqueda, ojo, lápiz, papelera, usuario, calendario, ubicación, alerta, candado, wifi y salida.
- Usar Open Sans mediante importación pública de Google Fonts en CSS.
- Construir la gráfica del dashboard, decoraciones y certificados con HTML/CSS/SVG; no convertir pantallas completas en imágenes.
- Extraer únicamente el logo parroquial del PDF para conservar fidelidad visual.

## 4. Sistema visual compartido

Crear variables CSS para la paleta, radios, sombras, bordes y tamaños recurrentes. Replicar:

- Fondo general azul-gris muy claro.
- Encabezados blancos con línea superior dorada y extremos redondeados.
- Barras de módulo con degradado azul marino a azul claro.
- Botones primarios azules y secundarios blancos con borde azul.
- Botones destructivos dorados/café cuando así aparece en el PDF.
- Tarjetas con bordes finos azul-gris, radios amplios y sombras discretas.
- Tipografía Open Sans con jerarquía compacta, títulos azul marino y textos secundarios grises.
- Tablas con cabecera azul marino, líneas azules finas y badges de estado.
- Iconografía equivalente y con el mismo uso de color.

El contenido principal se diseñará para escritorio, con un ancho de referencia equivalente a las composiciones del PDF. El shell autenticado tendrá:

- Sidebar fijo azul marino con logo y módulos.
- Encabezado superior con “Parroquia San Juan Bautista”, avatar, “Administrador” y menú desplegable.
- Área de contenido desplazable.

Responsividad:

- En pantallas medianas el sidebar se contraerá a iconos.
- En pantallas pequeñas se convertirá en panel desplegable.
- Formularios de dos o tres columnas pasarán a una columna.
- Tablas y calendario conservarán su estructura mediante desplazamiento horizontal cuando sea necesario.
- Los modales se ajustarán al ancho disponible sin alterar su jerarquía.

## 5. Pantallas y componentes

### 5.1 Login

- Composición dividida: bloque azul marino curvo con logo y “Sistema de Gestión Parroquial”; formulario claro a la derecha.
- Textos exactos: “Bienvenido”, “Ingresa tus credenciales”, “Usuario”, “Contraseña” e “Iniciar Sesión”.
- Campo de contraseña con control para mostrar/ocultar.
- Cualquier par de campos no vacíos permitirá entrar al Dashboard para facilitar la demostración.
- El estado de credenciales fallidas podrá mostrarse desde el acceso de demo; el formulario también validará campos vacíos.
- Durante el acceso correcto se mostrará brevemente la pantalla de carga y luego el Dashboard.

### 5.2 Menú lateral y encabezado

Módulos:

1. Inicio
2. Feligreses
3. Sacramentos, con subopciones Bautismo, Primera Comunión, Confirmación y Matrimonio
4. Solicitudes
5. Reportes
6. Logs
7. Configuración

Interacciones:

- Navegación entre módulos sin recargar.
- Estado activo visible.
- “Configuración” se tratará como acción restringida y abrirá el modal “Sin Permisos”, evitando inventar una pantalla no incluida en el PDF.
- El menú “Administrador” abrirá la acción “Cerrar sesión”.

### 5.3 Dashboard

- Saludo “¡Bienvenido al sistema!” y subtítulo “Resumen general de la gestión parroquial”.
- Seis tarjetas: feligreses, registros sacramentales, bautismos, primeras comuniones, confirmaciones y matrimonios.
- Datos numéricos realistas y los iconos/alternancia de color del PDF.
- Gráfica “Registros por mes” con línea azul y selector visual de años.
- Cada “Ver detalles” navegará al módulo correspondiente; “Registros sacramentales” abrirá Bautismo como entrada al grupo.

### 5.4 Feligreses

#### Listado

- Barra “Gestión de feligreses” y subtítulo “Listado de feligreses”.
- Búsqueda, filtros por DNI/nombre/apellido, limpiar filtros y botón “Registrar”.
- Tabla con ID, nombre completo, número de identidad, fecha de nacimiento, estado y acciones.
- Datos de muestra con formato hondureño de identidad `####-####-#####`, nombres y localidades de Colón/Honduras.
- Acciones:
  - Ojo: perfil.
  - Lápiz: edición.
  - Papelera: confirmación de eliminación.
- Paginación visual y funcional sobre los datos locales.

#### Perfil

- Cabecera del feligrés con avatar amarillo, nombre, estado activo, DNI, fecha de nacimiento, dirección y botón “Editar perfil”.
- Pestañas:
  - Historial de sacramentos.
  - Datos personales.
  - Observaciones.
- Historial con tarjetas de Bautismo, Primera Comunión, Confirmación y Matrimonio, badges “Registrado/No registrado”, fecha, parroquia y acción correspondiente.
- “Ver certificado” abre la versión imprimible del sacramento.
- Cuando un sacramento no esté registrado, la acción lleva a su formulario.
- Se incluirán varios feligreses de ejemplo para que los cuatro certificados estén disponibles en al menos un perfil, manteniendo en el perfil principal la combinación de estados del PDF.
- Observaciones tendrá un textarea editable.

#### Editar y agregar

- Formularios compactos con: nombres, apellidos, DNI, fecha de nacimiento, estado civil, sexo, teléfono, teléfono de emergencia, dirección y lugar de origen.
- Editar muestra “Volver al perfil” y “Guardar cambios”.
- Agregar muestra “Volver al listado”, “Cancelar” y “Guardar feligrés”.
- Guardar actualiza el estado local de la sesión y abre “Registro guardado exitosamente”.
- Cancelar vuelve a la pantalla anterior sin modificar datos.

### 5.5 Sacramentos

Implementar cuatro formularios siguiendo la misma estructura del PDF: encabezado global, barra degradada del módulo, título con icono, búsqueda de feligrés, limpiar filtros, panel central con secciones y botones Registrar/Cancelar.

#### Bautismo

- Referencia del libro físico.
- Datos de celebración.
- Datos del bautizado y nacimiento.
- Padres y filiación.
- Testigos y autoridades.
- Cierre y notas oficiales.

#### Primera Comunión

- Referencia del libro físico.
- Datos del comulgante y nacimiento.
- Padres/filiación y antecedente de bautismo.
- Datos de la celebración.
- Cierre y emisión.

#### Confirmación

- Referencia del libro físico.
- Datos de celebración.
- Datos del confirmado y antecedentes.
- Padres y padrino/madrina.
- Cierre y emisión.

#### Matrimonio

- Referencia del libro físico.
- Datos de celebración matrimonial.
- Contrayentes.
- Testigos.
- Cierre y emisión.

Comportamiento compartido:

- La búsqueda puede seleccionar un feligrés local y completar datos básicos.
- Limpiar filtros/casillas restablece los campos relevantes.
- Registrar muestra carga breve y luego éxito.
- Cancelar vuelve a la vista previa.
- Sin conexión detectada o un fallo de demo abre el modal correspondiente sin perder lo escrito.

### 5.6 Solicitudes — calendario de peticiones de misas

- Calendario de noviembre de 2026, de domingo a sábado, con navegación de mes anterior/siguiente.
- Peticiones azules para novena/defuntos y amarillas para cumpleaños, con los textos del diseño.
- “+ Nueva petición” abre modal.
- Clic en una petición abre detalle.

Modales:

- Nueva petición: fecha, opción de repetir en nueve misas, motivo, cancelar y guardar.
- Editar petición: mismos campos y guardar cambios.
- Detalle: tipo, fecha, motivo, eliminar y editar.
- Eliminar: icono de papelera, advertencia, cancelar y eliminar.

Los cambios se reflejarán inmediatamente en el calendario durante la sesión.

### 5.7 Reportes

- Encabezado “Reportes”.
- Filtros por fecha y tipo.
- Botones Filtrar y Exportar.
- Tabla con fecha, tipo de reporte, descripción y estado.
- Datos basados en el PDF: bautismos, misas, solicitudes, confirmaciones y personas.
- “Exportar” simulará la acción con descarga local de CSV de los registros filtrados, sin introducir finanzas ni integraciones externas.

### 5.8 Logs/Eventos

- Encabezado “Eventos”.
- Filtros por fecha y usuario, botones Filtrar/Limpiar.
- Tabla con fecha, usuario, acción y estado.
- Badges Correcto, Advertencia y Fallido con colores del diseño.
- Registros de ejemplo equivalentes a creación de reportes, edición de feligreses, exportación, inicio de sesión fallido y eliminación de solicitudes.

### 5.9 Certificados imprimibles

Crear cuatro vistas de documento:

- Certificado de Bautismo.
- Certificado de Confirma.
- Certificado de Primera Comunión.
- Certificado de Celebración Matrimonial.

Cada certificado reproducirá:

- Marco azul con ornamentos dorados.
- Logo/espacio de logo de la plantilla.
- Títulos y membrete del Obispado de Trujillo.
- Texto legal y líneas de datos según el PDF.
- Sello, firma y datos de contacto donde correspondan.
- Datos del feligrés seleccionado insertados en la plantilla.

Se añadirá un control discreto “Imprimir” fuera de la hoja y un retorno al perfil. Ambos se ocultarán mediante `@media print`; la impresión mostrará únicamente el certificado en orientación vertical y tamaño de hoja adecuado.

## 6. Sistema de modales y estados globales

Todos los estados emergentes se renderizarán con un componente modal compartido:

- Centrado sobre la pantalla actual.
- Fondo oscuro semitransparente.
- Bloque blanco con línea/borde superior dorado, radios y proporciones del PDF.
- Cierre con `Escape` cuando la acción no sea destructiva.
- Foco inicial y bloqueo del scroll de fondo.

Estados:

1. Sin conexión.
2. Sin permisos.
3. Registro guardado exitosamente.
4. Sesión de inactividad.
5. Cerrar sesión.
6. Eliminar registro.
7. Pantalla de carga.
8. Error al cargar información.
9. Pérdida de conexión a internet.
10. Error al iniciar sesión.
11. Error al ingresar un registro.

### 6.1 Flujos naturales

- Escuchar `online/offline` del navegador.
- Si el navegador está offline al guardar, cargar o cambiar de módulo, abrir “Sin Conexión”.
- Si la conexión se pierde durante el uso, abrir la variante “Pérdida de conexión a internet”.
- “Configuración” abre “Sin Permisos”.
- Guardados normales muestran primero carga y luego éxito.
- Eliminaciones y cierre de sesión siempre piden confirmación.
- El modal de inactividad aparecerá tras un intervalo corto de demostración sin interacción y mostrará una cuenta regresiva de 39 segundos; mouse, teclado o “Continuar sesión” reinician el temporizador. Al llegar a cero vuelve al Login.

### 6.2 Acceso discreto para presentación

- El atajo `Ctrl + Alt + D` abrirá un panel compacto “Estados de demo”.
- El panel permitirá abrir cualquiera de los once estados sobre la vista actual, incluyendo las cuatro variantes de error.
- `Escape` cerrará el panel o el modal activo.
- El acceso no estará visible durante el uso normal y no agregará una pantalla nueva.
- El panel se excluirá de impresión.

### 6.3 Pantalla de carga

- Usar únicamente la versión de la página 47: fondo azul, marco dorado y panel interior claro.
- Textos: “Procesando solicitud…” y “Por favor espere un momento”.
- Tres puntos animados que avanzan cíclicamente en amarillo, azul y café, como indica la anotación del PDF.
- No reproducir el post-it ni el nombre de la diseñadora.

## 7. Datos y comportamiento local

- Datos realistas de Honduras: nombres españoles, DNI con formato hondureño, teléfonos de ocho dígitos, barrios y municipios de Colón.
- Fechas coherentes con edades y sacramentos.
- La información se mantendrá en estado React durante la sesión.
- No habrá autenticación real, servidor, almacenamiento compartido ni base de datos.
- El prototipo podrá crear/editar/eliminar feligreses y peticiones mientras la pestaña permanezca abierta.
- Al recargar se restaurarán los datos iniciales, lo cual es apropiado para un prototipo de presentación.

## 8. Accesibilidad y calidad de interacción

- Labels asociados a campos.
- Botones de solo icono con `aria-label`.
- Orden de tabulación lógico.
- Foco visible coherente con la paleta.
- Modales con `role="dialog"`, título accesible y foco contenido.
- Contraste suficiente sin cambiar los colores definidos.
- Estados hover/active discretos que respeten el diseño.
- Confirmaciones destructivas claramente diferenciadas.

## 9. Verificación

### 9.1 Verificación funcional

Recorrer manualmente:

1. Login → carga → Dashboard.
2. Navegación por todos los módulos desde el sidebar.
3. Enlaces “Ver detalles” del Dashboard.
4. Buscar/filtrar feligreses.
5. Abrir perfil, cambiar las tres pestañas y editar.
6. Registrar un feligrés y verificar modal de éxito.
7. Abrir cada formulario sacramental, limpiar, cancelar y registrar.
8. Crear, abrir, editar y eliminar una petición en calendario.
9. Filtrar y exportar reportes.
10. Filtrar logs.
11. Abrir e imprimir los cuatro certificados.
12. Abrir menú de Administrador y cerrar sesión.
13. Verificar inactividad y cuenta regresiva.
14. Abrir todos los estados mediante `Ctrl + Alt + D`.
15. Probar comportamiento offline del navegador.

### 9.2 Verificación visual

Comparar las vistas principales con las páginas relevantes del PDF:

- Paleta y Open Sans.
- Curvas del login.
- Sidebar, header y barras degradadas.
- Densidad y espaciado de formularios.
- Tarjetas del Dashboard.
- Tabla de feligreses.
- Perfil y pestañas.
- Calendario.
- Modales.
- Marcos y jerarquía tipográfica de certificados.

### 9.3 Verificación técnica

- Ejecutar el formateador configurado: `pnpm format`.
- Ejecutar `pnpm build` por tratarse de una implementación amplia y transversal.
- Corregir errores TypeScript/JSX, imports y estilos bloqueantes.
- No iniciar otro servidor de desarrollo; usar el servidor administrado existente y hot reload.

## 10. Criterios de aceptación

- Todas las pantallas funcionales solicitadas existen y son navegables.
- No se implementan separadores, listas internas, post-its ni pantallas inventadas.
- La identidad visual coincide con el PDF en color, tipografía, iconos, espaciado y componentes.
- Todos los textos de interfaz están en español.
- No aparece ningún contenido financiero.
- Guardar/registrar, cancelar, editar, eliminar, cerrar sesión y certificados funcionan según lo solicitado.
- Los errores son modales sobre la vista actual y pueden mostrarse por flujo natural o mediante el atajo de demo.
- La pantalla de carga usa la versión azul con borde dorado y anima los tres colores requeridos.
- Los cuatro certificados son imprimibles y conservan el formato institucional.
- La experiencia es responsiva con prioridad de escritorio.

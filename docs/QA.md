# Revisión final · 12 octubre 2026

Resultado: 18 originales preservados y 14 escenas nuevas reproducibles, 156 poses nuevas. `approved` significa revisión visual y técnica de esta sesión; no implica aprobación del usuario, merge ni despliegue. El PR sigue en borrador.

## Evidencia y alcance

Se inspeccionaron los PNG maestros reales antes de generar. Cada escena nueva se revisó cuadro a cuadro en orden a 144 × 84 sobre claro, oscuro y azul; se revisaron fuentes ampliadas y capturas Chromium a 3×. Cada directorio de [evidencia](../evidence/) contiene láminas de todos los cuadros, panel a tamaño real, GIF finito de revisión y seis capturas reales del reproductor. Los GIF no forman parte de la carga de la galería.

[Registro de muestreo temporal](../evidence/browser-playback.json): Chromium 145.0.7632.6, 14 escenas, 156 posiciones temporales contrastadas con el cuadro esperado y regreso al reposo. Este registro muestrea la animación con su reloj; no equivale a una certificación de interpolación fluida. Las escenas son actuaciones mediante poses raster, con pausas deliberadas.

[Galería escritorio](../evidence/gallery-desktop.png) a 1280 × 960 y [móvil](../evidence/gallery-mobile.png) a 390 × 844. La galería no usa framework, no presentó overlay ni errores JavaScript y sus controles responden a clic/teclado. Browser plugin no estaba disponible; se usó Playwright local.

| Comprobación | Resultado |
|---|---|
| Identidad de página, contenido visible, consola | Conforme |
| Selección y carga solo de maestro/escena elegida | Conforme |
| Reinicio con mismo clic, teclado, Escape/X y foco | Conforme |
| Fallo de atlas/maestro, carga lenta y carreras entre selecciones | Conforme |
| Reduced motion quieto con finalización | Conforme |
| Pausa de reloj al ocultar pestaña | Conforme; evento/propiedad de visibilidad simulado en prueba |
| Avance/retroceso, deslizador y velocidad de revisión | Conforme |
| N variable, pausas explícitas y ciclos finitos | Conforme |
| 9/13 cuadros, incluida fila de origen incompleta | Conforme |
| Reconstrucción desde PNG individuales | Idéntica byte a byte para 14 atlas |
| Metadatos inválidos y sobrescritura destructiva | Rechazados |
| Alfa, cuatro márgenes, X libre y cuadros distintos | Conforme en atlas nuevos |
| Originales: hashes y presupuesto | 18 intactos; 3.178.538 bytes < 4 MiB |
| Nuevos: paquete separado | 941.162 bytes activos; máximo 146.637 por atlas |

## Correcciones efectuadas

- Manzana: la mordida desaparecía; se regeneró. El corte fijo atravesaba celdas por márgenes de origen irregulares; v2 usa cortes explícitos y no incluye vecinos.
- Dientes: dos poses cambiaban el cepillo de mano; se regeneraron conservando la mano y la acción.
- Discoteca: la hoja tenía un paso horizontal distinto del ancho nominal; v2 registra las columnas y conserva la actuación de rodillas y brazos.
- Tallarines: filas demasiado próximas producían restos del vecino; fuente v2 con separaciones limpias.
- Cumpleaños: personajes demasiado cerca del borde; fuente v2 y cortes verificados preservan los cinco amigos completos.

Las versiones anteriores se conservan para trazabilidad; solo las rutas del catálogo son activas. El registro se hace por fila/columna del lienzo, sin escalar cada pose ni fijar su caja individual: se conservan agachamiento, subida y arco de pelota. Para fuentes con una fila entera en el aire, `sourceRowBaselines` permite declarar el suelo previsto, evitando normalizar un salto intencional.

## Límites observados

El acabado es pixelado y de poses clave, no animación vectorial con huesos. Existen pequeñas variaciones ilustradas de silueta, especialmente alrededor de accesorios; se conservaron cuando no impiden reconocer la acción. Grupos y letreros «Tía Berta»/«11 OCT» se aprecian mejor ampliados; los títulos de la galería los identifican también como texto. Se probaron Chromium y dos tamaños de ventana; Safari/Firefox y dispositivos físicos no se verificaron. Las escenas de cuidado son ficción lúdica, sin datos ni instrucciones clínicas.

## Repetir

```sh
npm test
npm run test:editable
npm run test:browser
# con servidor en http://127.0.0.1:4173:
npm run review
```

La validación automática demuestra estructura y comportamiento; la evidencia visual sustenta la revisión artística. La guía para mejorar o reemplazar poses está en [EDITING.md](EDITING.md).

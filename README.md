# Moa · biblioteca de movimiento

Archivo autónomo de los **18 atlas originales v2** y **183 escenas nuevas**, con fuentes y poses raster editables. Los originales se conservan byte a byte; las escenas nuevas viven en otro paquete. Sin datos clínicos, servicios ni dependencias del hospital.

## Abrir la galería

```sh
python3 -m http.server 4173
# http://localhost:4173
```

Abra [index.html](index.html) a través del servidor. Busque por nombre, filtre categoría/paquete y seleccione una escena. La selección es quieta; Reproducir inicia una acción finita. Puede inspeccionar cuadros, usar tres fondos y ampliar 3×. No requiere build ni paquetes para ejecutarse.

## Índices

- [Veinte viñetas chilenas: referencias y revisión](docs/CHILE.md)

- [Veinte actuaciones de cultura popular mundial](docs/WORLD.md)

- [Veinte viñetas Rapa Nui: referencias y estado por bloque](docs/RAPA-NUI.md)

- [Expansión de 30 actuaciones y bloques de revisión](docs/EXPANSION.md)
- [Informe de revisión del primer paquete y límites](docs/QA.md)
- [Cómo retocar o añadir poses](docs/EDITING.md)
- [Plan y criterios de las 14 escenas](docs/SCENES.md)
- [Catálogo reproducible](scenes.json) y [manifiesto de escenas nuevas](new-scenes/manifest.json)
- [Inventario original con SHA-256](docs/inventory.json)
- [Procedencia, referencias y situación de licencias](docs/PROVENANCE.md)
- [Contrato original HHR](originals/hhr/docs/MOA_MASCOT.md)
- [Guía adjunta íntegra, versión 0](references/identity-guide-v0.html)
- [Evidencia visual cuadro a cuadro y previsualizaciones](evidence/)

## Contrato del reproductor

Ventana 144 × 84 CSS; celdas 288 × 168; N variable (hasta 24); pausas por cuadro en milisegundos, ciclos y pose quieta explícitos. La imagen debe cargar antes de empezar. La pestaña oculta pausa el reloj. Movimiento reducido mantiene una pose y finaliza igualmente. El mismo clic reinicia; Escape/X cierran y devuelven el foco. Cargas antiguas no reemplazan una selección nueva. Los errores regresan al maestro; si también falla, los controles siguen usables. Ningún GIF de evidencia se carga en la galería.

Solo se descarga el maestro y la escena seleccionada. Se respetan **<300.000 bytes por atlas** y **<4 MiB para la colección original** (3.178.538 bytes). Fuentes grandes y evidencia son archivos de autoría, no payload HHR. No hay precache, integración ni despliegue.

## Validar y reproducir empaquetado

```sh
npm ci
python3 -m pip install Pillow==12.3.0
npx playwright install chromium
npm test
npm run test:browser
npm run test:editable
python3 scripts/pack.py thinking  # o cualquier id con fuente presente
python3 scripts/catalog.py
```

El empaquetador preserva los PNG fuente; aplica registro por fila, recorte y escala compartidos, nunca escala cada pose por separado. Los atlas nuevos no sobrescriben un original. CI comprueba hashes originales, límites, alfa, cuadros distintos, geometría, timing e interacción real en Chromium. Ver el estado de revisión de cada escena antes de reutilizarla.

## Revisión sin conexión

Las descargas autónomas se distribuyen en dos archivos: [colecciones anteriores](review/moa-scenes.html) y [Chile: memes y encuentros](review/moa-chile-remix.html). Cada uno abre sin conexión y conserva sus cuadros embebidos. La galería principal index.html mantiene todas las escenas unificadas. Ambos archivos se regeneran con `python3 scripts/export-review.py`; dividir la descarga evita que cada nueva colección obligue a transferir un HTML cada vez más pesado.

Las exportaciones y láminas de cada bloque están disponibles en el repositorio. La conversación principal gestiona su publicación en Library con su conexión autorizada.

- [Encuentros con invitados: IDs aprobados y referencia pendiente C21](docs/CHILE-ENCUENTROS.md).

- [Moa aventuras: índice de las 30 escenas B01–B30](docs/MOA-AVENTURAS.md).
- [Moa compañero: índice de las 15 escenas A01–A15](docs/MOA-COMPANERO.md).

El selector de categorías se construye desde el catálogo, por lo que incluye todas las colecciones presentes. La exportación offline conserva píxeles RGBA exactos mediante PNG o WebP sin pérdida; los PNG editables y los metadatos completos permanecen en el repositorio.

- [Chile: memes y encuentros, D01–D30](docs/CHILE-REMIX.md).

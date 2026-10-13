# Moa · biblioteca de movimiento

Archivo autónomo de los **18 atlas originales v2** y **88 escenas nuevas**, con fuentes y poses raster editables. Los originales se conservan byte a byte; las escenas nuevas viven en otro paquete. Sin datos clínicos, servicios ni dependencias del hospital.

## Abrir la galería

```sh
python3 -m http.server 4173
# http://localhost:4173
```

Abra [index.html](index.html) a través del servidor. Busque por nombre, filtre categoría/paquete y seleccione una escena. La selección es quieta; Reproducir inicia una acción finita. Puede inspeccionar cuadros, usar tres fondos y ampliar 3×. No requiere build ni paquetes para ejecutarse.

## Índices

- [Doce viñetas chilenas: referencias y revisión](docs/CHILE.md)

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

[Descargar la galería HTML autónoma](review/moa-scenes.html) y abrirla localmente. Incluye las escenas nuevas disponibles y el reposo maestro embebidos. Se regenera con `python3 scripts/export-review.py`; esta exportación de revisión descarga todo su contenido como un archivo y es independiente de la galería principal con carga selectiva.

Las exportaciones y láminas de cada bloque están disponibles en el repositorio. La conversación principal gestiona su publicación en Library con su conexión autorizada.

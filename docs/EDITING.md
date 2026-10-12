# Retocar una escena

Todo es PNG + JSON. Las poses son raster: cambiar anatomía requiere editar o regenerar el dibujo. No hay un esqueleto vectorial ni capas independientes ocultas.

## Archivos que importan

- `new-scenes/sources/`: hojas image_gen íntegras, incluso correcciones descartadas. No editarlas destructivamente.
- `new-scenes/frames/<id>-vN/000.png`: cuadros individuales RGBA editables, lienzo fijo 288 × 168. Sin cuantizar antes de empaquetar; conservan todo el color de la extracción.
- `new-scenes/scenes/<id>.json`: orden explícito `frameFiles`, N, `durations` en ms por cuadro, `cycles`, `still`, encuadre y procedencia. Una pausa es una duración mayor, nunca un cuadro duplicado.
- `new-scenes/prompts/`: dirección de generación y correcciones. Adjuntar siempre `references/moa-neutral.png` y los atlas de apoyo. Imagegen no es determinista: un prompt no reconstruye píxeles idénticos.
- `new-scenes/atlases/`: salidas derivadas compactas para el reproductor.

## Reemplazar una pose

1. Copiar el directorio de cuadros a una nueva versión, por ejemplo `thinking-v2`. Conservar el original.
2. Editar el PNG correspondiente en cualquier editor raster con alfa, o regenerarlo con image_gen usando el maestro y las poses vecinas. Mantener el mismo lienzo, escala, suelo, luz y origen. La esquina x=240..287, y=0..47 debe estar vacía.
3. En el JSON actualizar `version`, `src` y `frameFiles` para la nueva versión. Mantener la secuencia completa y cambiar `status` a `candidate`.
4. Reconstruir desde cuadros, sin reextraer la hoja ni sobrescribir el trabajo manual:

```sh
python3 scripts/rebuild.py new-scenes/scenes/thinking.json
python3 scripts/catalog.py
npm test
npm run test:browser
```

## Añadir fotogramas o cambiar ritmo

Añadir un PNG nuevo realmente dibujado, insertar su ruta en `frameFiles`, incrementar `frames` y añadir su duración en la misma posición de `durations`. Ajustar `still` si se desplazó su índice. Se admiten 1–24 cuadros; para esta colección los gestos usan 8 y las acciones 12. Duración total habitual 3–6 segundos, incluidas repeticiones. No duplicar poses para inflar N.

Modificar solo `durations` permite sostener un gesto sin duplicarlo. La velocidad de revisión de la galería no cambia el JSON ni la duración canónica. Flechas y deslizador permiten revisar cuadros uno por uno; fondo y escala ayudan a comprobar alfa y tamaño real.

## Hoja nueva

`python3 scripts/pack.py <id>` extrae la hoja fuente con el registro común documentado. No usarlo después de editar PNG individuales: el script rechaza cuadros existentes distintos para proteger las ediciones. Elegir una nueva versión para otra extracción. El número de columnas es `sourceGridColumns` (4 por defecto), la última fila puede estar incompleta y se procesan exactamente N poses. Para una fila que solo contiene poses en el aire, declarar `sourceRowBaselines` con el suelo de origen previsto; no anclar las cajas individuales al suelo. Si los márgenes de una hoja son irregulares, declarar `sourceColumns`/`sourceRows` en píxeles de origen; las celdas se registran en un lienzo común, sin escalas individuales. Los cortes que atraviesan dibujos son rechazados.

Revisar cada cuadro y su reproducción sobre claro, oscuro y azul, a 144 × 84 y ampliado. Reconstruir genera evidencia desde el atlas entregado, incluida su paleta y alfa. Actualizar la nota de revisión solo después de observar el resultado. Los tests no sustituyen el juicio visual.

Los 18 atlas `originals/` nunca son destino del empaquetador ni del flujo de edición.

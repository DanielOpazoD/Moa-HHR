# Moa · Compañía tranquila

Diez secuencias nuevas, 120 poses raster RGBA editables, celdas HD 576×336, 12 cuadros por gesto. Fuentes generadas directamente con image_gen y referencia original conservada; sin subdelegación de autoría o implementación. No son modelos 3D ni esqueletos vectoriales.

Abrir `presence.html` mediante el servidor local o `review/moa-presence.html` sin conexión. La galería general mantiene las escenas anteriores e incorpora la categoría **Compañía tranquila**.

| ID | Gesto |
|---|---|
| I01 | Respiración tranquila |
| I02 | Pestañeo natural |
| I03 | Mirada curiosa |
| I04 | Contacto visual amable |
| I05 | Inclinación de cabeza |
| I06 | Acomodarse |
| I07 | Suspiro de descanso |
| I08 | Alisarse el pecho |
| I09 | Pequeño estiramiento |
| I10 | Saludo discreto |

## Revisión y límites

El pestañeo mantiene poses de reposo largas y cierre/apertura breves. I08 e I10 conservan la fuente y cuadros v1 pero usan un atlas v2 reordenado para continuidad del brazo. Los atlas v1 se conservan para trazabilidad. Las hojas generativas pueden tener pequeñas variaciones de volumen/textura entre poses: no se presentan como una animación de rig 3D ni como interpolación continua a 60 fps.

Los gestos son independientes. El retorno utiliza la pose neutral de cada escena; no se afirma identidad de píxeles entre las diez poses neutrales. La vista permite juzgar estas transiciones antes de reemplazar el estado predeterminado de HHR. Este paquete no cambia ni despliega el programa clínico.

## Comportamiento

- Carga inicial de un atlas, luego solo el seleccionado. Caché de hasta tres imágenes decodificadas.
- Reproducción individual finita; selección quieta, deslizador cuadro a cuadro, fondos claro/oscuro/azul y escala real 144×84.
- Modo compañía voluntario: saludo una vez al activarlo y pausas aleatorias de 10–22 s. Respiración y pestañeo predominan; el saludo no vuelve a sortearse. Sin gestos clínicamente reactivos.
- Pausa manual, Escape, pausa al ocultar pestaña, movimiento reducido estático. No audio, IA en ejecución, almacenamiento de pacientes ni lectura de otros elementos de HHR.
- Una carga fallida conserva la imagen anterior. Selección nueva invalida las cargas obsoletas.
- El HTML offline incrusta los diez atlas y pesa más que la vista servida; no debe cargarse como recurso de producción en HHR.

## Edición

`new-scenes/sources/presence-*.png`: hojas originales.
`new-scenes/frames/presence-*-v1/*.png`: cuadros individuales.
`new-scenes/prompts/presence-*.txt`: dirección de generación.
`new-scenes/scenes/presence-*.json`: orden, tiempos, hashes y geometría.
`src/presence-schedule.js`: frecuencia y pausas.

No ampliar permisos ni añadir servicios para esta colección. Para retocar anatomía se editan/regeneran los PNG; para modificar ritmo basta JSON. Reconstruir con `scripts/rebuild.py`, actualizar `scripts/catalog.py` y ejecutar `npm run export:presence`.

Referencias de plataforma: [Page Visibility](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) y [movimiento reducido](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion).

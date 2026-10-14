# Chile · Premium HD

Ocho escenas ficticias aprobadas el 14-10-2026, desarrolladas y revisadas una por una. Referencia estética: C21G HD. Es una ilustración 3D detallada, no metraje real ni una garantía de hiperrealismo fotográfico.

| ID | Escena | Estado |
|---|---|---|
| E01 | Avello y el micrófono imposible | Integrada en PR #41; CI final aprobada |
| E02 | El Chacal y el duelo de trompetas | Bloqueada: generador rechazó la corrección; sin publicación |
| E03 | Guru Guru aprende el pasito | Integrada en PR #42; CI final aprobada |
| E04 | Pancho y la risa contagiosa | Implementada; CI requerida antes de merge |
| E05 | Kramer imita una piedra | Pendiente |
| E06 | Naya y la cámara equivocada | Pendiente |
| E07 | Don Carter y la carta infinita | Pendiente |
| E08 | Moa jurado de un completo | Pendiente |

## E01

24 poses originales generadas, 576×336, duración finita de 5760 ms. Tres intentos fallidos de continuidad del micrófono se descartaron; la lámina final conserva el grande en la mano derecha de Felipe y el pequeño en la izquierda de Moa. Retrato del sitio oficial inspeccionado, registrado por URL y SHA, no redistribuido. Rostro interpretativo: nariz marcada, ojos marrones, pelo hasta los hombros y barba corta.

Las fuentes definitivas y prompts están en `new-scenes/sources/E01-*` y `new-scenes/prompts/E01.txt`; los PNG individuales en `new-scenes/frames/E01-v1`. El manifiesto conserva orden, tiempos, recortes y hashes. Los originales anteriores no se modifican.

Revisión visual de las 24 poses sobre fondo claro, oscuro y azul: cuerpos enteros, gesto de retirada repetido, sorpresa y desenlace de la entrevista. No se usan deformaciones CSS ni fotogramas interpolados para fingir movimiento. Las poses siguen siendo discretas y hay variación ilustrativa entre láminas.

## Entrega y límites

Cada nueva escena HD tiene su HTML offline independiente; el índice principal sigue unificado. Esto evita un único HTML de decenas de megabytes. Atlas HD RGBA limitado a 4 MiB (24 poses E01: 3.19 MB); escenas estándar mantienen 300 KB. El catálogo carga solo la selección.

Pruebas: contrato, hashes, fondos/márgenes, cuadros no duplicados, reconstrucción RGBA exacta, selector/manual/reproducción finita y galerías offline. Chromium en CI; Safari/Firefox y dispositivos físicos no verificados. No contiene audio, fotografías de referencia ni datos clínicos.

## E03

Cuatro láminas de seis poses, 24 PNG HD, 5760 ms. Referencia de Canal 13 observada; plumaje, pico, gorro y gafas identificados. Se corrigió el tamaño de Moa en dos láminas. Paso lateral, cruce de patas, recuperación y baile conjunto; no golpe ni caída. Fuentes y tiempos editables. Revisión sobre tres fondos; semejanza ilustrativa, sin audio.

## E04

Pancho Saavedra: retrato de Canal 13 observado de nuevo. Cuatro láminas de seis poses: seriedad, risa contenida, contagio y saludo final. 24 cuadros HD y 5760 ms, con fuentes y tiempos editables. Sin utilería ni audio; interpretación de una escena ficticia. Revisión de expresiones y cuerpos enteros sobre tres fondos.

Se reservan órdenes 601–608 para este bloque. La validación rechaza órdenes duplicados y el catálogo usa desempate estable por ID para evitar diferencias entre sistemas de archivos.

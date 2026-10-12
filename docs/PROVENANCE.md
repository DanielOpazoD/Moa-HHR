# Procedencia y derechos

## Rescate original

Fuente de solo lectura: `DanielOpazoD/HHR-entornodeprueba`, commit `f415d41e8dcca5ec3e7d600c51c8d754e2053bb1`.

Los 18 PNG v2, el contrato, el reproductor, sus estilos, el retrato maestro, el convertidor y las pruebas de activos se copian sin alteración en `originals/hhr/`. [Inventario SHA-256](inventory.json): rutas, tamaños y dimensiones. Son fuentes de referencia; la galería no ejecuta React ni importa dependencias del hospital.

No se encontró LICENSE general ni licencia específica de Moa en la fuente. La licencia de `docs/architecture/c4/vendor/LICENSE` corresponde a material ajeno a esta colección y no se atribuye a Moa. La copia y publicación se realizan por autorización expresa del propietario; no se concede ni se infiere aquí una licencia abierta nueva.

## Guía aprobada

Library `libfile_5187ee1c55608191aae0a6e20cca6b6e`, versión 0, «Moa · Guía de identidad y animación.html».

Materializada con la skill Library y su helper vigente: 2.731.890 bytes; SHA-256 `3813f3eeaf255062548e611a473d86195aa3528e2084a19149b07c4d17dd6363`.

Se preserva íntegra en `references/identity-guide-v0.html`. Sus PNG wave/run/roll/surf fueron comparados byte a byte y son idénticos a HHR. `references/moa-neutral.png` es un recorte sin redibujo del primer cuadro wave (288 × 168). Se inspeccionaron los píxeles de las cuatro referencias antes de generar.

## Fuentes nuevas

Herramienta integrada `image_gen`, maestro neutral obligatorio y atlas de apoyo v2. No se usaron APIs con claves, dibujos SVG aproximados ni scripts que inventen poses. Los PNG generados se guardan íntegros en `new-scenes/sources/`; las revisiones conservan la fuente anterior con nombre separado.

Computador: hoja generada en la conversación principal, Library `libfile_1b1acfe822e8819188e92ac0923d326c`, versión 0; materializada aquí e inspeccionada. El resto se genera en esta sesión. El manifiesto registra dimensiones, origen, recorte común, registro de filas, escala única, N, pausas, versión y hash de salida. Ninguna pose recibe una escala individual. No se duplica arte para inflar N.

El empaquetado recorta celdas raster, registra las filas a un suelo común y aplica un único recorte y factor de escala para toda la escena. La cuantización PNG de 256 colores conserva transparencia y se revisa sobre fondos claro, oscuro y azul. La reserva superior derecha de 48 × 48 píxeles de atlas equivale a la X de 24 × 24 CSS.

Todos los acompañantes son ficticios. Las escenas de cuidado son ilustraciones lúdicas, no instrucciones ni representaciones de pacientes reales.

# C21G · Parecido y nitidez

Solicitud: mantener el baile y el giro, reducir el pixelado y mejorar el parecido con Leo Rey.

## Causas y cambios
- Antes: cuadros 288×168, reducción por vecino más próximo, atlas con paleta de 256 colores y ampliación pixelated.
- Ahora, solo C21G: cuadros 576×336 (cuatro veces los píxeles por cuadro), reducción Lanczos, atlas PNG RGBA y renderMode smooth. La dimensión de entrega no depende de ampliar el GIF anterior.
- Tres láminas de seis poses permitieron dedicar más píxeles al rostro. Retrato público inspeccionado: lentes estrechos envolventes, pelo oscuro rizado, rostro alargado y sonrisa amplia. Registro con URL y hash en evidence/guest-references/leo-hd.json; fotografía no redistribuida.
- Se conservan las 18 poses, ciclo de 5680 ms, perfiles y espalda. El retorno sigue siendo una adaptación artística del clip truncado.
- Fuentes A/B/C y composición C21G-v4.png conservadas con SHA. La composición solo registra suelo y celdas, sin deformar ni dibujar poses. Los PNG individuales permiten retoques futuros.

## Compatibilidad y pruebas
- Resolución opcional limitada a 288×168 o 576×336, con validación de dimensión y tamaño. Las escenas antiguas conservan su flujo y hashes.
- Prueba de round-trip RGBA HD sin cuantización; conservación de fuente; prueba de rechazo de tamaños no admitidos.
- Prueba Chromium de C21G: ancho natural 18×576, image-rendering auto, selector de cuadros y final finito. C21 se conserva como escena separada.
- Exportaciones offline exhaustivas sin duplicados: colección histórica, Chile remix y HTML HD. Reproducción de las tres exigida en CI antes del merge.
- Catálogo sin nuevas escenas duplicadas: 215 escenas y 2466 cuadros. Se trata de una revisión de C21G, no otra animación contabilizada.

Límites: ilustración interpretativa, animación de poses raster sin interpolación anatómica. No garantiza identidad fotográfica ni copia exacta de la coreografía. Firefox/Safari y dispositivos físicos no probados.

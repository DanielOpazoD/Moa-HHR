# adventures-03 · Moa aventuras

Preparación, revisión visual y publicación por el asistente principal, sin subdelegación. Escenas: B05, B07, B11, B12, B22, B25. 72 poses editables. Fuentes, prompts, JSON, PNG individuales, atlas y previews sobre tres fondos preservados.

Pruebas unitarias y metadatos locales mediante npm test. El entorno local bloquea el lanzamiento de Chromium por sockets: no se afirma una prueba local de navegador. Se exige CI de GitHub con reconstrucción editable exacta, diez pruebas Chromium y galería offline antes del merge. Sin cambios al motor de reproducción ni al workflow. Se añaden pruebas de compresión offline sin pérdida. Safari/Firefox y dispositivos físicos no comprobados. Secuencias discretas raster de duración finita, no interpolación continua.

Estas animaciones no se conectan a eventos del sistema. Cualquier integración futura debe disparar guardado/sincronización solo tras confirmación real de éxito, respetar movimiento reducido, permitir detener/repetir y acompañar el estado con texto accesible independiente. No representar una operación pendiente como completada. No se modifica ni despliega HHR.

Revisión de continuidad: B05 elimina el paño que desaparecía; B22 conserva la pieza del fonendoscopio al colocarse los auriculares; B25 conserva la bata colgada. B07 es un espejo fantástico con retraso deliberado. B12 usa un compañero vegetal y dos sillas; la escena termina con compañía silenciosa. B22 muestra un osito de juguete, sin instrucción clínica.

La galería offline utiliza el menor entre PNG y WebP lossless, verificando igualdad de todos los píxeles RGBA durante cada exportación. Los PNG editables no cambian. Solo se omiten metadatos de autoría redundantes del HTML; se conservan íntegros en los JSON del repositorio. Pruebas nuevas: transparencia/píxeles exactos, archivo fuente intacto, tamaño no mayor y preservación de campos de reproducción/contexto.

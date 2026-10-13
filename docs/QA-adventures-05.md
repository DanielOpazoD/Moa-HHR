# adventures-05 · Moa aventuras

Preparación, revisión visual y publicación por el asistente principal, sin subdelegación. Escenas: B18, B19, B20, B26, B29, B30. 72 poses editables. Fuentes, prompts, JSON, PNG individuales, atlas y previews sobre tres fondos preservados.

Pruebas unitarias y metadatos locales mediante npm test. El entorno local bloquea el lanzamiento de Chromium por sockets: no se afirma una prueba local de navegador. Se exige CI de GitHub con reconstrucción editable exacta, diez pruebas Chromium y galería offline antes del merge. Sin cambios al motor de reproducción ni al workflow. Se amplían las pruebas de categorías de la galería y del HTML offline. Safari/Firefox y dispositivos físicos no comprobados. Secuencias discretas raster de duración finita, no interpolación continua.

Estas animaciones no se conectan a eventos del sistema. Cualquier integración futura debe disparar guardado/sincronización solo tras confirmación real de éxito, respetar movimiento reducido, permitir detener/repetir y acompañar el estado con texto accesible independiente. No representar una operación pendiente como completada. No se modifica ni despliega HHR.

Revisión de continuidad: B19 mantiene la batuta en la penúltima pose; B20 elimina la galleta duplicada del portal una vez retirada; B26 conserva la ubicación de caja y paño; B29 v7 mantiene los dos tambores de Moa y la bandeja de baquetas, con fuentes anteriores preservadas. B18 y B30 completan los relatos del ascensor lunar y el museo de recuerdos. Duración: 5,85 s por escena, con pausa final más larga.

La galería ahora deriva sus categorías del catálogo real, en vez de una lista fija que omitía colecciones nuevas. Conserva el select nativo y su etiqueta; no se añaden dependencias ni controles personalizados. Prueba nueva en Chromium: categorías completas, composición con búsqueda/paquete y retorno a todas. La comprobación offline también verifica categorías y conteo filtrado. Referencia técnica: https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/Option

El índice docs/MOA-AVENTURAS.md reúne B01–B30: 30 escenas, 336 cuadros, enlaces a fuente, JSON, prompt y secuencia. No se considera una animación fluida interpolada: son poses raster discretas y editables.

Las previsualizaciones GIF de los bloques 4 y 5 se regeneraron desde los PNG con sus pausas definitivas: 5.850 ms; los atlas permanecen idénticos. La prueba offline selecciona B29, comprueba decodificación del atlas de 12 cuadros y reproduce hasta el reposo.

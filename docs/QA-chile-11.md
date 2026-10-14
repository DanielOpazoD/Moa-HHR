# C21G · Pasito y giro completo

- Entrega adicional, 18 poses distintas, 5680 ms, ciclo finito. C21 conserva sus archivos byte a byte.
- Observación directa de 14–20 s del clip citado en C21. Preparación y giro hacia perfil/espalda visibles; retorno frontal completado artísticamente porque el clip termina antes.
- Revisión personal: frente, perfil derecho, espalda sin cara ni emblema, perfil izquierdo, retorno frontal; piernas y brazos giran con torso y cabeza. Micrófono corregido en v2. No se trata de rotar una imagen frontal plana.
- Orden de reproducción explícito en frameFiles: se intercambian dos celdas para evitar un retroceso de perfil a tres cuartos. No hay cuadros duplicados ni PNG redibujados por código.
- Fuente v1 y v2 preservadas; PNG individuales v2 y atlas final v3. Usar rebuild.py para mantener la edición y orden de los cuadros.
- Validación de catálogo, hashes, márgenes y round-trip editable; CI de navegador exigido antes de fusionar. Prueba específica conserva ambas escenas y verifica los 18 cuadros y fin de reproducción.
- Es una caricatura raster, sin audio, sin aval ni colaboración del cantante; no captura de movimiento. Firefox/Safari y equipos físicos no probados.

Catálogo: 215 escenas (18 originales + 197 nuevas), 2466 cuadros declarados.

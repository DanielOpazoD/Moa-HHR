# Moa compañero · índice de las 15 animaciones

Producción directa del asistente principal, aprobada por el usuario. Fuentes generadas con image_gen; PNG individuales, atlas, prompts, temporización y JSON editables. Son animaciones raster: el JSON permite ajustar reproducción y los PNG permiten retoques, pero no equivalen a un rig vectorial con articulaciones.

## companion-01

[Revisión y límites](QA-companion-01.md) · [Secuencias](../evidence/companion-01-overview.png)

- [A01 · Moa escucha](../new-scenes/scenes/A01.json): 8 poses, 4 s. [PNG](../new-scenes/frames/A01-v1/)
- [A02 · La idea aparece](../new-scenes/scenes/A02.json): 8 poses, 4 s. [PNG](../new-scenes/frames/A02-v1/)
- [A03 · Todo guardado](../new-scenes/scenes/A03.json): 8 poses, 4 s. [PNG](../new-scenes/frames/A03-v2/)
- [A04 · Pequeña pausa](../new-scenes/scenes/A04.json): 8 poses, 4 s. [PNG](../new-scenes/frames/A04-v1/)
- [A05 · Gracias silenciosas](../new-scenes/scenes/A05.json): 8 poses, 4 s. [PNG](../new-scenes/frames/A05-v1/)
## companion-02

[Revisión y límites](QA-companion-02.md) · [Secuencias](../evidence/companion-02-overview.png)

- [A06 · El dato perdido](../new-scenes/scenes/A06.json): 12 poses, 6 s. [PNG](../new-scenes/frames/A06-v2/)
- [A07 · Moa sincroniza](../new-scenes/scenes/A07.json): 12 poses, 6 s. [PNG](../new-scenes/frames/A07-v2/)
- [A08 · Algo no encaja](../new-scenes/scenes/A08.json): 12 poses, 6 s. [PNG](../new-scenes/frames/A08-v1/)
- [A09 · El informe interminable](../new-scenes/scenes/A09.json): 12 poses, 6 s. [PNG](../new-scenes/frames/A09-v1/)
- [A10 · Esperando conexión](../new-scenes/scenes/A10.json): 12 poses, 6 s. [PNG](../new-scenes/frames/A10-v2/)
## companion-03

[Revisión y límites](QA-companion-03.md) · [Secuencias](../evidence/companion-03-overview.png)

- [A11 · El relevo de turno](../new-scenes/scenes/A11.json): 12 poses, 6 s. [PNG](../new-scenes/frames/A11-v2/)
- [A12 · Nadie queda fuera](../new-scenes/scenes/A12.json): 12 poses, 6 s. [PNG](../new-scenes/frames/A12-v2/)
- [A13 · La ola y el castillo](../new-scenes/scenes/A13.json): 12 poses, 6 s. [PNG](../new-scenes/frames/A13-v2/)
- [A14 · La noche termina](../new-scenes/scenes/A14.json): 12 poses, 6 s. [PNG](../new-scenes/frames/A14-v5/)
- [A15 · El pequeño gran logro](../new-scenes/scenes/A15.json): 12 poses, 6 s. [PNG](../new-scenes/frames/A15-v1/)

## Integración futura segura

- Estas escenas están en la biblioteca; no se han conectado a eventos de HHR ni se ha desplegado esa aplicación.
- A03 (guardado) y A07 (sincronización) solo deben acompañar un éxito confirmado, nunca sustituir el estado real. A10 distingue búsqueda de señal y alivio final: no usar el final como confirmación sin conexión comprobada.
- El texto accesible debe expresar el estado; la animación es complementaria. Respetar movimiento reducido y reproducción finita, evitar repeticiones invasivas.
- A11 y A14 son historias de relevo, no protocolos clínicos ni validación de la entrega de un paciente. No contienen datos reales.
- Índice general: [galería](../index.html). Galería autónoma: [HTML offline](../review/moa-scenes.html).

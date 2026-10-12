# Expansión de 30 actuaciones

Base: main `f9c796fa18c22f5acad86eb68ff47571ca5a7f7f`. Una sola sesión, sin agentes adicionales. PR por bloques; el revisor de la conversación principal controla los merges. HHR es solo lectura; no hay despliegues.

## Orden autorizado

1. Saludo tímido → entusiasmo
2. Respiración tranquila
3. Sorpresa → recuperación
4. Vergüenza
5. Orgullo discreto
6. Aburrimiento y tamborileo
7. Frío y bufanda
8. Calor y abanico
9. Anticipación de estornudo
10. Agradecimiento y reverencia
11. Café caliente
12. Libro enorme al revés
13. Regar planta y hojita
14. Avión de papel
15. Paraguas al revés
16. Guitarra, fallo y acorde sin audio
17. Estiramientos tras el turno
18. Última pieza de rompecabezas
19. Mariposa en cabeza
20. Lavado de manos lúdico abreviado, no protocolo
21. Llegada al turno
22. Entrega de turno ficticia sin datos
23. Ecografía de peluche
24. Acompañar a alguien triste sin invadir
25. Preparación para taller de reanimación con maniquí adulto, sin maniobras
26. Empanada gigante
27. Zanahoria y caída suave
28. Orquesta de amigos sin audio
29. Astronauta y libreta
30. Fin de turno bajo estrellas

## Bloque 1 · cinco gestos simples

Ocho poses ilustradas distintas por escena, pausa expresiva, 4–5 segundos, retorno al maestro. El saludo cambia de timidez a bienvenida; no repite el saludo v2 de entusiasmo inmediato. Respiración se representa con ojos cerrados, pecho y hombros sutiles, sin instrucciones de frecuencia. Sorpresa usa cejas, manos y recuperación; vergüenza oculta parcialmente una sonrisa entre las manos sin perder la cara; orgullo usa postura erguida y un asentimiento contenido.

El estado por escena y sus notas visuales se registran en los JSON individuales. Una fuente generada no equivale a escena aprobada.

## Revisión clínica antes de la escena 25

Antes de dibujar se debe fijar y revisar: tipo/edad del maniquí, colocación anatómica de manos y postura del rescatador, qué movimiento se representa y qué pasos se omiten. No confundir una secuencia decorativa de 3–6 segundos con un protocolo, ni representar profundidad/cadencia/instrucciones no verificadas. El paciente debe ser inequívocamente un maniquí de entrenamiento. Estas decisiones requieren revisión clínica; las escenas anteriores pueden continuar de forma independiente.

## Bloque 1 integrado por el revisor principal

Cinco gestos, 40 poses nuevas, 158.507 bytes de atlas activos. [Lámina](../evidence/gestures-01-overview.png), [revisión del bloque](QA-gestures-01.md), [galería offline actualizada](../review/moa-scenes.html).

[PR #2](https://github.com/DanielOpazoD/Moa-HHR/pull/2), integrado en `8bf7e9f4d717965f8b7f7fe79c245c073be8b6bd`. El bloque 2 parte de ese SHA.

## Bloque 2 · acciones cotidianas 6–10

Aburrimiento, bufanda, abanico y estornudo usan doce poses; agradecimiento usa ocho. Se conservan las fuentes rechazadas y los prompts de corrección. Estado de trabajo en los JSON individuales; ninguna fuente se aprueba antes de revisar continuidad, fondos, tamaños y reproducción.

Bloque 2 revisado: 56 poses, 255.188 bytes. [Revisión](QA-gestures-02.md) · [Lámina](../evidence/gestures-02-overview.png).

[PR #3](https://github.com/DanielOpazoD/Moa-HHR/pull/3), integrado por el revisor principal en `ca89613979935c8842df455434e255d623ddb147`. El bloque 3 parte de ese SHA.

## Bloque 3 · objetos y acciones 11–15

Café caliente, libro al revés y planta usan doce poses. Avión de papel y paraguas usan dieciséis para mostrar lanzamiento/seguimiento y apertura/reparación. Las correcciones de identidad, agarre, orientación y separación del original se conservan junto a los prompts.

Bloque 3 revisado: 68 poses, 340.480 bytes. [Revisión](QA-gestures-03.md) · [Lámina](../evidence/gestures-03-overview.png).

## Bloque 4 · gestos y tareas 16–20

Guitarra, estiramientos y rompecabezas tienen doce poses; mariposa y lavado de manos, dieciséis. La viñeta de manos se identifica expresamente como abreviada en la galería, sin presentar sus 5,6 segundos como duración de higiene ni protocolo.

La consulta sobre el alcance de la escena 25 se abrió antes de dibujar: preparación con maniquí adulto sin compresiones, o maniobra sujeta a revisión clínica de postura, manos y movimiento. Las escenas independientes continúan mientras se resuelve.

### Alcance resuelto para la escena 25

El revisor principal fijó «Preparándose para practicar reanimación»: maniquí adulto inequívoco y compañero instructor; Moa se arrodilla, escucha, prepara material y termina atento. Sin compresiones, ventilaciones, descargas ni cifras clínicas. Viñeta decorativa de preparación, no tutorial. Decisión recibida antes de generar; no queda bloqueo clínico para ese alcance.

Bloque 4 sobre `3c41d8526c82d9effa51f97071c3912bcf52ec4c`, tras merge del [PR #4](https://github.com/DanielOpazoD/Moa-HHR/pull/4) por el revisor principal. 68 poses, 350.525 bytes. [Revisión](QA-gestures-04.md) · [Lámina](../evidence/gestures-04-overview.png).

## Bloque 5 · colaboración y cuidado ficticio 21–25

Llegada al turno, entrega ficticia y acompañamiento usan doce poses; ecografía lúdica de peluche y preparación del taller usan dieciséis. Pizarra sin datos, peluche inequívoco, icono simbólico en pantalla y maniquí adulto de plástico. El alcance de preparación se fijó antes de generar: no se realizan maniobras clínicas. Las notas de contexto correspondientes se muestran en la galería.

Bloque 5 sobre `997d96a8716382d382e1e03564358cc81d984802`, tras merge del [PR #5](https://github.com/DanielOpazoD/Moa-HHR/pull/5) por el revisor principal. 68 poses, 451.323 bytes. [Revisión](QA-gestures-05.md) · [Lámina](../evidence/gestures-05-overview.png).

## Bloque 6 · escenas completas 26–30

Empanada gigante, zanahoria, orquesta, astronauta y despedida usan dieciséis poses cada una. Se conservan intentos rechazados y correcciones, sin cargarlos como atlas activos. [Revisión](QA-gestures-06.md) · [Lámina](../evidence/gestures-06-overview.png).

Ampliación completa: 30 escenas animadas, 380 poses. Con las 14 iniciales: 44 escenas nuevas y 536 poses editables; 3.014.954 bytes de atlas activos separados de HHR.

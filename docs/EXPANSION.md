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
25. Entrenamiento de reanimación con maniquí/peluche
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

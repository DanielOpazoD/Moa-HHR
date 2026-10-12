# Plan de las 14 escenas nuevas

Estado final: 14 escenas empaquetadas y revisadas visual/técnicamente; PR en borrador. No se cuentan las fuentes descartadas como escenas adicionales. La galería lista 18 originales y 14 nuevas. El estado final y los datos técnicos viven en [manifest.json](../new-scenes/manifest.json).

| # | Escena | N previsto | Duración | Actuación y criterio visual |
|---|---|---:|---:|---|
| 1 | Computador | 12 | 4,8 s | teclear alternando manos, pensar, resolver, retomar; escritorio estable |
| 2 | Fonendoscopio | 12 | 4,8 s | colocar auriculares, escuchar a oso ficticio vestido, retirar, tranquilizar |
| 3 | Leche a recién nacido | 12 | 5,4 s | sostener cabeza y cuerpo, acercar biberón, pausa cálida, retirar; ficción |
| 4 | Pesas | 12 | 4,2 s | flexión progresiva de codos, esfuerzo amable, bajada controlada |
| 5 | Manzana | 12 | 4,8 s | acercar, morder, masticar, bajar; mordida persiste |
| 6 | Empanada en Tía Berta | 12 | 4,8 s | levantar, morder, disfrutar, bajar a plato; local identificable |
| 7 | Jugar con amigos | 12 | 4,8 s | anticipar, pasar pelota, recibir, celebrar; trayecto legible |
| 8 | Dientes | 12 | 4,2 s | acercar cepillo, movimientos cortos, sonrisa final |
| 9 | Discoteca | 12 | 4,8 s | transferir apoyo y alternar brazos; traje suave luminoso y bola redonda |
| 10 | Disfraz gracioso | 8 | 4 s | disfraz de rana, revelar rostro y gesto juguetón; Moa reconocible |
| 11 | Tallarines cómicos | 12 | 5,4 s | levantar tallarines, sorber exageradamente, mejillas, satisfacción |
| 12 | Pensando | 8 | 4,2 s | mirada, mano a barbilla, duda, comprensión, reposo |
| 13 | Melancólico | 8 | 4,8 s | mirada baja, hombros suaves, suspiro, calma esperanzada |
| 14 | Cumpleaños 11 octubre | 12 | 6 s | muchos amigos enfermeros ficticios, cucharada de torta y celebración |

Todas: silencio, sin flashes, cámara fija, brazos y expresión realmente dibujados; sin traslación de una estatua. Trayectoria base [0,0]; el movimiento ocurre en las poses. Una reproducción finita seguida del reposo maestro.

## Puerta de revisión

Identidad, manos y objetos, continuidad, alfa, encuadre/X, tamaño real y ampliado, tres fondos, reproducción completa. Automatización verifica geometría y metadatos; no puede certificar calidad artística. Fallos visuales requieren corrección de la fuente con image_gen, no inflar cuadros.

## Entregas revisadas

Cada enlace lleva al JSON editable, atlas activo y revisión completa. Las miniaturas quietas no sustituyen la animación del reproductor.

| Escena editable | Cuadros | Duración | Bytes | Atlas | Evidencia |
|---|---:|---:|---:|---|---|
| [Trabajando en computador](../new-scenes/scenes/computer.json) | 12 | 4.8 s | 78687 | [PNG](../new-scenes/atlases/moa-computer-v1.png) | [Cuadros y navegador](../evidence/computer/) |
| [Examinando con fonendoscopio](../new-scenes/scenes/checkup.json) | 12 | 4.8 s | 93693 | [PNG](../new-scenes/atlases/moa-checkup-v1.png) | [Cuadros y navegador](../evidence/checkup/) |
| [Dando leche a un recién nacido](../new-scenes/scenes/baby.json) | 12 | 5.4 s | 68664 | [PNG](../new-scenes/atlases/moa-baby-v1.png) | [Cuadros y navegador](../evidence/baby/) |
| [Haciendo pesas](../new-scenes/scenes/weights.json) | 12 | 4.2 s | 58507 | [PNG](../new-scenes/atlases/moa-weights-v1.png) | [Cuadros y navegador](../evidence/weights/) |
| [Comiendo manzana](../new-scenes/scenes/apple.json) | 12 | 4.8 s | 50774 | [PNG](../new-scenes/atlases/moa-apple-v2.png) | [Cuadros y navegador](../evidence/apple/) |
| [Empanada en Tía Berta](../new-scenes/scenes/empanada.json) | 12 | 4.8 s | 75973 | [PNG](../new-scenes/atlases/moa-empanada-v1.png) | [Cuadros y navegador](../evidence/empanada/) |
| [Jugando con amigos](../new-scenes/scenes/friends.json) | 12 | 4.8 s | 82946 | [PNG](../new-scenes/atlases/moa-friends-v1.png) | [Cuadros y navegador](../evidence/friends/) |
| [Lavándose los dientes](../new-scenes/scenes/teeth.json) | 12 | 4.2 s | 52835 | [PNG](../new-scenes/atlases/moa-teeth-v1.png) | [Cuadros y navegador](../evidence/teeth/) |
| [Bailando bajo la bola de discoteca](../new-scenes/scenes/disco.json) | 12 | 4.8 s | 52125 | [PNG](../new-scenes/atlases/moa-disco-v2.png) | [Cuadros y navegador](../evidence/disco/) |
| [Disfraz gracioso](../new-scenes/scenes/costume.json) | 8 | 4 s | 39744 | [PNG](../new-scenes/atlases/moa-costume-v1.png) | [Cuadros y navegador](../evidence/costume/) |
| [Tallarines cómicos](../new-scenes/scenes/noodles.json) | 12 | 5.4 s | 72154 | [PNG](../new-scenes/atlases/moa-noodles-v2.png) | [Cuadros y navegador](../evidence/noodles/) |
| [Pensando](../new-scenes/scenes/thinking.json) | 8 | 4.2 s | 34155 | [PNG](../new-scenes/atlases/moa-thinking-v1.png) | [Cuadros y navegador](../evidence/thinking/) |
| [Melancólico](../new-scenes/scenes/melancholy.json) | 8 | 4.8 s | 34268 | [PNG](../new-scenes/atlases/moa-melancholy-v1.png) | [Cuadros y navegador](../evidence/melancholy/) |
| [Cumpleaños · 11 de octubre](../new-scenes/scenes/birthday.json) | 12 | 6 s | 146637 | [PNG](../new-scenes/atlases/moa-birthday-v2.png) | [Cuadros y navegador](../evidence/birthday/) |

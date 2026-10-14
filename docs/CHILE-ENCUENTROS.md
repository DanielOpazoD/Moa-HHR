# Moa · encuentros ficticios con invitados

Primera autorización: C21, C22, C23, C25, C27, C30 y C36. Segunda autorización explícita: C39–C48. Se mantienen los IDs no consecutivos y no se producen las propuestas intermedias no aprobadas. Cada escena combina Moa con una caricatura humana reconocible del invitado. Son encuentros inventados, sin aval, colaboración real, citas atribuidas, audio ni destellos.

## Estado

| ID | Encuentro | Estado |
|---|---|---|
| C21 | Aprende el paso de Leo Rey | 12 poses, 4150 ms, 98010 B; [JSON](../new-scenes/scenes/C21.json) · [PNG](../new-scenes/frames/C21-v4/) |
| C22 | Leo Rey y el pedestal demasiado alto | 16 poses, 5600 ms, 125659 B; [JSON](../new-scenes/scenes/C22.json) · [PNG](../new-scenes/frames/C22-v3/) |
| C23 | Naya Fácil y la selfie | 16 poses, 5600 ms, 123440 B; [JSON](../new-scenes/scenes/C23.json) · [PNG](../new-scenes/frames/C23-v3/) |
| C25 | Naya de gala y la capa de Moa | 12 poses, 4600 ms, 96810 B; [JSON](../new-scenes/scenes/C25.json) · [PNG](../new-scenes/frames/C25-v1/) |
| C27 | La once de Pancho y Moa | 12 poses, 4600 ms, 97760 B; [JSON](../new-scenes/scenes/C27.json) · [PNG](../new-scenes/frames/C27-v5/) |
| C30 | Luis y la risa tardía | 12 poses, 4600 ms, 115439 B; [JSON](../new-scenes/scenes/C30.json) · [PNG](../new-scenes/frames/C30-v1/) |
| C36 | Pedro acomoda la corbata | 12 poses, 4600 ms, 90599 B; [JSON](../new-scenes/scenes/C36.json) · [PNG](../new-scenes/frames/C36-v1/) |

Primer bloque disponible: [QA](QA-chile-06.md) · [lámina](../evidence/chile-06-overview.png). C21 se incorporó posteriormente en [QA X](QA-chile-10.md).

## Referencias realmente inspeccionadas

Se descargaron los bytes y se inspeccionaron los retratos locales antes de generar. [Registros con URL, SHA-256, observaciones y uso](../evidence/guest-references/). Las fotografías no se redistribuyen aquí ni se les atribuye licencia abierta; se conservan las fuentes raster generadas y todos sus descartes.

- [Leo Rey, MúsicaPopular.cl](https://www.musicapopular.cl/artista/leo-rey/): pelo largo rizado negro, nariz prominente y sonrisa amplia. C22 adopta camisa negra y caricatura humana distinta de Moa.
- [Naya Fácil, ADN Radio](https://www.adnradio.cl/2025/01/06/la-discriminacion-es-clara-naya-facil-acusa-que-no-fue-invitada-a-la-gala-de-vina-pese-ser-la-embajadora-del-festival/): pelo castaño oscuro ondulado, cejas, pestañas, labios, sonrisa y aros. Vestidos y situación son propios del encargo; no recrean la noticia.
- [Pancho Saavedra, Canal 13](https://www.13.cl/programas/lugares-que-hablan/extras/acompana-a-pancho-saavedra-en-su-aventura-en-huellelhue/video): pelo corto elevado, rostro ancho y risa abierta.
- [Luis Slimming, Canal 13](https://www.13.cl/programas/el-desestrece/noticias/luis-slimming-regresa-a-la-tv-con-el-desestrece-este-domingo-que): lentes negros, pelo corto con canas, barba y bigote cortos, camisa oscura sobre gris.
- [Pedro Pascal, StarWars.com](https://www.starwars.com/news/pedro-pascal-revealed-as-the-mandalorian): pelo ondulado elevado, bigote/barba corta, nariz y pliegues junto a ojos. Se usa el retrato humano, sin personaje de ficción o vestuario de esa producción.

## C21: referencia inspeccionada y bloqueo resuelto

Se leyó el [artículo de Canal 13 del 25 de septiembre de 2026](https://www.13.cl/ar13/noticias/daniela-gonzalez-quedo-en-medio-del-viral-momento-de-leo-rey-revelo-que-paso-sobre-el). El HTML enlaza estos dos vídeos:

- https://www.tiktok.com/@pelao_osvaldo/video/7688463466172026130
- https://www.tiktok.com/@dany_isu/video/7689234154654846226

El 14-10-2026 UTC se obtuvo y revisó el primer clip público (20 segundos). Se inspeccionó la secuencia completa a dos muestras por segundo y el tramo 5–11 s a cuatro muestras por segundo. [Registro de procedencia y SHA-256](../evidence/guest-references/leo-step.json). El segundo enlace no se utilizó como evidencia visual.

C21 adapta el rebote de rodillas, el balanceo de hombros y brazos y los pasos compactos. Conserva el traje negro, cuello dorado, lentes y micrófono. Moa observa y acompaña al cantante. Los pies quedan parcialmente ocultos en el registro: sus apoyos se simplifican en la caricatura. Es una interpretación abreviada, no una captura de movimiento exacta. No incluye audio ni la frase del espectáculo y no redistribuye el video. Las cuatro iteraciones generadas se conservan; v4 corrige el encuadre y mejora la alternancia.

## Cierre del alcance disponible

Seis encuentros completados: C22, C23, C25, C27, C30 y C36; 80 poses y 649.707 bytes de atlas. Este fue el cierre del bloque inicial; C21 se completó después y ya figura en el catálogo. Segundo bloque: [QA](QA-chile-07.md) · [lámina](../evidence/chile-07-overview.png). Se conservan las cinco fuentes de C27: v1/v2 fallaron en tapas; v3 omitía la tapa pequeña en un cuadro; v4 corrigió continuidad; v5 añade separación segura entre celdas. C30 y C36 usan v1. Las entregas posteriores se autorizan por separado.

## Entrega directa C39–C48

Diez escenas preparadas, 108 poses editables. C39/C40/C42: [QA VIII](QA-chile-08.md). C41/C43/C44/C45/C46/C47/C48: [QA IX](QA-chile-09.md). [Lámina del segundo bloque](../evidence/chile-09-overview.png). C21 es una entrega adicional documentada en QA X.

- [C39 · El Profesor Rossa descubre a Moa](../new-scenes/scenes/C39.json): 12 poses.
- [C40 · Moa y Guru Guru, alumnos distraídos](../new-scenes/scenes/C40.json): 12 poses.
- [C41 · La llamada inesperada](../new-scenes/scenes/C41.json): 12 poses.
- [C42 · Felipe Avello entrevista al más callado](../new-scenes/scenes/C42.json): 8 poses.
- [C43 · El aplauso interminable](../new-scenes/scenes/C43.json): 12 poses.
- [C44 · Los Jaivas invitan a Moa a la percusión](../new-scenes/scenes/C44.json): 8 poses.
- [C45 · Moa y Los Jaivas levantan una cordillera](../new-scenes/scenes/C45.json): 8 poses.
- [C46 · La Gaviota le queda grande](../new-scenes/scenes/C46.json): 12 poses.
- [C47 · El Monstruo termina queriendo a Moa](../new-scenes/scenes/C47.json): 12 poses.
- [C48 · Don Carter entrega una carta gigante](../new-scenes/scenes/C48.json): 12 poses.

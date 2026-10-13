# Moa · encuentros ficticios con invitados

Autorización limitada a C21, C22, C23, C25, C27, C30 y C36. Se mantienen esos IDs no consecutivos: no se producen las escenas intermedias ni las propuestas C39–C48. Cada escena combina Moa con una caricatura humana reconocible del invitado. Son encuentros inventados, sin aval, colaboración real, citas atribuidas, audio ni destellos.

## Estado

| ID | Encuentro | Estado |
|---|---|---|
| C21 | Aprende el paso de Leo Rey | Bloqueada por referencia de vídeo no inspeccionable |
| C22 | Leo Rey y el pedestal demasiado alto | 16 poses, 5600 ms, 125659 B; [JSON](../new-scenes/scenes/C22.json) · [PNG](../new-scenes/frames/C22-v3/) |
| C23 | Naya Fácil y la selfie | 16 poses, 5600 ms, 123440 B; [JSON](../new-scenes/scenes/C23.json) · [PNG](../new-scenes/frames/C23-v3/) |
| C25 | Naya de gala y la capa de Moa | 12 poses, 4600 ms, 96810 B; [JSON](../new-scenes/scenes/C25.json) · [PNG](../new-scenes/frames/C25-v1/) |
| C27 | Pancho Saavedra y la once | Pendiente de producción |
| C30 | Luis Slimming y la risa tardía | Pendiente de producción |
| C36 | Pedro Pascal acomoda la corbata | Pendiente de producción |

Primer bloque disponible: [QA](QA-chile-06.md) · [lámina](../evidence/chile-06-overview.png). C21 no está en el manifiesto ni cuenta como animación completada.

## Referencias realmente inspeccionadas

Se descargaron los bytes y se inspeccionaron los retratos locales antes de generar. [Registros con URL, SHA-256, observaciones y uso](../evidence/guest-references/). Las fotografías no se redistribuyen aquí ni se les atribuye licencia abierta; se conservan las fuentes raster generadas y todos sus descartes.

- [Leo Rey, MúsicaPopular.cl](https://www.musicapopular.cl/artista/leo-rey/): pelo largo rizado negro, nariz prominente y sonrisa amplia. C22 adopta camisa negra y caricatura humana distinta de Moa.
- [Naya Fácil, ADN Radio](https://www.adnradio.cl/2025/01/06/la-discriminacion-es-clara-naya-facil-acusa-que-no-fue-invitada-a-la-gala-de-vina-pese-ser-la-embajadora-del-festival/): pelo castaño oscuro ondulado, cejas, pestañas, labios, sonrisa y aros. Vestidos y situación son propios del encargo; no recrean la noticia.
- [Pancho Saavedra, Canal 13](https://www.13.cl/programas/lugares-que-hablan/extras/acompana-a-pancho-saavedra-en-su-aventura-en-huellelhue/video): pelo corto elevado, rostro ancho y risa abierta.
- [Luis Slimming, Canal 13](https://www.13.cl/programas/el-desestrece/noticias/luis-slimming-regresa-a-la-tv-con-el-desestrece-este-domingo-que): lentes negros, pelo corto con canas, barba y bigote cortos, camisa oscura sobre gris.
- [Pedro Pascal, StarWars.com](https://www.starwars.com/news/pedro-pascal-revealed-as-the-mandalorian): pelo ondulado elevado, bigote/barba corta, nariz y pliegues junto a ojos. Se usa el retrato humano, sin personaje de ficción o vestuario de esa producción.

## Bloqueo concreto de C21

Se leyó el [artículo de Canal 13 del 25 de septiembre de 2026](https://www.13.cl/ar13/noticias/daniela-gonzalez-quedo-en-medio-del-viral-momento-de-leo-rey-revelo-que-paso-sobre-el). El HTML enlaza estos dos vídeos:

- https://www.tiktok.com/@pelao_osvaldo/video/7688463466172026130
- https://www.tiktok.com/@dany_isu/video/7689234154654846226

La herramienta web devolvió `URL ... is not accessible via this tool` para ambos vídeos; los enlaces de perfiles devolvieron `Failed to fetch restricted URL`. No se intentó eludir esa restricción con otra ruta de descarga. El texto no describe suficientemente las posiciones para reproducir el paso y no sustituye ver el vídeo. C21 requiere un archivo del clip o una fuente pública accesible del mismo movimiento. No se ha generado un baile genérico bajo ese nombre, ni se incorporará la controversia del espectáculo.

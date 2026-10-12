# Moa · veinte viñetas de Rapa Nui

Base de partida: `95f5ecc5a3bb83e26a4f2d56f7de9bb5a5fe5acb`. Una sola sesión; HHR solo lectura. El revisor principal controla merges y Library. Sin despliegues.

Son viñetas artísticas de un personaje ficticio, no reconstrucciones etnográficas certificadas. Ningún atuendo, gesto o relato se denomina ancestral sin evidencia. Las fotografías consultadas de terceros sirven para inspección; se enlazan sin atribuirnos su licencia ni incorporarlas al paquete de sprites.

## Bloques

| Bloque | Códigos | Acciones                                               | Estado                      |
| ------ | ------- | ------------------------------------------------------ | --------------------------- |
| 1      | R01–R05 | Flores, brisa, piña, poʻe, ukulele                     | Revisado; preparado para PR |
| 2      | R06–R10 | Sau-sau, kai-kai, manavai, toromiro, tortuga           | Investigación pendiente     |
| 3      | R11–R15 | Costa limpia, pesca, remos, carrera con plátanos, umu  | Pendiente                   |
| 4      | R16–R20 | Tejido, celebración, memoria cotidiana, sendero, Tahai | Pendiente                   |

## Referencias del bloque 1

Consultadas el 12 de octubre de 2026. Las fuentes concretas y los límites se repiten en los JSON de cada escena.

- **R01 — Bienvenida con flores.** Concepto aprobado por Daniel. Corona pequeña ofrecida como regalo cotidiano; no se afirma que reproduzca un protocolo de recepción ni se asigna una especie botánica o significado ceremonial. Sin vestuario añadido. Esta limitación se declara antes de aprobar la escena.
- **R02 — Viento de la isla.** [Descripción del entorno costero por el alojamiento local Explora Rapa Nui](https://www.explora.com/explora-lodge-easter-island-new/). Apoya el contexto de costa y praderas expuestas, no un uso tradicional del pañuelo. Pañuelo liso contemporáneo y actuación inventada.
- **R03 — Piña compartida.** [Portal de las Culturas Originarias: gastronomía Rapa Nui](https://2023.serindigena.org/insular/rapa-nui/gastronomia/) incluye la piña entre sus frutas. Compartir los trozos es una escena ficticia, sin significado ritual ni afirmación sobre una variedad particular.
- **R04 — Poʻe para todos.** La misma fuente contiene una receta atribuida a **Yanet Teao Beri Beri**, con plátano, zapallo y harina, entre otros ingredientes. Se representa comida ya horneada mediante porciones rectangulares simplificadas, sin receta/tutorial. El relato de reparto y reciprocidad es ficción; no se presenta como costumbre documentada. La imagen enlazada junto a la receta muestra plátanos, no la forma del plato terminado.
- **R05 — Ukulele al atardecer.** [RapaMusic: ukulele ASONU rapa nui/tahitiano](https://rapamusic.com/en/products/ukelele-asonu-con-funda) describe cuerpo de madera maciza y ocho cuerdas. [Small Island Big Song: instrumento de Rapa Nui](https://www.smallislandbigsong.com/fullscreen-page/comp-jdx1cgyd/1962f384-2f23-438c-87b7-16ecabdb1e49/10/%3Fi=10&p=lzby4&s=style-jdx1nxid) aporta fotografía inspeccionada: cuerpo ancho, clavijero largo y cuatro pares de cuerdas. Se usa esa morfología sin copiar marcas; la digitación será simplificada, no una lección de acordes ni una canción tradicional. Sin audio.

## Criterios de aprobación

Fuentes raster image_gen y prompts conservados; descartes identificados. Cuadros articulados y distintos, 3–6 segundos, pausa final, N variable y movimiento reducido. Revisión de todos los cuadros en claro, oscuro y azul a 144×84 CSS y ampliados, carga selectiva, márgenes para cierre, hashes, reconstrucción editable y CI. Los atlas nuevos permanecen separados del presupuesto original de HHR.

Bloque 1: 64 poses, 374.642 bytes; máximo 120.889 por atlas. Catálogo acumulado: 67 escenas (18 originales + 49 nuevas), 600 poses nuevas editables. [Revisión](QA-rapanui-01.md) · [Lámina](../evidence/rapanui-01-overview.png).

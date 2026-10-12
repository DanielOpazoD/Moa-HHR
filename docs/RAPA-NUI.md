# Moa · veinte viñetas de Rapa Nui

Base de partida: `95f5ecc5a3bb83e26a4f2d56f7de9bb5a5fe5acb`. Una sola sesión; HHR solo lectura. El revisor principal controla merges y Library. Sin despliegues.

Son viñetas artísticas de un personaje ficticio, no reconstrucciones etnográficas certificadas. Ningún atuendo, gesto o relato se denomina ancestral sin evidencia. Las fotografías consultadas de terceros sirven para inspección; se enlazan sin atribuirnos su licencia ni incorporarlas al paquete de sprites.

## Bloques

| Bloque | Códigos | Acciones                                               | Estado                      |
| ------ | ------- | ------------------------------------------------------ | --------------------------- |
| 1      | R01–R05 | Flores, brisa, piña, poʻe, ukulele                     | Integrado en PR #8 |
| 2      | R06–R10 | Sau-sau, kai-kai, manavai, toromiro, tortuga           | Integrado en PR #9; R07 adaptado     |
| 3      | R11–R15 | Costa limpia, pesca, remos, carrera con plátanos, umu  | Revisado; preparado para PR                   |
| 4      | R16–R20 | Tejido, celebración, memoria cotidiana, sendero, Tahai | Revisado; preparado para PR                   |

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

## Referencias y adaptación del bloque 2

- **R06 — Aprendiendo sau-sau.** [Imagina Rapa Nui: sau-sau](https://imaginarapanui.com/en/sau-sau-typical-rapa-nui-dance/) y fotografía del Ballet Cultural Kari Kari inspeccionada. Se toman flexión de rodillas, balanceos laterales y brazos bajos; vestuario de cintura simplificado desde el hami descrito y las franjas claras/oscuras de la fotografía. No se agregan pinturas corporales o atributos ceremoniales. Es un ensayo ficticio abreviado, no una coreografía completa ni una reconstrucción ancestral.
- **R07 — Observando la posición inicial del kai-kai.** [Registro Chile Patrimonios/SIGPA](https://www.chilepatrimonios.gob.cl/index.php/ficha?doi=07EPC-107) documenta el inicio con hilo en pulgares y meñiques. [Moe Varua, junio de 2015, página PDF 12](https://moevarua.com/wp-content/uploads/2019/07/Revista-moeVarua-Junio-2015.pdf) muestra Utami y fotografías de enseñanza. Se intentó representar su figura fija, pero tres fuentes image_gen simplificaron incorrectamente los cruces. Se descartan; la adaptación muestra a Moa **observando solo la posición inicial**, sin figura terminada, sin recitación ni significado atribuido. No se presenta como tutorial ni como ejecución de Utami. El [material de Chile para Niños, página impresa 23](https://www.chileparaninos.gob.cl/639/articles-350035_archivo_01.pdf) aporta nombres y recitaciones, pero no instrucciones visuales suficientes para reconstruir sus figuras. No se copia ni inventa un canto.
- **R08 — Pequeño manavai.** [CONAF, Jardín Demostrativo Manavai](https://www.conaf.cl/jardin-demostrativo-manavai-conservacion-de-la-biodiversidad-de-rapa-nui/), texto y fotografía inspeccionados: recinto circular de piedras volcánicas, humedad y protección frente al viento. Se representa un jardín contemporáneo pequeño con una planta de hojas anchas; Moa no interviene un monumento arqueológico. La altura y capacidad protectora están simplificadas visualmente. El enlace externo `manavairapanui.org` redirigió a contenido ajeno al proyecto al consultarlo: se excluyó como evidencia y se usa CONAF.
- **R09 — Cuidando toromiro.** [Plan de Conservación del Toromiro](https://plantoromiro.org/educacion/vision-general-del-toromiro/) y fotografía de plántula atribuida allí a Óscar Fernández/Jardín Botánico Nacional; [Fundación R. A. Philippi](https://fundacionphilippi.cl/catalogo/sophora-toromiro/) para hojas compuestas y folíolos elípticos pequeños. Se conserva esa morfología, sin flores en la plántula ni crecimiento instantáneo. Trasplante, riego y protector son una viñeta de vivero, no un protocolo técnico ni una recomendación de plantación silvestre. No se reproduce el dato de longitud foliar ambiguo de la página del Plan.
- **R10 — Encuentro con tortuga.** [Municipalidad de Rapa Nui, recordatorio de no tocar ni alimentar](https://www.facebook.com/MuniRapaNui/posts/lamentable-p%C3%A9rdida-de-tortuga-en-el-sector-de-motu-hava-producto-de-una-h%C3%A9lice-d/2310939702313591/) y [reproducción periodística del decálogo Sernatur](https://www.biobiochile.cl/noticias/turismo-y-viajes/destinos/2019/09/24/no-tocar-moais-y-tortugas-no-grabar-con-drones-gobierno-publica-reglas-para-turistas-en-rapa-nui.shtml). Observación desde tierra, sin tocar, alimentar o perseguir; tortuga marina con aletas, sin atribuir especie. Distancia visual comprimida para el sprite, no escala métrica de aproximación.

## Referencias del bloque 3

Consultadas el 12 de octubre de 2026.

- **R11 — Costa limpia entre amigos.** [Municipalidad de Rapa Nui: jornada de limpieza costera](https://www.facebook.com/MuniRapaNui/videos/hoy-la-municipalidad-de-rapanui-haretavana-particip%C3%B3-y-colabor%C3%B3-en-la-limpieza-c/372204323724741/). Acción contemporánea ficticia con una botella y guantes; no procedimiento para residuos peligrosos.
- **R12 — Una pequeña alga.** [Portal local de competencias](https://www.rapanui.net/secciones/3144) permite distinguir las modalidades locales de la escena: aquí hay caña recreativa contemporánea y un desenlace cómico inventado, no Here Koreha, Patia Mata Rou o Hi Kua. No se atribuye especie al alga.
- **R13 — Encontrando el ritmo al remar.** La misma fuente describe Vaka Ama en embarcación de totora. La escena usa deliberadamente una canoa moderna y chalecos; no representa esa modalidad. El compañero animal es imaginario, no fauna de la isla. Coordinación abreviada, no clase de navegación.
- **R14 — Carrera con plátanos.** [Imagina Rapa Nui: deportes](https://imaginarapanui.com/dia-de-los-deportes-ancestrales-rapa-nui/) describe una vara sobre los hombros con racimos en ambos extremos; [Municipalidad](https://x.com/muni_rapanui/status/1226635968821841922) documenta Aka Venga. Vara, racimos, carga y vestuario simplificados para Moa; sin peso real ni recorrido arqueológico. No se afirma vigencia de la antigua prueba dentro de Rano Raraku. Dos fotografías no pudieron descargarse (403 y 406); no se sortearon esos bloqueos ni se usaron como referencia visual.
- **R15 — Compartiendo umu.** [Portal de las Culturas Originarias: gastronomía](https://2023.serindigena.org/insular/rapa-nui/gastronomia/) documenta cocción con piedras y hojas de plátano y alimentos como camote. Se muestra únicamente reparto ficticio de porciones cocidas sobre una hoja; sin proceso de cocción ni rito atribuido.

## Referencias del bloque 4

Consultadas el 12 de octubre de 2026. Fotografías inspeccionadas localmente y usadas como referencia visual; no incorporadas al repositorio ni relicenciadas.

- **R16 — Aprendiendo con fibras de plátano.** [Museo de Historia Natural de Valparaíso: colección Rapa Nui](https://www.mhnv.gob.cl/galeria/coleccion-rapa-nui), kete inventario 186 y detalle fotográfico de Patricia Novoa. Apoya el material kakaka y el entrelazado diagonal. Moa practica una esquina de una muestra inacabada; movimientos simplificados, sin reproducir un bolso completo ni enseñar el proceso artesanal. La tutora es ficticia.
- **R17 — Preparando el vestuario.** La misma colección, falda inventario 214, fotografía de Romina Moncada: prenda moderna de baile con mahute y plumas. Se abstraen flecos claros, bandas oscuras y tirantes. [Chile Travel](https://chile.travel/blog/competencias-ancestrales-en-tapati-tradicion-fuerza-y-cultura/) aporta contexto de las actuaciones de Tapati. El vestuario es un accesorio ficticio inspirado en esa documentación, no una pieza patrimonial ni la reproducción de un traje específico del festival. El cepillado es actuación inventada, no consejo de conservación.
- **R18 — Recuerdos compartidos.** Concepto cotidiano aprobado: dos personajes ficticios miran un álbum inventado. No se atribuye un testimonio a una persona real ni se inventa una leyenda o tradición. No requiere una fuente etnográfica; el JSON no incluye una cita que aparente respaldar la ficción. La segunda versión mantiene el álbum visible en los doce cuadros.
- **R19 — Siguiendo el sendero.** [Ma’u Henua: sitio oficial del Parque Nacional Rapa Nui](https://www.rapanuinationalpark.com/), normas de observación a distancia y circulación por senderos demarcados. La figura del fondo es una simplificación sin atribución a un moái concreto. Moa no sustituye un guía acreditado. La escena no representa una ruta, distancia de aproximación ni permiso de acceso.
- **R20 — Atardecer en Tahai.** El mismo sitio oficial identifica Tahai como lugar para contemplar el atardecer. Su fotografía muestra cinco figuras de alturas diferentes sobre una plataforma; se usan como siluetas lejanas, sin animarlas ni tocarlas. Encuadre, vegetación y límites simplificados para la viñeta; no mapa ni reproducción completa de los tres ahu. Moa permanece en el área de visitantes separada del patrimonio.

## Lectura de los prompts

Los archivos enlazados en los JSON conservan el texto exacto enviado al generador y permiten auditar la procedencia. Algunos prompts anteriores se redactaron con palabras concatenadas; esta sección resume su intención con redacción legible. Los futuros prompts se escribirán con espacios normales.

| Escena | Actuación y continuidad que se revisan |
| --- | --- |
| R11 | Recoger una botella, introducirla en la bolsa y celebrar; un solo residuo. |
| R12 | Esperar, sacar un alga, sonreír y bajarla; caña e hilo continuos. |
| R13 | Descoordinarse, mirarse y remar juntos; dos remos y dos chalecos. |
| R14 | Prepararse, correr y frenar; vara y dos racimos siempre sujetos. |
| R15 | Repartir tres porciones y comer juntos; tres platos permanentes. |
| R16 | Observar y practicar una esquina de fibra; muestra inacabada permanente. |
| R17 | Alisar el vestuario, ajustar un tirante y dejar el cepillo en el estante. |
| R18 | Mirar el álbum, señalar, escuchar y sonreír; álbum siempre visible. |
| R19 | Indicar el camino y avanzar por él; patrimonio separado al fondo. |
| R20 | Sentarse, mirar el horizonte y descansar; siluetas patrimoniales inmóviles. |

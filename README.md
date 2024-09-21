<p align="center">
	<img src="readme/logo_letras_horizontal.png" alt="CLUB ATLETISME ATLAS"/>
</p>

---
El Club Atletisme Atlas nace fruto de una voluntad de crecimiento y expansión por parte de un pequeño grupo de apasionados del atletismo. Sergi Garcia, Valentín Gartner y Daniel Espada, técnicos de la sección de Atletismo en el CE Sant Josep Obrer, mostraron su determinación y convicción para crear algo nuevo con identidad propia y con una capacidad de expansión ilimitada.

En verano de 2022, acompañados por Ramón Manzano y Paco Blasco, e inspirados por la ilusión y la energía de un buen puñado de niños y jóvenes, su idea sobrevino en proyección, ideas y toma de decisiones, y tras seis meses de gestiones y trámites, Atlas se convirtió en realidad.

¿Qué pinto yo en todo esto? Daniel Espada lleva siendo mi entrenador desde que tenía 7 años. Unos años antes del 2022 fui también técnico como mis compañeros. Para continuar con nuestra identidad como club, origina esta idea.
## Los inicios del proyecto
Desde siempre me han encantado las hojas de cálculo (los comunmente denominados Excel). Durante el 2023 estuve registrando los resultados de los atletas del club en una de estas hojas, para generar con facilidad ránkings internos, ver quién tiene los récords del club y poder obtener un listado de los registros de cada atleta, así como el coste que ha supuesto competir en cada uno de los eventos.

Sin tener ni idea de bases de datos, casi todo fue a una misma tabla maestra.


<p align="center">
	<img src="readme/tabla_maestra.jpg" alt="Imagen de la tabla maestra"/>
</p>

Salvo por algunos campos que se convertirían en foreign keys, provenientes de otras tablas, como los nombres de los atletas o las pruebas de atletismo que hay.

<p align="center">
	<img src="readme/tabla_pruebas.jpg" alt="Imagen de la tabla de las pruebas de atletismo"/>
</p>

Obviamente nada de esto estaba normalizado, incluso se pueden ver algunos campos irrelevantes para la base de datos, que utilizaba para la interfaz de usuario o para que la hoja de cálculo supiera cómo formatear los resultados introducidos o cómo ordenarlos.

<p align="center">
	<img src="readme/interfaz_usuario.jpg" alt="Una de las interfaces de usuario creada en la hoja de cálculo"/>
</p>

Este resultado con el que me quedé conforme durante un tiempo fue logrado en base a muchas fórmulas y tablas dinámicas. ([Una de estas fórmulas teniendo hasta 6699 caracteres de largo](/public/readme/formula_larga.txt))

<p align="center">
	<img src="readme/tablas_dinamicas.jpg" alt="Tablas dinámicas"/>
</p>
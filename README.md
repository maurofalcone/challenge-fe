# Challenge Tecnico Front-End

## Overview

Desarrollar una tabla virtualizada (~20 filas visibles) de usuarios de GitHub con infinite scrolling, mostrando avatar y nombre (con enlace al perfil). Implementar filtrado por nombre con debounce y gestión de favoritos persistente (localStorage/IndexedDB) con una vista dedicada para ellos.

## Getting Started

Para correr el proyecto es necesario proveer las variables de entorno, las mismas se pueden encontrar en el archivo "env.dist".

Utilizar la ultima version de Node si es posible para evitar problemas con las dependencias. Si nvm esta disponible utilizar el comando para utilizar la version mas reciente.

```bash
nvm use node
```

Luego instalar las dependencias:

```bash
npm i
```

Correr el server en modo development:

```bash
npm run dev
```

Visitar [http://localhost:3000](http://localhost:3000).

## Running Test Cases

```bash
npm run test
```

## Trouble Shooting

- Para una mejor visualizacion, en cuanto a tamaño y nitidez, se redujo el numero de filas visibles (16).
- No se ha utilizado el REST API de Github ya que dicha API no soporta sorting ni busqueda/filtros.
- No se ha implementado styled-componenets ya que no soporta SSR, lo cual echa a perder las ventajas de usar Nextjs.
- Se opto por utilizar [https://dummyjson.com](Dummy JSON) ya que soporta ordenamiento, filtros y paginación.
- Dado el número de componentes, no se han cubierto todos con tests, pero se incluyeron pruebas unitarias representativas para cada tipo (utils, contexts, components, pages).

## Future work

- Utilizar CSS variables.
- Configurar media queries para mejorar el diseño responsivo.
- Crear mas unit test para aumentar el coverage.
- Posibilidad de añadir shadcn y tailwind para mejorar el estilo.
- Añadir animaciones de carga como Skeleton.
- Actualizar favicon.
- Mejorar el manejo de errores.
- Añadir error boundary.
- Encapsular logica del componente en un custom hook. Por ejemplo para manejar la lista de usuarios, ordenamiento y filtro en el homepage.
- Favoritos: para mejorar el manejo de favoritos, podria necesitarse un endpoint que devuelva los detalles de una lista de favoritos, en vez de almacenar la informacion en local storage, almacenaria solamente los ID's de los favoritos (posiblemente usando Map), y al visitar "/favorites" podriamos realizar una peticion para obtener los detalles adicionales como nombre, telefono, email, etc.
- Utilizar JSDOC para documentar funciones como buildURL, entre otras.
- Se podria utilizar un listener de localStorage para actualizar los favoritos en "tiempo real" y asi mantener las tabs sincronizadas o tambien se podria persistir el state del context de favoritos en localStorage para lograr el mismo resultado.

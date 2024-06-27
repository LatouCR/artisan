# Guia para uso

La aplicacion fue creada con `npm create t3-app@latest` [create-t3-app](https://create.t3.gg/) que incluye, NextJs, Typescript, Drizzle, TailwindCSS y la logica y configuracion de la mayoria de conexiones necesarias para que estos sistemas funcionen sin gran complicaion.  

## Comandos 

```c++
npm run dev /* Inicia la instancia de desarrollador */ 
npm run build /* Compila la pagina y genera un archivo. UTILIZAR ANTES DE ENVIAR UN PR PARA EVITAR PROBLEMAS DENTRO DEL DEPLOYMENT */ 
npm run db:push /* Envia los cambios dentro del schema a la base de datos. */ 
npm run db:studio /* Crea una instancia para poder ver, editar y modificar la base de datos desde una instancia local.  
```

## Herramientas.

 - Pagina web con la documentacion. 
 - Link del proyecto utilizado como referencia [Video](https://youtu.be/d5x0JCZbAJs)
 - [Claude.ai](https://claude.ai) Ai muy buena para programacion que permite importar archivos como .tsx o imagenes para referencia de que se quiere hacer. Utilizar en caso de algun error de Typescipt. 

## NextJS

Next.js es un marco web de desarrollo front-end de React de código abierto creado por Vercel que habilita funcionalidades como la representación del lado del servidor y la generación de sitios web estáticos para aplicaciones web basadas en React. (Wikipedia xd).

### Navegacion y App Router

Next.js en su version 14.0, agrego los llamados `App Router` que permiten crear diferentes rutas dentro de un proyecto con solo nombrar una carpeta como la ruta y un archivo `page.tsx`. Para crear una ruta, hay que ir a SRC -> App -> `click derecho y crear un nuevo archivo o carpeta` y adentro agregar un page.tsx. No se puede dejar un page.tsx vacio, agregar minimo un rafce o una funcion exportable con un return y un div que diga algo a next de que existe una pagina. 

Dentro de Next se usan los <Link> Link para redireccionar a otra pagina creado en el approuter. 

src > app > 
    Opciones.
        1. Carpeta dentro de app. Esta va a a ser una ruta dentro de localhost:3000/[NombreDeLaCarpeta]
        2. Carpeta con (). ej. (api), (user) & (main). Estos funcionan para la organizacion de las carpetas. Lee las carpetas como si no existieran y estuvieran en la misma. localhost:3000/[NombreDeLaCarpeta]
        3. Carpeta dentro de una carpeta. ej. profile/settings se accesa por localhost:3000/[CarpetaPadre]/[NombreDeLaCarpeta]
        4. Carpeta Dinamica []. Sirven para "atrapar" una ruta Dinamica, un elemento <a> o <Link> lo puede utilizar para crear esta ruta dinamica. 
            Ej. 
                (user) -> posts/[postId] 
                Crea una ruta dentro de localhost:3000 con la direccion de localhost:3000/posts/[postId].
                Este tambien devuelve un prop que pueden leer todas las carpetas hijo. Punto 3.

[Docs - App Router](https://nextjs.org/docs/app/building-your-application/routing)

### API

Next implementa una sintaxis muy similar a Node.js para la creacion de rutas `route.ts` que se pueden acceder por medio de otras aplicaciones como si fueran una API o por la misma aplicacion. Estas funcionan con `NextResponse` para el manejo de las peticiones. La creacion de rutas es similar a como se harian dentro de las paginas, sin embargo, estas se crean como (api) -> api -> [NombreDeLaCarpeta] / `route.ts`. 

[Docs - Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### Server y Client Components

Server Components:
 - Dejar en blanco o "use server" si es necesario. (Solo en APIs)
 - Se ejecutan en el servidor.
 - No tienen acceso al estado del cliente ni a APIs del navegador. 
    - Es decir, no pueden utilizar hooks. Como useState, useContext, useEffect. 
 - Pueden acceder directamente a recursos del servidor (base de datos, sistema de archivos).
 - Reducen el JavaScript enviado al cliente.
 - Son el comportamiento predeterminado en Next.js.

Client Components:
 - "use client"
 - Se ejecutan en el navegador.
 - Tienen acceso al estado del cliente y APIs del navegador.
 - Pueden usar hooks de React y manejar interactividad.
   - Son necesarios para agregar interactividad a la pagina. Cualquier cosa, que se plantee para que el usuario quiera interactuar, se tiene que utilizar un cliente. 
 
Recomendacion: Para agregar interactividad a a un `page.tsx`, definir la seccion que se va a necesitar y crear un componente que lo ejecute. De esta manera, la pagina no tiene que renderizarse de nuevo completamente, aunque sigue siendo necesario un F5 xd.  Ver ejemplo de /posteos con el `page.tsx` y el `create.tsx`

## FrontEnd

### Tailwind

Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file. (TailwindCSS.com)

[Pagina Web](https://tailwindcss.com/)

Archivos Relevantes:

`tailwind.config.ts`

#### Utilizacion

Este escanea todos los archivos incluidos dentro de `content` en `tailwind.config.ts`.

```
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
```

Para utilizarlo, solo hay que agregar un className dentro de una sintaxis html. Al agregar el className y darle espacio o al escribir una propiedad (similar a bootstrap) este va a recomendar las clases y auto completarlo. 

```tsx
return (
    <div className="flex w-screen items-center justify-center">
        Container
    </div>
)
```

[Documentacion](https://tailwindcss.com/docs)

#### Como incluir una propiedad personalizada.

Para incluir una nueva propiedad, hay que ir al archivo `tailwind.config.ts`. Dentro del archivo buscar el `extend: {}` e incluir la propiedad de css que agregar.
Ejemplo: 
```javascript
borderRadius: {
    2xl: "var(--radius*2)"
},
borderColor: {
    redborder: "#782324"
}
```

### ShadCn

Beautifully designed components that you can copy and paste into your apps.

Shadcn es una lista de componentes re utilizables, editables y open source. Esta esta creada sobre tailwindcss por lo cual, su instalacion es obligatoria. Estos son completamente reutilizables e editables. Se instalan dentro de `src/components/ui`

[Docs - ShadCN](https://ui.shadcn.com/docs)

## BackEnd

### TypeScript

TypeScript es una extensión de JavaScript que añade tipado estático opcional. 

 - Tipos: Puedes declarar tipos para variables, parámetros y retornos de funciones.
 - Interfaces: Permiten definir la estructura de objetos.
 - Genéricos: Facilitan la creación de componentes reutilizables.
 - Decoradores: Añaden metadatos a clases y sus miembros.
 - Módulos: Mejoran la organización del código.
 - Compilación: TypeScript se compila a JavaScript.

```tsx
function saludar(nombre: string): string {
  return `Hola, ${nombre}!`;
}

console.log(saludar("Juan")); // Válido
console.log(saludar(123)); // Error: El argumento debe ser una cadena
```

#### Interfaces

Estas se definen al crear un `interface`. Se pueden exportar e utilizar dentro de multiples componentes. Son necesarias para poder utilizar props, forms o funciones que necesiten de claridad de que tipo de datos se estan utilizando.  

```tsx
interface User {
    user: string,
    name: string,
    id: number,
    posts: string[]
}

const Form<User> {
    return(
        ...
    )
}
```

### Auth

La utenticacion del cliente fue implementada por medio de [Clerk](https://clerk.com/) Auth 

[Documentacion - Clerk Auth](https://clerk.com/docs

### Base de Datos

El proyecto utiliza Vercel PostgresSQL, un servicio de [Vercel](https://vercel.com) que hostea una base de datos Postgress y permite la interaccion con la misma. Para realizar la conexion, unicamente ejecutar el comando `npm run db:push` para sincronizar y crear las tablas y `npm run db:studio` para conectarse a la base de datos. 

[Docs - Postgres](https://vercel.com/docs/storage/vercel-postgres/quickstart)

#### Drizzle

Drizzle es un ORM, Object Relational Mapping, es un framework o sistema que permite realizar las conexiones y peticiones a la base de datos desde el propio entorno de desarrollo. Este es muy similar a la sintaxis de SQL. 

```tsx
// Queries
await db
  .select()
  .from(countries)
  .leftJoin(cities, eq(cities.countryId, countries.id))
  .where(eq(countries.id, 10))
```

- Comandos

```c++
npm run db:push /* Envia los cambios dentro del schema a la base de datos. */ 
npm run db:studio /* Crea una instancia para poder ver, editar y modificar la base de datos desde una instancia local.  
```

```tsx
// Schema
export const countries = pgTable('countries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
});

export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  countryId: integer('country_id').references(() => countries.id),
});
```

# Utilizacion de Drizzle

## 1. Schema

El schema es el archivo que representa como funciona la arquitectura de la base de datos. Esto hace referencia a, el nombre de la tabla, que columnas hay que crear, tipos de datos y relaciones entre columnas. 

El archivo se encuentra dentro de src/server/schema.ts

## 2. Sincronizacion con la base de datos

## 3. Drizzle en un componente

## 4. NextJs Routes
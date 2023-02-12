
# Bekka backend

Is a backend for Bekka marketplace, was designed following the principles of clean architecture and SOLID.

**Tech Stack:** Node as enviroment, Express as framework, Typescript as a language, Prisma for the ORM and axios for HTTP client

**Third-party service:** Cloudinary for image storage

## Run development server
(*You must have configured your ssh key with GitHub*)

Clone the project 


```bash
  git clone git@github.com:tumbichi/marketplace-services.git
```

Go to the project directory

```bash
  cd marketplace-services
```

Install dependencies

```bash
  npm ci
```

Start the development server server

```bash
  npm run dev
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Architecture

![DomainDrivenHexagon](https://user-images.githubusercontent.com/47676714/203443821-46a0ab5e-3031-4e56-9f18-9d5d771fd986.png)


We use a hexagonal architecture, for each entity/module of business we have three modules/folders:

* Domain
  - `domain` can only import files from the same folder
* Application
  - `application` can only import from `application` and `domain`
* Infrastructure
  - `infrastructure` can import from `application`, `domain` and `infrastructure`

### Domain layer

En esta capa junto a la de application definimos el negocio:

* #### model: Tienes las entidades del negocio. Por ejemplo:
Product, Category, User, etc.
* #### exception: Son las excepciones/errores de negocio. Por ejemplo:
InvalidEmailException (email invalido), InvalidCategoryTitleException (titulo de categoria invalida), etc.

### Application layer

* #### repository:  Es el encargado de definir el contrato para consultar la base de datos
*  #### adapter: Es parecido al repository pero el adapter define el contrato para consultar api de terceros
* #### service: El servicio es donde se implementa todo la logica del negocio, utilizando un repository (el de su entidad), otros servicios y 1 o mas adapter/s.
* #### dto: Data Transfer Object, son los modelos que normalmente recibe y devuelve el servicio
* #### exception: Son las excepciones/errores de la aplicación
 
### Infrastructure layer
* #### controller: Recibe la peticion y llama al servicio correspondiente para esa peticion
* #### data source: Tiene acceso a la base de datos y hace la implementacion del contrato del repository
* #### adapter: Accede a apis de terceros y hace la implmentacion del contrato de adapter


## Subir cambios

Para poder subir cambios al repositorio es necesario utilizar los siguientes comandos.


```bash
git checkout -b [flag]/your_branch
git add .
git commit -m "[flag]: Descripcion simple de que es lo que hace el commit"
git push origin "[flag]/your_branch"
```

* Luego crear un PR apuntando a main, checkear que las gh action esten corriendo y que tienen un approve.


```
## Como hacer un buen commit

Cada cada commit deberá de llevar alguna bandersa que distinga lo que se realizo en el commit. Debe utilizarse las siguientes banderas. 
Es recomendado utilizar un icono como referencia visual de la bandera que se esa utilizando. 
  Ejemplo de banderas (*flags*).
  - `f.-`  **feat**: Ha añadido una nueva freature (modulo, o la salida completa de una característica) 
  - `F.-`  **fix**: Ha realizado un cambio que repará un Bug
  - `d.-`  **docs**: Ha realizado cambios en la 
  - `s.-`  **style**: Ha realizado cambios que representen estilos 
  - `r.-`  **refactor**:Ha realizado cambios de codigo que no corrigieron ningún Bug o añadieron una feature
  - `t.-`  **test**:  Todo a aquel cambio que sea modo de prueba
  - `c.-`  **chore**: Ha actualizado un tarea contruida previamneto, configuracion en el package manager, etc.

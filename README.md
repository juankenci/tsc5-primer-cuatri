##  Bienvenidos al Proyecto de mapeo de la Economía Popular de la materia TSC V!    ##

 
## Introducción:
El mapa de la economía popular tiene como objetivo general dar cuenta de unidades 
productivas populares que van desde empresas recuperadas, emprendimientos 
familiares y comunitarios, ferias y mercados populares, medios de comunicación 
comunitarios, comedores, merenderos y ollas hasta clubes o espacios culturales, 
educativos donde se construyen y reconstruyen lazos sociales y donde se realizan 
trabajados tan disímiles como los vinculados a los cuidados o la producción de 
manufacturas. 
Este proyecto comenzó a desarrollarse tecnológicamente a mediados del año 2020. Se pasó por distintas etapas/propuestas de desarrollo hasta que se definió realizar un Formulario de carga (Frontend), una base de datos postgres con una Api y los respectivos Endpoints para ser cargada (Backend) y un servidor de Georeferenciación (Geonode).
De esta forma se pretende tener un formulario al que se pueda acceder vía navegador y puedan cargarse nuevos nodos que seran visualizados en el mapa de Geonode.

## Como iniciar el proyecto

## Instalar Docker y Docker compose

### Linux 

Docker:
- Ubuntu  ->  [enlace](https://docs.docker.com/engine/install/ubuntu/) 
- Debian  ->  [enlace](https://docs.docker.com/engine/install/debian/)
- CentOs  ->  [enlace](https://docs.docker.com/engine/install/centos/)
- Otras distribuciones -> [enlace](https://docs.docker.com/engine/install/)

Docker-compose:

- Cualquier distribucion -> [enlace](https://docs.docker.com/compose/install/)
- Metodo alternativo (español) -> [enlace](https://www.digitalocean.com/community/tutorials/como-instalar-docker-compose-en-ubuntu-18-04-es)

### Windows:

Instalar [Docker-Desktop](https://www.docker.com/products/docker-desktop) . El paquete de instalacion incluye docker y docker-compose.

## Contenedores 

### Crear imagenes
>```sh
>$ docker-compose build
>```

### listar imagenes
>```sh
>$ docker images
>```

### Iniciar contenedores
>```sh
>$ docker-compose up
>```

### listar contenedores
>```sh
>$ docker ps
>```

### Detener contenedores
>```sh
>$ docker-compose stop
>```

### Eliminar contenedores
>```sh
>$ docker-compose down
>```

## Como acceder a los servicios

Frontend : http://localhost:3000

Backend: http://localhost:5000

Base de datos: 

            Host : localhost
            Port : 5432
            Database : db_tsc5
Los demas parametros de configuracion se encuentran en el .env de /backend




##  Buena cursada para todos! ##

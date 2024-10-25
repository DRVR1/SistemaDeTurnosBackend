# Sistema de turnos medicos

## Descripcion

Sistema de turnos medicos que permite registrarse, iniciar sesion, seleccionar una especialidad medica, reservar un turno y visualizarlos o cancelarlos. Los medicos pueden dar de alta turnos para indicar disponibilidad los cuales seran reservados por los pacientes.

## Correr el proyecto usando docker

### Requerimientos:
   - Docker instalado
   - Proyecto clonado

### Construir la imagen del backend

Posicionarse en la carpeta del proyecto clonado y ejecutar los siguientes comandos:


`docker build -t turnosbackend .` (construye la imagen del backend)

### Una vez se hayan creado las imagenes, en la carpeta raiz del proyecto ejecutar:
  
`docker-compose up -d` (descarga la base de datos, configura las variables de entorno, usuario, contraseña, puertos y ejecuta el back y la base de datos)

### Listo
#### Ya deberia estar funcionando el sistema en localhost:8080 y en la red lan. 192.168.X.X:8080. Tambien se puede acceder a la base de datos por separado usando algun administrador como adminer. Las credenciales, puerto y host estan en docker-compose.yml

### Comandos utiles (no obligatorios): 

`docker ps # mostrar los contenedores que estan corriendo`

`docker stop [nombre del proceso] # detener un contenedor`

## Postman para probar los endpoints
En la carpeta postman hay un json que se puede importar a la aplicacion postman para probar los endpoints. Tiene datos preconfigurados.

## Crear un proyecto java springboot

- (Opcional) Instalar IDE intellij idea

- Instalar JDK https://bell-sw.com/pages/downloads/#jdk-21-lts

- Generar un proyecto springboot en https://start.spring.io/ compatible con la version de JDK descargada
Al proyecto añadirle las siguientes dependencias
{lombok, Thymeleaf, devtools, Spring Web, Spring Boot DevTools}

## Abrir el proyecto desde un ide

- El proyecto se puede abrir desde el intellij idea.

- Para abrir el sistema de turnos, clonar el git y abrirlo desde algun IDE


### Info del Setup:

- Lenguaje: java
- Gestion de proyecto: maven
- Framework: Springboot
- Packaging: jar
- Version de Java (jdk): 21
- Base de datos: postgresql
- Mapeo objeto relacional: hibernate
- Servidor: Apache Tomcat

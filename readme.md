# Sistema de turnos medicos

## Descripcion

Sistema de turnos medicos que permite registrarse, iniciar sesion, seleccionar una especialidad medica, reservar un turno y visualizarlos o cancelarlos. Los medicos pueden dar de alta turnos para indicar disponibilidad los cuales seran reservados por los pacientes.

## Correr el proyecto usando docker

### Requerimientos:
   - Docker instalado
   - Proyecto clonado
   - abrir un cmd y posicionarse en la carpeta raiz del proyecto clonado
   - ejecutar los siguientes comandos

### Construir la imagen del backend

`docker build -t turnosbackend .`

### Una vez se hayan creado las imagenes, en la carpeta raiz del proyecto ejecutar:
  
`docker-compose up -d`

### Cuando la base de datos este corriendo ejecutar:

`sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "CREATE DATABASE turnos;"`

### Ya deberia estar funcionando el sistema en localhost:8080 y en la red lan. 192.168.X.X:8080

### Comandos utiles (no obligatorios): 

`docker ps # mostrar los contenedores que estan corriendo`

`docker stop [nombre del proceso] # detener un contenedor`

# Correr el proyecto manualmente sin docker

## Primer arranque de SQL server

- instalar servidor SQL2022-SSEI-Expr.
- instalar administrador de servidores SSMS.
- el servicio SQLEXPRESS debe estar corriendo (ver desde sql configuration manager o windows services).
- iniciar sesion en SSMS con windows autentication DESKTOP-#######\SQLEXPRESS encryption mandatory, trust server certificate.
- 
## Setup Base de Datos (Microsoft SSMS)

1. Abrir SQL Server Management Studio (SSMS).
2. Crear la base de datos llamada "turnos"
3. Ya deberia aparecer la base de datos "turnos"

## Configurar el login externo (desde java por ejemplo)

Crear usuario (SSMS):
- crear un usuario y contraseña en security/Logins
- seleccionar la opcion SQL server autentication e ingresar las credenciales
- luego de ser creado, darle el rol de public y sysadmin (en server roles)

Habilitar logins (SSMS):
- click derecho en root / propiedades (server properties) / security / check sql server and windows auth mode

Configurar servidor (SSCM):
en sql server configuration manager
-  SQL Server Services /  SQLEXPRESS debe estar corriendo
-  sql server network configuration / protocols for sqlexpress / TCP/IP activado
-  en propiedades de TCP/IP configurar puerto (asignar puerto 1433 a IPAII)
-  reiniciar el servicio o la PC

### Importante: 

- Todos los datos configurados deben coincidir con el archivo src/main/resources/application.properties
- Cualquier cambio se va a reflejar al reiniciar el servicio

## Opcional
En la carpeta postman hay un json que se puede importar a la aplicacion postman para probar los endpoints.

## Crear un proyecto java springboot

- (Opcional) Instalar IDE intellij idea

- Instalar JDK https://bell-sw.com/pages/downloads/#jdk-21-lts

- Generar un proyecto springboot en https://start.spring.io/ compatible con la version de JDK descargada
Al proyecto añadirle las siguientes dependencias
{lombok, Thymeleaf, devtools, Spring Web, Spring Boot DevTools}

## Abrir el proyecto desde un ide

- El proyecto se puede abrir desde el intellij idea.

- Para abrir el sistema de turnos, clonar el git y abrirlo desde algun IDE



### Versiones setup:

- Lenguaje: java
- Proyecto: gradle
- Springboot: 3.3.3
- Packaging: jar
- Version de Java (jdk): 21

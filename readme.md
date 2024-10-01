# Sistema de turnos backend

## Descripcion

Es el backend de un sistema de turnos medicos. El paciente puede visualizar turnos disponibles y reservarlos. El medico puede cargar los turnos en los que quiere trabajar.

## Setup Base de Datos (Microsoft SSMS)

El script SQL para crear la base de datos se encuentra en `db/schema.sql`. Para ejecutar el script, seguir estos pasos:

1. Abrir SQL Server Management Studio (SSMS).
2. Cargar el script: `db/schema.sql` (ctrl + o) para abrir archivos en ssms
3. Ejecutar el script
4. Ya deberia aparecer la base de datos "turnos" con sus tablas y SP

## Setup java con springboot

- Instalar JDK https://bell-sw.com/pages/downloads/#jdk-21-lts

- Generar un proyecto springboot en https://start.spring.io/ compatible con la version de JDK descargada
Al proyecto añadirle las siguientes dependencias
{lombok, Thymeleaf, devtools, Spring Web, Spring Boot DevTools}

- El proyecto se puede abrir desde el intellij idea.

- Para abrir el sistema de turnos, clonar el git y abrirlo desde algun IDE
   
### Versiones setup:

- Lenguaje: java
- Proyecto: gradle
- Springboot: 3.3.3
- Packaging: jar
- Version de Java (jdk): 21

powershell -Command "docker ps"

powershell -Command "docker stop turnosbackend"
powershell -Command "docker stop sistemadeturnosbackend-sql-server-1"

powershell -Command "docker rm sistemadeturnosbackend-app-1"
powershell -Command "docker rm sistemadeturnosbackend-sql-server-1"

powershell -Command "docker images"

powershell -Command "docker rmi turnosbackend"








powershell -Command "docker build -t requerimientosbackend ."

powershell -Command "docker-compose up -d"

echo =======^
=======^
Primera ejecucion? cuando la base de datos se este ejecutando, presionar enter.^
=======^
=======

pause

sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "CREATE DATABASE turnos;"

powershell -Command "docker stop turnosbackend"
powershell -Command "docker stop sistemadeturnosbackend-sql-server-1"

powershell -Command "docker-compose up -d"


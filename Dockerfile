# Etapa de construcción
FROM eclipse-temurin:21 as build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo gradlew y gradle.properties primero para aprovechar la caché de Docker
COPY gradlew gradlew
COPY gradle gradle
RUN chmod +x gradlew

# Copia el código fuente
COPY . .

# Compila el proyecto
RUN ./gradlew clean build -x test

# Etapa de ejecución
FROM eclipse-temurin:21
WORKDIR /app
COPY --from=build /app/build/libs/*.jar /app/app.jar
EXPOSE 80
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

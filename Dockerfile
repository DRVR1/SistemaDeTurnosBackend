#
# Build stage
#
FROM eclipse-temurin:22-jdk-jammy AS build
WORKDIR /app
RUN apt-get update && apt-get install -y dos2unix
COPY . .
RUN chmod +x mvnw
RUN dos2unix mvnw
RUN ls
RUN ./mvnw dependency:go-offline
RUN ./mvnw clean package -DskipTests
#
# Package stage
#
FROM eclipse-temurin:22-jre-jammy 
WORKDIR /app
COPY --from=build /app/target/*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

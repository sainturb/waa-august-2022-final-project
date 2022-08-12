# STAGE ONE - BUILD PACKAGE
# FROM maven:3.6.0-jdk-11-slim AS MAVEN_BUILD
# COPY ./ ./
# # RUN mvn install
# RUN mvn clean package

# STAGE TWO - MOUNT JAR
FROM openjdk:17.0.1-jdk-slim
EXPOSE 8080
# COPY --from=MAVEN_BUILD /target/alumni-0.0.1-SNAPSHOT.jar /app.jar
COPY /target/alumni-0.0.1-SNAPSHOT.jar /app.jar
CMD ["java", "-jar", "/app.jar"]
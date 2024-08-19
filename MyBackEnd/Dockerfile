# Use the official Maven image to build the application
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory
WORKDIR /MyBackEnd
# Copy the source code
COPY . ./app


# Build the application
RUN mvn clean package -DskipTests

# Use the official OpenJDK runtime image for the final image
FROM openjdk:17-jdk-slim

# Copy the jar file from the build stage
COPY --from=build /target/MyBackEnd-0.0.1-SNAPSHOT.jar MyBackEnd.jar

# Expose the port on which the application will run
EXPOSE 9090

# Run the application
ENTRYPOINT ["java", "-jar", "MyBackEnd.jar"]

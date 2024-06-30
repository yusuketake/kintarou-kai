FROM --platform=linux/amd64 maven:3.6.3-openjdk-17-slim as build
WORKDIR /
RUN apt-get update && apt-get -y install git
RUN git clone -b feature/render-deploy https://github.com/yusuketake/kintarou-kai.git
WORKDIR /kintarou-kai/backend
RUN mvn clean package -DskipTests

FROM --platform=linux/amd64 amazoncorretto:17.0.9
COPY --from=build /kintarou-kai/backend/target/backend-0.0.1-SNAPSHOT.jar ./
CMD ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]
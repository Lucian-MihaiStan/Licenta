#FROM fundingsocietiesdocker/openjdk19-alpine
#WORKDIR .
#USER root
#COPY .mvn/ .mvn
#COPY mvnw pom.xml ./
#COPY src ./src
#RUN sed -i 's/\r$//' mvnw
#RUN chmod +x ./mvnw && ./mvnw clean install package

FROM fundingsocietiesdocker/openjdk19-alpine
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} application.jar
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "application.jar"]
enablePlugins(JavaAppPackaging)
enablePlugins(DockerPlugin)
dockerExposedPorts := Seq(3000)
dockerBaseImage := "adoptopenjdk:11.0.7_10-jre-hotspot"

lazy val root = project
  .in(file("."))
  .settings(
    name := "bro-backend",
    version := "0.1",
    scalaVersion := "2.13.11",
    libraryDependencies ++= Seq(
      "dev.zio" %% "zio" % "2.0.15",
      // http
      "dev.zio" %% "zio-http" % "3.0.0-RC2",
      // jwt
      "com.github.jwt-scala" %% "jwt-zio-json" % "9.3.0",
      // config
      "dev.zio" %% "zio-config"          % "4.0.0-RC16",
      "dev.zio" %% "zio-config-typesafe" % "4.0.0-RC16",
      "dev.zio" %% "zio-config-magnolia" % "4.0.0-RC16",
      // mongodb
      "org.mongodb.scala" %% "mongo-scala-driver" % "4.8.0",
      // json
      "dev.zio"  %% "zio-json"     % "0.5.0",
      "org.slf4j" % "slf4j-api"    % "1.7.5",
      "org.slf4j" % "slf4j-simple" % "1.7.5"
    )
  )

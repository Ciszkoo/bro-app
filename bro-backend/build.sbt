val scala3Version = "3.3.0"

enablePlugins(JavaAppPackaging)
enablePlugins(DockerPlugin)
dockerExposedPorts := Seq(3000)
dockerBaseImage := "adoptopenjdk:11.0.7_10-jre-hotspot"

lazy val root = project
  .in(file("."))
  .settings(
    name := "bro-backend",
    version := "0.1",
    scalaVersion := scala3Version,
    libraryDependencies ++= Seq("dev.zio" %% "zio-http" % "3.0.0-RC2")
  )

package ciszko.routes

import zio._
import zio.http._
import ciszko.Mongo._
import org.mongodb.scala._

object PublicRoutes {

  val app = Http.collectZIO[Request] { case Method.GET -> Root / "posts" / int(page) =>
    for {
      documents <- ZIO.fromFuture(_ =>
        collection
          .find(Document("status" -> "approved"))
          .sort(Document("createdAt" -> -1))
          .skip(0 + (page - 1) * 10)
          .limit(10)
          .toFuture()
      )
      response <- ZIO.succeed(Response.json(documents.map(_.toJson()).mkString("[", ",", "]")))
    } yield response
  } @@ RequestHandlerMiddlewares.debug

}

package ciszko.routes

import zio._
import zio.http._
import ciszko.Mongo._
import org.mongodb.scala._
import org.mongodb.scala.bson.ObjectId
import zio.http.HttpAppMiddleware.bearerAuth
import ciszko.AuthService.jwtVerifyAndProtect

object AdminOnlyRoutes {

  val app = Http.collectZIO[Request] {

    case Method.PATCH -> Root / "posts" / id => for {
        dbResponse <- ZIO.fromFuture(_ =>
          collection
            .updateOne(
              Document("_id" -> new ObjectId(id), "status" -> "pending"),
              Document("$set" -> Document("status" -> "approved"))
            )
            .toFuture()
        )
      } yield if (dbResponse.getModifiedCount() > 0) Response.ok else Response.text("Already approved")

    case Method.DELETE -> Root / "posts" / id => for {
        dbResponse <- ZIO.fromFuture(_ => collection.deleteOne(Document("_id" -> new ObjectId(id))).toFuture())
      } yield if (dbResponse.getDeletedCount() > 0) Response.ok else Response.text("Already deleted")

  } @@ (bearerAuth(jwtVerifyAndProtect(_, "admin-user")) ++ RequestHandlerMiddlewares.debug)
}

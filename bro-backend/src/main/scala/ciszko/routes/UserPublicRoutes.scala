package ciszko.routes

import zio._
import zio.Console._
import zio.http._
import zio.json._
import zio.http.HttpAppMiddleware.bearerAuth
import ciszko.AuthService.jwtVerifyAndProtect
import ciszko.PartialPost
import ciszko.Mongo._
import org.mongodb.scala._

object UserPublicRoutes {

  val app = Http.collectZIO[Request] { 
    
    case request @ Method.POST -> Root / "posts" => for {
        body        <- request.body.asString
        partialPost <- ZIO.fromEither(body.fromJson[PartialPost])
        post        <- ZIO.succeed(partialPost.toPost)
        _           <- ZIO.fromFuture(_ => collection.insertOne(Document(post.toJson)).toFuture())
     } yield Response.ok

    case Method.GET -> Root / "posts" / "pending" / int(page) => for {
      documents <- ZIO.fromFuture(_ =>
        collection
          .find(Document("status" -> "pending"))
          .sort(Document("createdAt" -> -1))
          .skip(0 + (page - 1) * 10)
          .limit(10)
          .toFuture()
      )
    } yield Response.json(documents.map(_.toJson()).mkString("[", ",", "]"))

  } @@ (bearerAuth(jwtVerifyAndProtect(_)) ++ RequestHandlerMiddlewares.debug)

}

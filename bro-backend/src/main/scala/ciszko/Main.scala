package ciszko

import zio._
import zio.http._
import zio.http.HttpAppMiddleware.cors
import zio.http.internal.middlewares.Cors.CorsConfig
import zio.http.Header.{ AccessControlAllowMethods, AccessControlAllowOrigin, Origin }
import ciszko.routes.{ AdminOnlyRoutes, PublicRoutes, UserPublicRoutes }

object Bro extends ZIOAppDefault {

  // CORS configuration
  val config: CorsConfig = CorsConfig(
    allowedOrigin = {
      case origin @ Origin.Value(_, host, _) if host == "localhost" =>
        Some(AccessControlAllowOrigin.Specific(origin))
      case _ => None
    },
    allowedMethods = AccessControlAllowMethods(Method.GET, Method.POST, Method.PATCH, Method.DELETE)
  )

  val fullApp =
    PublicRoutes.app.withDefaultErrorResponse ++ UserPublicRoutes.app.withDefaultErrorResponse ++ AdminOnlyRoutes.app.withDefaultErrorResponse

  // Run
  override def run =
    Server.serve(fullApp @@ cors(config)).provide(Server.defaultWithPort(3000))
}

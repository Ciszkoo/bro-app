import zio._
import zio.http._
import zio.http.HttpAppMiddleware.{ bearerAuth, cors }
import zio.http.internal.middlewares.Cors.CorsConfig
import zio.http.Header.{ AccessControlAllowMethods, AccessControlAllowOrigin, Origin }
import zio.http.ChannelEvent.Read

object Bro extends ZIOAppDefault {
  import AuthService._

  // CORS configuration
  val config: CorsConfig = CorsConfig(
    allowedOrigin = {
      case origin @ Origin.Value(_, host, _) if host == "localhost" =>
        Some(AccessControlAllowOrigin.Specific(origin))
      case _ => None
    },
    allowedMethods = AccessControlAllowMethods(Method.GET)
  )

  // WebSocket handler
  val socketApp = Handler.webSocket { channel =>
    channel.receiveAll {
      case Read(WebSocketFrame.Text("foo")) => channel.send(Read(WebSocketFrame.text("bar")))
      case _: WebSocketChannelEvent         => ZIO.unit
    }
  }

  // HTTP routes
  val app = Http.collectZIO[Request] {
    case Method.GET -> Root / "hello"   => ZIO.succeed(Response.text("Hello World!"))
    case Method.GET -> Root / "channel" => socketApp.toResponse
  } @@ (bearerAuth(jwtVerifyAndProtect(_)) ++ RequestHandlerMiddlewares.debug)

  // Run
  override def run = Server.serve(app.withDefaultErrorResponse @@ cors(config)).provide(Server.defaultWithPort(3000))
}

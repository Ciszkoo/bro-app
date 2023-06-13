import zio._
import zio.http._

object Bro extends ZIOAppDefault {

  // HTTP routes
  val app: HttpApp[Any, Nothing] = Http.collect[Request] { case Method.GET -> Root / "hello" =>
    Response.text("Hello World!")
  }

  // Run
  override def run = Server.serve(app).provide(Server.defaultWithPort(3000))
}

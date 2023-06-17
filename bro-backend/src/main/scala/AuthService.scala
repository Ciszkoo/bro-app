import zio.json.JsonDecoder
import zio.json.DeriveJsonDecoder
import pdi.jwt.JwtZIOJson
import pdi.jwt.JwtAlgorithm

object AuthService {

  // yea, it shouldn't be accessible that way
  private val key =
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr7Y1DUXLyaAbEViXNmuCkeemQW7QcQGJs0AgYgERY1oWGRxRUGLinJIQe9HvFjKZBfpwqnG0fUi9lc915OMrRG0Ej4AHnnt09i7PHwNkqxtc0YphWv/eQCjRsdHvTCU4IwHipxt5zpuMC1PYa4Ny3sz3PGqUDcH7D8/dZCONy+5sr/t6VLZmJ4dHaP7SHRffYWgrWqduPWsAXGqou24xyKZ3edL3TUpxiCwGHVftVYGTjfRq9AphsB1lLT8Bm1Cp084J7Rv3SUVE+QKRmgV/tkZIXtIF1T6lpfuVR77Z7XqGK11WXm1JLJxW0NdKGV9rkI5gxnWVqkllxHnnN4WtnQIDAQAB"

  case class BroBackend(roles: List[String])
  case class ResourceAccess(`bro-backend`: BroBackend)
  case class Token(resource_access: ResourceAccess)

  object BroBackend {
    implicit val decoder: JsonDecoder[BroBackend] = DeriveJsonDecoder.gen[BroBackend]
  }
  object ResourceAccess {
    implicit val decoder: JsonDecoder[ResourceAccess] = DeriveJsonDecoder.gen[ResourceAccess]
  }
  object Token {
    implicit val decoder: JsonDecoder[Token] = DeriveJsonDecoder.gen[Token]
  }

  def jwtVerifyAndProtect(token: String, role: String = "normal-user"): Boolean =
    val jwt = JwtZIOJson.decodeJson(token, key, Seq(JwtAlgorithm.RS256)).toOption
    jwt match
      case Some(value) =>
        value.`as`[Token] match
          case Right(value) if value.resource_access.`bro-backend`.roles.contains(role) => true
          case _                                                                        => false
      case None => false
}

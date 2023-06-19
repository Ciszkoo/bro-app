package ciszko

import java.time.LocalDateTime
import zio.json._

case class Post(title: String, content: String, status: String, createdAt: LocalDateTime)

object Post {

  implicit val encoder: JsonEncoder[Post] = DeriveJsonEncoder.gen[Post]
}

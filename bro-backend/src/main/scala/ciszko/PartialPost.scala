package ciszko

import java.time.LocalDateTime
import zio.json._

case class PartialPost(title: String, content: String) {

  def toPost: Post = Post(title, content, status = "pending", LocalDateTime.now())
}

object PartialPost {

  implicit val decoder: JsonDecoder[PartialPost] = DeriveJsonDecoder.gen[PartialPost]
}

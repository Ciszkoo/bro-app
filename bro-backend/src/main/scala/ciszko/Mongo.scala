package ciszko

import org.mongodb.scala._

object Mongo {
  private val mongoClient: MongoClient      = MongoClient("mongodb://localhost:27017")
  private val database: MongoDatabase       = mongoClient.getDatabase("brodb")
  val collection: MongoCollection[Document] = database.getCollection("posts")
}

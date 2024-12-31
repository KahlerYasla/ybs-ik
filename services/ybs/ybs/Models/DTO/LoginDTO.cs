using MongoDB.Bson.Serialization.Attributes;

namespace ybs.Models.DTO
{
    public class LoginDTO
    {
        [BsonElement("_id"), BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]

        public string Id { get; set; }
        [BsonElement("username"), BsonRepresentation(MongoDB.Bson.BsonType.String)]

        public string username { get; set; }
        [BsonElement("password"), BsonRepresentation(MongoDB.Bson.BsonType.String)]

        public string password { get; set; }
    }
}

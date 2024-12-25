using MongoDB.Bson.Serialization.Attributes;

namespace ybs.Models.DTO
{
    public class ReportDTO
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        
        [BsonElement("title"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Title { get; set; }
        
        [BsonElement("content"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Content { get; set; }
    }

    public class ReportUpdateDTO
    {
        public string Title { get; set; }
        public string Content { get; set; }
    }
}

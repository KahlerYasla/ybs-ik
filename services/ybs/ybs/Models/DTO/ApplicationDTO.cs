using MongoDB.Bson.Serialization.Attributes;

namespace ybs.Models.DTO;
public class ApplicationDTO
{
    [BsonId]
    [BsonElement("_applicationId"), BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string ApplicationId { get; set; }
    
    [BsonElement("candidateName"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
    public string CandidateName { get; set; }

    [BsonElement("status"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
    public int Status { get; set; }
}

using MongoDB.Bson.Serialization.Attributes;

namespace ybs.Models.DTO;
public class ApplicationDTO
{
    [BsonId]
    [BsonElement("_id"), BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string ApplicationId { get; set; }
    
    [BsonElement("candidatename"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
    public string CandidateName { get; set; }

    [BsonElement("status"), BsonRepresentation(MongoDB.Bson.BsonType.Int64)]
    public int Status { get; set; }
}

public class ApplicationListDTO
{
    public List<ApplicationDTO> ApplicationList { get; set; }
}

public class ApplicationUpdateDTO
{
    public string CandidateName { get; set; }
    public int Status { get; set; }
}
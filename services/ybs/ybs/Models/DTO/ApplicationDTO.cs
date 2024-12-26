using MongoDB.Bson.Serialization.Attributes;

namespace ybs.Models.DTO;
public class ApplicationDTO
{
    [BsonId]
    [BsonElement("_id"), BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string applicationId { get; set; }
    
    [BsonElement("candidatename"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
    public string candidateName { get; set; }

    [BsonElement("status"), BsonRepresentation(MongoDB.Bson.BsonType.Int64)]
    public int status { get; set; }
}

public class ApplicationListDTO
{
    public List<ApplicationDTO> applicationList { get; set; }
}

public class ApplicationUpdateDTO
{
    public string candidateName { get; set; }
    public int status { get; set; }
}
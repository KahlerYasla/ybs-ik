using MongoDB.Bson.Serialization.Attributes;

namespace ybs.Models.DTO
{
    public class ProposalDTO
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("summary"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string summary { get; set; }

        [BsonElement("details"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string details { get; set; }

    }

    public class ProposalUpdateDTO
    {
        public string summary { get; set; }
        
        public string details { get; set; }
    }
    }

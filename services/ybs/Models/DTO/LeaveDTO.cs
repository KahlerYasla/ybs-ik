using MongoDB.Bson.Serialization.Attributes;

namespace ybs.Models.DTO
{
    public class LeaveDTO
    {
        [BsonElement("_id"), BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]

        public string Id { get; set; }

        [BsonElement("userId"), BsonRepresentation(MongoDB.Bson.BsonType.Int64)]

        public int userId { get; set; }

        [BsonElement("status"), BsonRepresentation(MongoDB.Bson.BsonType.Int64)]

        public int status { get; set; }

        [BsonElement("startDate"), BsonRepresentation(MongoDB.Bson.BsonType.DateTime)]

        public DateTime startDate { get; set; }

        [BsonElement("endDate"), BsonRepresentation(MongoDB.Bson.BsonType.DateTime)]

        public DateTime endDate { get; set; }

    }

    public class LeaveCreateDTO
    {
        public int userId { get; set; }
        public int status { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }


    }


    public class LeaveEntitlementDTO
    {
        [BsonElement("_id"), BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]

        public string Id { get; set; }

        [BsonElement("userId"), BsonRepresentation(MongoDB.Bson.BsonType.Int64)]

        public int userId { get; set; }

        [BsonElement("leaveDays"), BsonRepresentation(MongoDB.Bson.BsonType.Int64)]

        public int leaveDays { get; set; }
    }


    public class LeaveEntitlementCreateDTO
    {
        public int userId { get; set; }
        public int leaveDays { get; set; }

    }
}

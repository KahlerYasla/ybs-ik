using MongoDB.Bson.Serialization.Attributes;

namespace ybs.Models.DTO
{
    public class AuthRequestDTO
    {
        
        public string username { get; set; }
        public string password { get; set; }
    }
}

using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using ybs.Data;
using ybs.Models.DTO;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IMongoCollection<LoginDTO>? _auth;



    public AuthController(IAuthService authService, MongoDbService mongoDbService)
    {
        _authService = authService;
        _auth = mongoDbService.Database?.GetCollection<LoginDTO>("login");
    }


    [HttpPost("login")]
    public IActionResult Login([FromBody] AuthRequestDTO request)
    {
        var user = _auth.Find(x => x.username == request.username && x.password == request.password).FirstOrDefault();

        if (user == null)
        {
            return Unauthorized(new { message = "Kullanıcı adı veya parola yanlış" });
        }

        // Giriş başarılıysa, burada token oluşturulabilir
        return Ok(new { message = "Giriş başarılı" });
    }
}

// Login isteği için model



using Microsoft.AspNetCore.Mvc;
using ybs.Models.DTO;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("check")]
    public async Task<IActionResult> CheckAuth([FromBody] AuthRequestDTO authData)
    {
        var result = await _authService.CheckAuthAsync(authData);                                                        
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AuthRequestDTO credentials)
    {
        var result = await _authService.LoginAsync(credentials);
        return Ok(result);
    }
}

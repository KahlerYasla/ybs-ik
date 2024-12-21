using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/interview")]
public class InterviewController : ControllerBase
{
    private readonly IInterviewService _interviewService;

    public InterviewController(IInterviewService interviewService)
    {
        _interviewService = interviewService;
    }

    [HttpGet("application")]
    public async Task<IActionResult> ListApplications()
    {
        var result = await _interviewService.ListApplicationsAsync();
        return Ok(result);
    }

    [HttpGet("application/{id}")]
    public async Task<IActionResult> GetApplicationById(string id)
    {
        var result = await _interviewService.GetApplicationByIdAsync(id);
        return Ok(result);
    }

    [HttpPut("application/{id}")]
    public async Task<IActionResult> UpdateApplicationById(string id, [FromBody] ApplicationDTO applicationData)
    {
        await _interviewService.UpdateApplicationByIdAsync(id, applicationData);
        return Ok();
    }
}

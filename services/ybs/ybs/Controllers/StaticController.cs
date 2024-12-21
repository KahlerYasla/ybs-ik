using Microsoft.AspNetCore.Mvc;
using ybs.Models.DTO;

[ApiController]
[Route("api/static")]
public class StaticController : ControllerBase
{
    private readonly IStaticService _staticService;

    public StaticController(IStaticService staticService)
    {
        _staticService = staticService;
    }

    [HttpGet("cv/{id}")]
    public async Task<IActionResult> GetCVById(string id)
    {
        var result = await _staticService.GetCVByIdAsync(id);
        return Ok(result);
    }

    [HttpGet("report/{id}")]
    public async Task<IActionResult> GetReportById(string id)
    {
        var result = await _staticService.GetReportByIdAsync(id);
        return Ok(result);
    }

    [HttpPut("report/{id}")]
    public async Task<IActionResult> UpdateReportById(string id, [FromBody] ReportDTO reportData)
    {
        await _staticService.UpdateReportByIdAsync(id, reportData);
        return Ok();
    }

    [HttpGet("proposal/{id}")]
    public async Task<IActionResult> GetProposalById(string id)
    {
        var result = await _staticService.GetProposalByIdAsync(id);
        return Ok(result);
    }

    [HttpPut("proposal/{id}")]
    public async Task<IActionResult> UpdateProposalById(string id, [FromBody] ProposalDTO proposalData)
    {
        await _staticService.UpdateProposalByIdAsync(id, proposalData);
        return Ok();
    }
}

using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using ybs.Data;
using ybs.Models.DTO;

[ApiController]
[Route("api/interview")]
public class InterviewController : ControllerBase
{
    private readonly IInterviewService _interviewService;
    private readonly IMongoCollection<ApplicationDTO>? _application;


    public InterviewController(IInterviewService interviewService, MongoDbService mongoDbService)
    {
        _interviewService = interviewService;
        _application = mongoDbService.Database?.GetCollection<ApplicationDTO>("applications");
    }

    [HttpGet("application")]
    public async Task<ActionResult<List<ApplicationDTO>>> ListApplications()
    {
        var applications = await _application.Find(Builders<ApplicationDTO>.Filter.Empty).ToListAsync();


        return applications;
    }

    [HttpGet("application/{id}")]
    public async Task<ActionResult<ApplicationDTO>> GetApplicationById(string id)
    {
        var filterDefinition = Builders<ApplicationDTO>.Filter.Eq(x => x.ApplicationId, id);
        return await _application.Find(filterDefinition).SingleOrDefaultAsync();

    }

    [HttpPut("application/{id}")]
    public async Task<ActionResult<ApplicationDTO>> UpdateApplicationById(string id, [FromBody] ApplicationUpdateDTO applicationData)
    {
        var filterDefinition = Builders<ApplicationDTO>.Filter.Eq(x => x.ApplicationId, id);
        var updateDefinition = Builders<ApplicationDTO>.Update
       .Set(x => x.CandidateName, applicationData.CandidateName)
       .Set(x => x.Status, applicationData.Status);
        var result = await _application.UpdateOneAsync(filterDefinition, updateDefinition);

        if (result.MatchedCount == 0)
        {
            return NotFound($"Application with ID {id} not found.");
        }

        if (result.ModifiedCount == 0)
        {
            return BadRequest("Update failed. No fields were modified.");
        }
        return Ok("modified");
    }
}

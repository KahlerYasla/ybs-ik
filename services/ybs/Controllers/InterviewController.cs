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
    private readonly IMongoCollection<ApplicationUpdateDTO>? _createApplication;



    public InterviewController(IInterviewService interviewService, MongoDbService mongoDbService)
    {
        _interviewService = interviewService;
        _application = mongoDbService.Database?.GetCollection<ApplicationDTO>("applications");
        _createApplication = mongoDbService.Database?.GetCollection<ApplicationUpdateDTO>("applications");


    }

    [HttpGet("application")]
    public async Task<ActionResult<List<ApplicationDTO>>> ListApplications()
    {
        var applications = await _application.Find(Builders<ApplicationDTO>.Filter.Empty).ToListAsync();


        return applications;
    }

    [HttpPost("application/create")]
    public async Task<ActionResult> CreateApplication([FromBody] ApplicationUpdateDTO applicationData)
    {


        await _createApplication.InsertOneAsync(document: applicationData);


        return Ok("Created");
    }

    [HttpGet("application/{id}")]
    public async Task<ActionResult<ApplicationDTO>> GetApplicationById(string id)
    {
        var filterDefinition = Builders<ApplicationDTO>.Filter.Eq(x => x.applicationId, id);
        return await _application.Find(filterDefinition).SingleOrDefaultAsync();

    }

    [HttpPut("application/{id}")]
    public async Task<ActionResult<ApplicationDTO>> UpdateApplicationById(string id, [FromBody] ApplicationUpdateDTO applicationData)
    {
        var filterDefinition = Builders<ApplicationDTO>.Filter.Eq(x => x.applicationId, id);
        var updateDefinition = Builders<ApplicationDTO>.Update
       .Set(x => x.candidateName, applicationData.candidateName)
       .Set(x => x.status, applicationData.status);
        var result = await _application.UpdateOneAsync(filterDefinition, updateDefinition);

        if (result.MatchedCount == 0)
        {
            
            return NotFound($"Application with ID {id} created.");

        }

        if (result.ModifiedCount == 0)
        {
            return BadRequest("Update failed. No fields were modified.");
        }
        return Ok("modified");
    }
}

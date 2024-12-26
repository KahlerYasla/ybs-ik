using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using ybs.Data;
using ybs.Models.DTO;
using static System.Net.Mime.MediaTypeNames;

[ApiController]
[Route("api/static")]
public class StaticController : ControllerBase
{
    private readonly IStaticService _staticService;
    private readonly IMongoCollection<ReportDTO>? _reports;
    private readonly IMongoCollection<ProposalDTO>? _proposals;
    private readonly IMongoCollection<ReportUpdateDTO>? _createReports;
    private readonly IMongoCollection<ProposalUpdateDTO>? _createProposal;



    public StaticController(IStaticService staticService, MongoDbService mongoDbService)
    {
        _staticService = staticService;
        _reports = mongoDbService.Database?.GetCollection<ReportDTO>("reports");
        _proposals = mongoDbService.Database?.GetCollection<ProposalDTO>("proposals");
        _createReports = mongoDbService.Database?.GetCollection<ReportUpdateDTO>("reports");
        _createProposal = mongoDbService.Database?.GetCollection<ProposalUpdateDTO>("proposals");


    }

    [HttpGet("cv/{id}")]
    public async Task<IActionResult> GetCVById(string id)
    {
        try
        {
            // CV dosyasını al
            var fileData = await _staticService.GetCVByIdAsync(id);

            // Dönen nesneyi ayrıştır
            var fileObject = (dynamic)fileData;
            var fileBytes = (byte[])fileObject.FileContent;
            var fileName = (string)fileObject.FileName;
            var contentType = (string)fileObject.ContentType;

            // PDF dosyasını indirme olarak dön
            return File(fileBytes, contentType, fileName);
        }
        catch (FileNotFoundException ex)
        {
            // Dosya bulunamazsa 404 döndür 
            return NotFound(new { Message = ex.Message });
        }
    }

    [HttpGet("report")]
    public async Task<ActionResult<List<ReportDTO>>> ListReports()
    {
        var reports = await _reports.Find(Builders<ReportDTO>.Filter.Empty).ToListAsync();


        return reports;
    }

    [HttpGet("report/{id}")]
    public async Task<ActionResult<ReportDTO>> GetReportById(string id)
    {
        var filterDefinition = Builders<ReportDTO>.Filter.Eq(x=>x.Id,id);
        return await _reports.Find(filterDefinition).SingleOrDefaultAsync();

    }
    [HttpPost("report/create")]
    public async Task<ActionResult> CreateReport( [FromBody] ReportUpdateDTO reportData)
    {
        

        await _createReports.InsertOneAsync(document:reportData);
   
       
        return Ok("Created");
    }

    [HttpPut("report/{id}")]
    public async Task<ActionResult<ReportDTO>> UpdateReportById(string id, [FromBody] ReportUpdateDTO reportData)
    {   
        var filterDefinition = Builders<ReportDTO>.Filter.Eq(x => x.Id, id);
        var updateDefinition = Builders<ReportDTO>.Update
       .Set(x => x.title, reportData.title)
        .Set(x => x.content, reportData.content);

        var result = await _reports.UpdateOneAsync(filterDefinition, updateDefinition);
        if (result.MatchedCount == 0)
        {
            return NotFound($"report with ID {id} not found.");
        }

        if (result.ModifiedCount == 0)
        {
            return BadRequest("Update failed. No fields were modified.");
        }
        return Ok("modified");
    }


    [HttpGet("proposal")]
    public async Task<ActionResult<List<ProposalDTO>>> ListProposal()
    {
        var proposals = await _proposals.Find(Builders<ProposalDTO>.Filter.Empty).ToListAsync();


        return proposals;
    }

    [HttpPost("proposal/create")]
    public async Task<ActionResult> CreateProposal([FromBody] ProposalUpdateDTO proposalData)
    {


        await _createProposal.InsertOneAsync(document: proposalData);


        return Ok("Created");
    }

    [HttpGet("proposal/{id}")]
    public async Task<ActionResult<ProposalDTO>> GetProposalById(string id)
    {
        var filterDefinition = Builders<ProposalDTO>.Filter.Eq(x => x.Id, id);
        return await _proposals.Find(filterDefinition).SingleOrDefaultAsync();
    }

    [HttpPut("proposal/{id}")]
    public async Task<ActionResult<ProposalDTO>> UpdateProposalById(string id, [FromBody] ProposalUpdateDTO proposalData)
    {
        var filterDefinition = Builders<ProposalDTO>.Filter.Eq(x => x.Id, id);
        var updateDefinition = Builders<ProposalDTO>.Update
       .Set(x => x.summary, proposalData.summary)
        .Set(x => x.details, proposalData.details);

        var result = await _proposals.UpdateOneAsync(filterDefinition, updateDefinition);
        if (result.MatchedCount == 0)
        {
            return NotFound($"proposal with ID {id} not found.");
        }

        if (result.ModifiedCount == 0)
        {
            return BadRequest("Update failed. No fields were modified.");
        }
        return Ok("modified");
    }
}

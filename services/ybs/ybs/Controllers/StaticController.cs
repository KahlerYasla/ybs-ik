﻿using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using ybs.Data;
using ybs.Models.DTO;

[ApiController]
[Route("api/static")]
public class StaticController : ControllerBase
{
    private readonly IStaticService _staticService;
    private readonly IMongoCollection<ReportDTO>? _reports;
    private readonly IMongoCollection<ProposalDTO>? _proposals;

    public StaticController(IStaticService staticService, MongoDbService mongoDbService)
    {
        _staticService = staticService;
        _reports = mongoDbService.Database?.GetCollection<ReportDTO>("reports");
        _proposals = mongoDbService.Database?.GetCollection<ProposalDTO>("proposals");
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


    [HttpGet("report/{id}")]
    public async Task<ActionResult<ReportDTO>> GetReportById(string id)
    {
        var filterDefinition = Builders<ReportDTO>.Filter.Eq(x=>x.Id,id);
        return await _reports.Find(filterDefinition).SingleOrDefaultAsync();

    }

    [HttpPut("report/{id}")]
    public async Task<IActionResult> UpdateReportById(string id, [FromBody] ReportDTO reportData)
    {
       // object reps = await _reports.UpdateReportByIdAsync(id, reportData);
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

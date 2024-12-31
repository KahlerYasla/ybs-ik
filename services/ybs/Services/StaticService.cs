using System.IO;
using Microsoft.AspNetCore.Http.HttpResults;
using ybs.Models.DTO;

public interface IStaticService
{
    Task<object> GetCVByIdAsync(string id);
    Task<object> GetReportByIdAsync(string id);
    Task UpdateReportByIdAsync(string id, ReportDTO reportData);
    Task<object> GetProposalByIdAsync(string id);
    Task UpdateProposalByIdAsync(string id, ProposalDTO proposalData);
}

public class StaticService : IStaticService
{
    private readonly string _cvFolderPath;
    private readonly string _reportFolderPath;

    public StaticService(IWebHostEnvironment environment)
    {
        // CV klasör yolunu belirle
        _cvFolderPath = Path.Combine(environment.WebRootPath, "CV");
        _reportFolderPath = Path.Combine(environment.WebRootPath, "Reports");
    }

    public async Task<object> GetCVByIdAsync(string id)
    {
        // PDF dosyasının tam yolunu oluştur
        var pdfFilePath = Path.Combine(_cvFolderPath, $"{id}.pdf");

        // Dosyanın varlığını kontrol et
        if (!File.Exists(pdfFilePath))
        {
            throw new FileNotFoundException($"CV file with ID {id} not found.");
        }

        // Dosyayı oku ve byte[] olarak döndür
        var fileBytes = await File.ReadAllBytesAsync(pdfFilePath);

        // Dosya içeriğini object olarak döndür
        return new
        {
            FileName = $"{id}.pdf",
            ContentType = "application/pdf",
            FileContent = fileBytes
        };
    }

    public async Task<object> GetReportByIdAsync(string id)
    {
        return new { };
    }

    public Task UpdateReportByIdAsync(string id, ReportDTO reportData)
    {
        // Update report logic here
        return Task.CompletedTask;
    }

    public Task<object> GetProposalByIdAsync(string id)
    {
        // Fetch proposal logic here
        return Task.FromResult(new { ProposalId = id, Details = "Example Proposal" } as object);
    }

    public Task UpdateProposalByIdAsync(string id, ProposalDTO proposalData)
    {
        // Update proposal logic here
        return Task.CompletedTask;
    }
}

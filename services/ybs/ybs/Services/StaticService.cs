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
    public Task<object> GetCVByIdAsync(string id)
    {
        // Fetch CV logic here
        return Task.FromResult(new { CVId = id, Name = "Example CV" } as object);
    }

    public Task<object> GetReportByIdAsync(string id)
    {
        // Fetch report logic here
        return Task.FromResult(new { ReportId = id, Content = "Example Report" } as object);
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

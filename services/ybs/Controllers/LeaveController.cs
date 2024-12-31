using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using ybs.Data;
using ybs.Models.DTO;
using static System.Net.Mime.MediaTypeNames;

namespace ybs.Controllers
{
    public class LeaveController : ControllerBase
    {
        private readonly IMongoCollection<LeaveDTO> _leaves;
        private readonly IMongoCollection<LeaveCreateDTO> _leaveCreate;
        private readonly IMongoCollection<LeaveEntitlementCreateDTO> _leaveEntitlementCreate;
        private readonly IMongoCollection<LeaveEntitlementDTO> _leaveEntitlement;


        public LeaveController(MongoDbService mongoDbService)
        {
            _leaves = mongoDbService.Database.GetCollection<LeaveDTO>("leaves");
            _leaveCreate = mongoDbService.Database.GetCollection<LeaveCreateDTO>("leaves");
            _leaveEntitlement = mongoDbService.Database.GetCollection<LeaveEntitlementDTO>("leaveEntitlement");
            _leaveEntitlementCreate = mongoDbService.Database.GetCollection<LeaveEntitlementCreateDTO>("leaveEntitlement");

        }


        [HttpGet("leave")]
        public async Task<ActionResult<List<LeaveDTO>>> ListLeaves()
        {
            var applications = await _leaves.Find(Builders<LeaveDTO>.Filter.Empty).ToListAsync();


            return applications;
        }

        [HttpGet("leave/{userid}")]
        public async Task<ActionResult<LeaveDTO>> GetLeaveById(int userid)
        {
            var filterDefinition = Builders<LeaveDTO>.Filter.Eq(x => x.userId, userid);
            return await _leaves.Find(filterDefinition).SingleOrDefaultAsync();

        }

        [HttpPost("leave/create")]
        public async Task<ActionResult> CreateLeave([FromBody] LeaveCreateDTO leaveData)
        {


            await _leaveCreate.InsertOneAsync(document: leaveData);


            return Ok("Created");
        }

        [HttpPut("leave/{userid}")]
        public async Task<ActionResult<LeaveCreateDTO>> UpdateLeaveById(int userid, [FromBody] LeaveCreateDTO leaveData)
        {
            var filterDefinition = Builders<LeaveDTO>.Filter.Eq(x => x.userId, userid);
            var updateDefinition = Builders<LeaveDTO>.Update
           .Set(x => x.startDate, leaveData.startDate)
           .Set(x=>x.endDate, leaveData.endDate)
           .Set(x => x.status, leaveData.status);
            var result = await _leaves.UpdateOneAsync(filterDefinition, updateDefinition);

            if (result.MatchedCount == 0)
            {

                return NotFound($"Application for user with ID {userid} created.");

            }

            if (result.ModifiedCount == 0)
            {
                return BadRequest("Update failed. No fields were modified.");
            }
            return Ok("modified");
        }





        [HttpGet("leaveEntitlement")]
        public async Task<ActionResult<List<LeaveEntitlementDTO>>> ListLeaveEntitlement()
        {
            var applications = await _leaveEntitlement.Find(Builders<LeaveEntitlementDTO>.Filter.Empty).ToListAsync();


            return applications;
        }

        [HttpGet("leaveEntitlement/{userid}")]
        public async Task<ActionResult<LeaveEntitlementDTO>> GetLeaveEntitlementById(int userid)
        {
            var filterDefinition = Builders<LeaveEntitlementDTO>.Filter.Eq(x => x.userId, userid);
            return await _leaveEntitlement.Find(filterDefinition).SingleOrDefaultAsync();

        }

        [HttpPost("leaveEntitlement/create")]
        public async Task<ActionResult> CreateLeaveEntitlement([FromBody] LeaveEntitlementCreateDTO leaveData)
        {


            await _leaveEntitlementCreate.InsertOneAsync(document: leaveData);


            return Ok("Created");
        }

        [HttpPut("leaveEntitlement/{userid}")]
        public async Task<ActionResult<LeaveEntitlementCreateDTO>> UpdateLeaveEntitlementById(int userid, [FromBody] LeaveEntitlementCreateDTO leaveData)
        {
            var filterDefinition = Builders<LeaveEntitlementDTO>.Filter.Eq(x => x.userId, userid);
            var updateDefinition = Builders<LeaveEntitlementDTO>.Update
           .Set(x => x.leaveDays, leaveData.leaveDays);
            var result = await _leaveEntitlement.UpdateOneAsync(filterDefinition, updateDefinition);

            if (result.MatchedCount == 0)
            {

                return NotFound($"Application for user with ID {userid} created.");

            }

            if (result.ModifiedCount == 0)
            {
                return BadRequest("Update failed. No fields were modified.");
            }
            return Ok("modified");
        }

    }

}
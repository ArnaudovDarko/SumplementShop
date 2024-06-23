using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SumplemetShop.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        [HttpGet("getbodybuilders")]
        public IActionResult GetBgetbodybuilders()
        {
            return Ok(new JsonResult(new { message = "Only authorize users can view" }));
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using SumplemetShop.Server.Entities;
using SumplemetShop.Server.Helpers;
using SumplemetShop.Server.Services;

namespace SumplemetShop.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProteinsController : ControllerBase
    {
        private IProteinService _proteinService;

        public ProteinsController(IProteinService proteinService)
        {
            _proteinService = proteinService;
        }

        [HttpGet("getallproteins")]
        public IActionResult GetAllProteins()
        {
            var proteins = _proteinService.GetAllProteins();

            if (proteins != null) 
            {
               return Ok(proteins);
            }

            return Ok(null);
        }


        [HttpGet("getproductsondiscount")]
        public IActionResult getproductsondiscount()
        {
            var proteins = _proteinService.GetDiscountProducts();

            if (proteins != null)
            {
                return Ok(proteins);
            }

            return Ok(null);
        }

        [HttpPost("addprotein")]
        public IActionResult AddProtein(WheyProteins newprotein)
        {
             _proteinService.AddProtein(newprotein);

            return Ok(null);
        }

    }
}

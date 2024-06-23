using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SumplemetShop.Server.DTOs.Account;
using SumplemetShop.Server.Entities;
using SumplemetShop.Server.Services;
using System.Security.Claims;

namespace SumplemetShop.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly JWTService _jWTService;
        private readonly SignInManager<Users> _signInManager;
        private readonly UserManager<Users> _userManager;

        public AccountController(JWTService jWTService, SignInManager<Users> signInManager, UserManager<Users> userManager)
        {
            _jWTService = jWTService;
            _signInManager = signInManager;
            _userManager = userManager;
        }
        [Authorize]
        [HttpGet("refresh-user-token")]
        public async Task<ActionResult<UserDto>> RefreshUserToken()
        {
            var user = await _userManager.FindByNameAsync(User.FindFirst(ClaimTypes.Email)?.Value);
            return CreateApplicationUserDto(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null) return Unauthorized("Invalid username or password");

            if (user.EmailConfirmed == false) return Unauthorized("Please confirm your email");

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded) return Unauthorized("Invalid username or password");

            return CreateApplicationUserDto(user);

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register (RegisterDTO model)
        {
            if(await CheckEmailExistsAsync(model.Email))
            {
                return BadRequest($"An existing account is using {model.Email}, email address. Please try with another email address");
            }

            var usertoAdd = new Users
            {
                FirstName = model.FirstName.ToLower(),
                LastName = model.LastName.ToLower(),
                UserName = model.Email.ToLower(),
                Email = model.Email.ToLower(),
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(usertoAdd, model.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok(new JsonResult(new {title = "Account Created", message = "Your account has been created, you can login"}));
        }

        private UserDto CreateApplicationUserDto(Users users)
        {
            return new UserDto
            {
                FirstName = users.FirstName,
                LastName = users.LastName,
                JWT = _jWTService.CreateJWT(users),
            };

        }

        private async Task<bool> CheckEmailExistsAsync(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email.ToLower());
        }
    }
}

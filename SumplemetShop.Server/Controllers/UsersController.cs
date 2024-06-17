using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SumplemetShop.Server.Entities;
using SumplemetShop.Server.Helpers;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace SumplemetShop.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly  DataContext _dataContext;
        public UsersController(DataContext appDbContext)
        {
            _dataContext = appDbContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Users userObj) 
        {
            if (userObj == null)
                return BadRequest();
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.Username == userObj.Username);
            if (user == null)
                return NotFound(new {Message = "User not found"});

            if(!PasswordHasher.VerifyPassword(userObj.Password, user.Password)) 
            {
                return BadRequest(new {Message = "Password is incorrect"});
            }

            user.Token = CreateJwtToken(user);

            return Ok(new
            {
                Token = user.Token,
                Message = "Login Success"
            });
        }

        [HttpPost("register")] 
        public async Task<IActionResult> RegisterUser([FromBody] Users userObj) 
        {
            if (userObj == null)
                return BadRequest();

            var pass = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
                return BadRequest(
                new
                {
                    Message = pass
                });

            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Role = "User";
            userObj.Token = "";
            await _dataContext.Users.AddAsync(userObj);
            await _dataContext.SaveChangesAsync();
            return Ok(
                new
                {
                    Message = "User Registered!"
                });
        }

        private string CheckPasswordStrength(string password) 
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 9)
                sb.Append("Minimum password length should be 8" + Environment.NewLine);
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") && Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password should be AlphaNumeric" + Environment.NewLine);
            if (!Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
                sb.Append("Password should contain special charcter" + Environment.NewLine);
            return sb.ToString();
        }

        private string CreateJwtToken(Users user) 
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret.....");
            var Identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name,$"{user.FirstName} {user.LastName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = Identity,
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }

}

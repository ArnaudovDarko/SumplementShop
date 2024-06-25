using Mailjet.Client.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SumplemetShop.Server.DTOs.Account;
using SumplemetShop.Server.Entities;
using SumplemetShop.Server.Services;
using System.Security.Claims;
using System.Text;

namespace SumplemetShop.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly JWTService _jWTService;
        private readonly SignInManager<Users> _signInManager;
        private readonly UserManager<Users> _userManager;
        private readonly EmailService _EmailService;
        private readonly IConfiguration _config;

        public AccountController(JWTService jWTService, SignInManager<Users> signInManager, UserManager<Users> userManager, EmailService emailService, IConfiguration config)
        {
            _jWTService = jWTService;
            _signInManager = signInManager;
            _userManager = userManager;
            _EmailService = emailService;
            _config = config;
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
        public async Task<IActionResult> Register(RegisterDTO model)
         {
            if (await CheckEmailExistsAsync(model.Email))
            {
                return BadRequest($"An existing account is using {model.Email}, email address. Please try with another email address");
            }

            var usertoAdd = new Users
            {
                FirstName = model.FirstName.ToLower(),
                LastName = model.LastName.ToLower(),
                UserName = model.Email.ToLower(),
                Email = model.Email.ToLower(),
            };

            var result = await _userManager.CreateAsync(usertoAdd, model.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);


            try
            {
                if (await sendConfirmEmailAsync(usertoAdd))
                {
                    return Ok(new JsonResult(new { title = "Account Created", message = "Your account has been created, please confirm your email address" }));
                }

                return BadRequest("Failed to send email. Please contact admin");
            }


            catch (Exception ex) {
                return BadRequest("Failed to send email. Please contact admin");
            }

        }


        [HttpPut("confirmemail")]
        public async Task<IActionResult> ConfirmEmail(ConfirmEmailDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return Unauthorized("This email address has not been registered yet");

            if (user.EmailConfirmed == true) return BadRequest("Your email was confirmed before. Please login to your account");

            try
            {
                var decodedTokenBytes = WebEncoders.Base64UrlDecode(model.Token);
                var decoderToken = Encoding.UTF8.GetString(decodedTokenBytes);

                var result = await _userManager.ConfirmEmailAsync(user, decoderToken);
                if (result.Succeeded)
                {

                    return Ok(new JsonResult(new { title = "Email confirmed", message = "Your email address is confirmed. You can login now" }));
                }

                return BadRequest("Invalid token. Please try again");
            }
            catch
            {
                return BadRequest("Invalid token. Please try again");
            }

        }


        [HttpPost("resendemail/{email}")]
        public async Task<IActionResult> ResendEmail(string email)
        {
            if (string.IsNullOrEmpty(email)) return BadRequest("Invalid Email");

            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return Unauthorized("This email address has not been registered yet");
            if (user.EmailConfirmed == true) return BadRequest("Your email address was confirmed before. Please login to your account");

            try
            {
                if (await sendConfirmEmailAsync(user))
                {
                    return Ok(new JsonResult(new { title = "Confirmation link send", message = "Please confirm your email address" }));
                }

                return BadRequest("Failed to send email. Please contact admin");
            }
            catch
            {
                return BadRequest("Failed to send email. Please contact admin");
            }
        }

        [HttpPost("forgotpassword/{email}")]
        public async Task<IActionResult> forgotusernameorpassword(string email)
        {
            if (string.IsNullOrEmpty(email)) return BadRequest("Invalid Email");
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return Unauthorized("This email address has not been registered yet");
            if (user.EmailConfirmed == false) return BadRequest("Please confirm your email address first.");

            try
            {
                if (await SendForgotUsernameOrPasswordEmail(user))
                {
                    return Ok(new JsonResult(new { title = "Forgot username or password email sent", message = "Please check your email" }));
                }

                return BadRequest("Failed to send email. Please contact admin");
            }
            catch(Exception)
            {
                return BadRequest("Failed to send email. Please contact admin");
            }
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

        private async Task<bool> sendConfirmEmailAsync(Users user)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var url = $"{_config["JWT:ClientUrl"]}/{_config["Email:ConfirmEmailPath"]}?token={token}&email={user.Email}";

            var body = $"<p>Hello: {user.FirstName} {user.LastName}</p>" +
                "<p>Please confirm your email address by clicking on the following link.</p>" +
                $"<p><a href=\"{url}\">Click here</a></p>" +
                "<p>Thank you</p>" +
                $"<br>{_config["Email:ApplicationName"]}";

            var emailSend = new EmailSendDto(user.Email, "Confirm your email", body);

            return await _EmailService.SendEmailAsync(emailSend);
        }

        [HttpPut("resetpassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return Unauthorized("This email address has not been registered yet");
            if (user.EmailConfirmed == false) return BadRequest("Please confirm your email frist");

            try
            {
                var decodedTokenBytes = WebEncoders.Base64UrlDecode(model.Token);
                var decoderToken = Encoding.UTF8.GetString(decodedTokenBytes);

                var result = await _userManager.ResetPasswordAsync(user, decoderToken,model.NewPassword);
                if (result.Succeeded)
                {

                    return Ok(new JsonResult(new { title = "Password reset success", message = "Your password has been reset" }));
                }

                return BadRequest("Invalid token. Please try again");
            }
            catch (Exception) 
            {
                return BadRequest("Invalid token. Please try again");

            }
        }


        private async Task<bool> SendForgotUsernameOrPasswordEmail(Users user)
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var url = $"{_config["JWT:ClientUrl"]}/{_config["Email:ResetPasswordPath"]}?token={token}&email={user.Email}";

            var body = $"<p>Hello: {user.FirstName} {user.LastName}</p>" +
                $"<p>Username: {user.UserName}.</p>" +
                "<p>In order to reset your password, please click on the following link.</p>" +
                $"<p><a href=\"{url}\">Click here</a></p>" +
                "<p>Thank you</p>" +
                $"<br>{_config["Email:ApplicationName"]}";


            var emailSend = new EmailSendDto(user.Email, "Forgot username or password", body);

            return await _EmailService.SendEmailAsync(emailSend);
        }
    }
}

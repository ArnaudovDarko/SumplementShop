using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SumplemetShop.Server.Entities;
using SumplemetShop.Server.Helpers;
using SumplemetShop.Server.Services;
using System.Text;

namespace SumplemetShop.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
           
            builder.Services.AddControllers();
            builder.Services.AddScoped<IProteinService, ProteinService>();
            builder.Services.AddDbContext<DataContext>(x => x.UseSqlServer("Server=(localdb)\\ProjectModels;Database=Suplements;Trusted_Connection=True;MultipleActiveResultSets=true"));
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<JWTService>();
            builder.Services.AddIdentityCore<Users>(options =>
            {
                options.Password.RequiredLength = 6;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;

                options.SignIn.RequireConfirmedEmail = true;
            }).AddRoles<IdentityRole>()
            .AddRoleManager<RoleManager<IdentityRole>>()
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<Users>>()
            .AddUserManager<UserManager<Users>>()
            .AddDefaultTokenProviders();

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"])),
                        ValidIssuer = builder.Configuration["JWT:Issuer"],
                        ValidateIssuer = true,
                        ValidateAudience = false
                    };
                });
            var app = builder.Build();

            app.UseCors(x => x
              .AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}

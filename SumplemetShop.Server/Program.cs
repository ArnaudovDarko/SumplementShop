using Microsoft.EntityFrameworkCore;
using SumplemetShop.Server.Helpers;
using SumplemetShop.Server.Services;

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
            builder.Services.AddDbContext<DataContext>(x => x.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=SuplementsDb;Trusted_Connection=True;MultipleActiveResultSets=true"));
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

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

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}

using Microsoft.EntityFrameworkCore;
using SumplemetShop.Server.Entities;

namespace SumplemetShop.Server.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<WheyProteins> Proteins { get; set; }
        public DbSet<ProteinType> proteinTypes { get; set; }
        public DbSet<HomeImages>  HomeImages { get; set; }
     
    }
}

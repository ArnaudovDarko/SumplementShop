using SumplemetShop.Server.Entities;
using SumplemetShop.Server.Helpers;
using SumplemetShop.Server.ViewModels;

namespace SumplemetShop.Server.Services
{
    public interface IProteinService 
    {
        IEnumerable<WheyProteins> GetAllProteins();
        IEnumerable<WheyProteins> GetDiscountProducts();
        IEnumerable<WheyProteins> getProteinsById(int id);
        public void AddProtein(WheyProteins protein);
    }

    public class ProteinService : IProteinService
    {
        private DataContext _context;

        public ProteinService(DataContext context)
        {
            _context = context;
        }

        public void AddProtein(WheyProteins protein)
        {
            var proteinvm = new WheyProteins();

            proteinvm.Flavour = protein.Flavour;
            proteinvm.Name = protein.Name;
            proteinvm.Description = protein.Description;
            proteinvm.Price = protein.Price;
            proteinvm.Amount = protein.Amount;
            proteinvm.Type = protein.Type;
            proteinvm.Available = protein.Available;
            proteinvm.photoUrl = protein.photoUrl;

            _context.Proteins.Add(proteinvm);
            _context.SaveChanges();

        }

        public IEnumerable<WheyProteins> GetAllProteins()
        {
             return from p in _context.Proteins where p.Available == true select p;
        }

        public IEnumerable<WheyProteins> GetDiscountProducts()
        {
            return from p in _context.Proteins where p.OnDiscount == true select p;
        }

        public IEnumerable<WheyProteins> getProteinsById(int id)
        {
            throw new NotImplementedException();
        }
    }
}

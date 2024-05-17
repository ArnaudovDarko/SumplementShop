namespace SumplemetShop.Server.ViewModels
{
    public class ProteinVM
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Flavour { get; set; } = string.Empty;
        public int? Amount { get; set; }
        public bool? Available { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace SumplemetShop.Server.Entities
{
    public class WheyProteins
    {
        [Key]
        public int ProteinId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set;} = string.Empty;
        public decimal Price{ get; set;}
        public string Flavour { get; set; } = string.Empty;
        public int? Amount { get; set;}
        public bool? Available { get; set;}
        public string? photoUrl { get; set; }
        public decimal? DiscountPrice { get; set; }
        public bool? OnDiscount { get; set; }

    }
}

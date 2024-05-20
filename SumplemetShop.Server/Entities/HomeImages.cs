using System.ComponentModel.DataAnnotations;

namespace SumplemetShop.Server.Entities
{
    public class HomeImages
    {
        [Key]
        public int ImageID { get; set; }
        public string ImageName { get; set; }
        public string ImageUrl { get; set; }
    }
}

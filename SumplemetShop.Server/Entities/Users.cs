using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace SumplemetShop.Server.Entities
{
    public class Users : IdentityUser
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}

using DAL.Models.Enum;
using DAL.Models;

namespace BLL.DTOs
{
    public class LoginDto
    {        
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }                
        public required string PhoneNumber { get; set; }        
    }
}

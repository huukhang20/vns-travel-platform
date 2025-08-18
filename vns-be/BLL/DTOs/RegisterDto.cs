namespace BLL.DTOs
{
    public class RegisterDto
    {        
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public required string FullName { get; set; }
        public required string PhoneNumber { get; set; }            
    }
}

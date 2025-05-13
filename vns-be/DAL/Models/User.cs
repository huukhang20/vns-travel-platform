using DAL.Models.Enum;

namespace DAL.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public required string FullName { get; set; }
        public string? AvatarUrl { get; set; }
        public required string PhoneNumber { get; set; }
        public Role Role { get; set; }

    }
}

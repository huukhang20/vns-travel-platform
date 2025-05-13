using DAL.Models.Enum;

namespace DAL.Models
{
    public class Partner
    {
        public Guid PartnerId { get; set; }
        public Guid UserId { get; set; }
        public required string BussinessName { get; set; }
        public required string BussinessCategory { get; set; }
        public required string ContactInfo { get; set; }
        public string? Description { get; set; }
        public bool IsVerified { get; set; }
        public VerificationStatus VerificationStatus { get; set; }
    }
}

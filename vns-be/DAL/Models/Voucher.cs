namespace DAL.Models
{
    public class Voucher
    {
        public Guid VoucherId { get; set; }
        public Guid UserId { get; set; }
        public required string Code { get; set; }
        public decimal? DiscountPercemtage { get; set; }
        public decimal? DiscountAmount { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public int MaxUsage { get; set; }
        public User User { get; set; } = null!;
    }
}

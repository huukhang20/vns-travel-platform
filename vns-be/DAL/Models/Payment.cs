using DAL.Models.Enum;

namespace DAL.Models
{
    public class Payment
    {
        public int PaymentId { get; set; }
        public int BookingId { get; set; }
        public DateTime PartnerTime { get; set; }
        public decimal Amount { get; set; }
        public string? TransactionId { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public Booking Booking { get; set; } = null!;
    }
}

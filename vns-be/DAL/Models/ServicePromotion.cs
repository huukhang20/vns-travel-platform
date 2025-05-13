namespace DAL.Models
{
    public class ServicePromotion
    {
        public int ServicePromotionId { get; set; }
        public int ServiceId { get; set; }
        public Service Service { get; set; } = null!;
        public required decimal Discount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class ServicePromotion
    {
        [Key]
        public Guid ServicePromotionId { get; set; }
        public Guid ServiceId { get; set; }
        public Service Service { get; set; } = null!;
        public required decimal Discount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}

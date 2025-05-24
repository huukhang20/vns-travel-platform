using DAL.Models.Enum;

namespace DAL.Models
{
    public class Service
    {
        public Guid ServiceId { get; set; }
        public Guid PartnerId { get; set; }
        public Guid LocationId { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public int? Availability { get; set; }
        public ServiceType ServiceType { get; set; }
        public required string Location { get; set; }
        public Partner Partner { get; set; } = null!;
        public List<ComboService> ComboServices { get; set; } = new();
        public List<ServicePromotion> ServicePromotions { get; } = new();
        public List<ServiceLocation> ServiceLocations { get; } = new();
    }
}

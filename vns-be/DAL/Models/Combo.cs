namespace DAL.Models
{
    public class Combo
    {
        public int ComboId { get; set; }
        public Guid PartnerId { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public decimal DiscountedPrice { get; set; }
        public int? Availability { get; set; }
        public required string Location { get; set; }
        public List<ComboService> ComboServices { get; } = [];
    }
}

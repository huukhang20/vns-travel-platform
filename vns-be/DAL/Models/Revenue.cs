namespace DAL.Models
{
    public class Revenue
    {
        public int RevenueId { get; set; }
        public Guid PartnerId { get; set; }
        public decimal TotalEarnings { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public DateTime CreatedAt { get; set; }
        public Partner Partner { get; set; } = null!;
    }
}

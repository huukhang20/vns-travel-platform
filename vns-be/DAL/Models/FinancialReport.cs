namespace DAL.Models
{
    public class FinancialReport
    {
        public int FinancialReportId { get; set; }
        public Guid PartnerId { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal NetProfit { get; set; }
        public DateTime ReportDate { get; set; }
        public Partner Partner { get; set; } = null!;
    }
}

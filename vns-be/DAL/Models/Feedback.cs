using DAL.Models.Enum;

namespace DAL.Models
{
    public class Feedback
    {
        public int FeedbackId { get; set; }
        public Guid UserId { get; set; }
        public Guid PartnerId{ get; set; }
        public Rating Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public User User { get; set; } = null!;
        public Partner Partner { get; set; } = null!;
    }
}

namespace DAL.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; }
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public User Sender { get; set; } = null!;
        public User Receiver { get; set; } = null!;
    }
}

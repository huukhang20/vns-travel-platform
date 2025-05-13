namespace DAL.Models
{
    public class PartnerDocument
    {
        public Guid PartnerDocumentId { get; set; }
        public Guid PartnerId { get; set; }
        public string DocumentUrl { get; set; } = string.Empty;
        public string DocumentType { get; set; } = string.Empty;
        public DateTime UploadedAt { get; set; }
        public string UploadedBy { get; set; } = string.Empty;
        public string VerifiedBy { get; set; } = string.Empty;
    }
}

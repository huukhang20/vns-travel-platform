using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class PartnerLocation
    {
        [Key, Column(Order = 0)]
        public Guid PartnerId { get; set; }

        [Key, Column(Order = 1)]
        public Guid LocationId { get; set; }

        public bool IsPrimary { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        [ForeignKey("PartnerId")]
        public virtual Partner Partner { get; set; }

        [ForeignKey("LocationId")]
        public virtual Location Location { get; set; }
    }
}

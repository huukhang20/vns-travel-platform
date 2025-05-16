namespace DAL.Models
{
    public class ComboService
    {
        public Guid ComboId { get; set; }
        public Guid ServiceId { get; set; }
        public Combo Combo { get; set; } = null!;
        public Service Service { get; set; } = null!;
    }
}

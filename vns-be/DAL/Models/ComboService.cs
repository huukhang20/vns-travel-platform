namespace DAL.Models
{
    public class ComboService
    {
        public int ComboId { get; set; }
        public int ServiceId { get; set; }
        public Combo Combo { get; set; } = null!;
        public Service Service { get; set; } = null!;
    }
}

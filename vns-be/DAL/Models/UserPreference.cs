namespace DAL.Models
{
    public class UserPreference
    {
        public Guid UserId { get; set; }
        public string? PreferredLanguage { get; set; }
        public string? PreferredCurrency { get; set; }
        public string? SavedLocations { get; set; }
        public User User { get; set; } = null!;
    }
}

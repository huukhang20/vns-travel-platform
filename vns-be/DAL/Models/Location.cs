namespace DAL.Models
{
    public class Location
    {
        public Guid LocationId { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public List<ServiceLocation> ServiceLocations { get; } = new();
    }
}

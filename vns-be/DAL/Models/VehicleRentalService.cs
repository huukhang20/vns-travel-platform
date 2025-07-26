namespace DAL.Models
{
    public class VehicleRentalService
    {
        public Guid VehicleRentalServiceId { get; set; }
        public Guid Serviceid { get; set; }
        public string RentalType { get; set; } = "With-driver"; //self-drive, with-driver,...
        public string BusinessLicenseNumber { get; set; } = string.Empty;
        public string InsurancePolicyNumber { get; set; } = string.Empty;
        public string OperationHours { get; set; } = "9:00 AM - 6:00 PM"; //Operating hours
        public string PickupLocation { get; set; } = string.Empty;
        public bool DeliveryAvailable { get; set; } = true; //Delivery service availability
        public int MinRentalHours { get; set; } 
        public int MaxRentalHours { get; set; } 
    }
}

using BLL.DTOs;
using DAL.Models;

namespace BLL.Services.Interfaces
{
    public interface IServiceManager
    {
        Task<IEnumerable<Service>> GetAllServices();
        Task<Service> GetServiceById(Guid serviceId);        
        Task<IEnumerable<Service>> GetServicesByLocationId(Guid locationId);
        Task<IEnumerable<Service>> GetServicesByPartnerId(Guid partnerId);
        Task CreateService(ServiceDto serviceDto);
        Task UpdateService(ServiceDto serviceDto);
        Task<bool> DeleteService(Guid serviceId);
    }
}

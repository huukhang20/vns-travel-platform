using AutoMapper;
using BLL.DTOs;
using BLL.Services.Interfaces;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace BLL.Services.Implementations
{
    public class ServiceManager : IServiceManager
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ServiceManager(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task CreateService(ServiceDto serviceDto)
        {
            Service service = _mapper.Map<Service>(serviceDto);
            await _unitOfWork.Service.AddAsync(service);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateService(ServiceDto serviceDto)
        {
            var service = await _unitOfWork.Service.GetAsync(s => s.ServiceId == serviceDto.ServiceId);
            if (service == null)
            {
                throw new KeyNotFoundException("Service not found");
            }
            _mapper.Map(serviceDto, service);
            await _unitOfWork.Service.UpdateAsync(service);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<bool> DeleteService(Guid serviceId)
        {
            var service = await _unitOfWork.Service.GetAsync(s => s.ServiceId == serviceId);
            if (service == null)
            {
                throw new KeyNotFoundException("Service not found");
            }
            await _unitOfWork.Service.RemoveAsync(service);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Service>> GetAllServices()
        {
            var services = await _unitOfWork.Service.GetAllAsync();
            return services;
        }

        public async Task<Service> GetServiceById(Guid serviceId)
        {
            var service = await _unitOfWork.Service.GetAsync(s => s.ServiceId == serviceId);
            if (service == null)
            {
                throw new KeyNotFoundException("Service not found");
            }
            return service;
        }

        public async Task<IEnumerable<Service>> GetServicesByLocationId(Guid locationId)
        {
            var services = await _unitOfWork.Service.GetAllAsync(s => s.LocationId == locationId);
            if (services == null || !services.Any())
            {
                throw new KeyNotFoundException("No services found for the specified location");
            }
            return services;
        }

        public async Task<IEnumerable<Service>> GetServicesByPartnerId(Guid partnerId)
        {
            var services = await _unitOfWork.Service.GetAllAsync(s => s.PartnerId == partnerId);
            if (services == null || !services.Any())
            {
                throw new KeyNotFoundException("No services found for the specified partner");
            }
            return services;
        }
    }
}

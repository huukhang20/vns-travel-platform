using AutoMapper;
using BLL.DTOs;
using DAL.Repositories.Interfaces;

namespace BLL.Services.Implementations
{
    public class ComboServiceService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ComboServiceService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ComboServiceDto>> GetComboServicesByComboIdAsync(Guid comboId)
        {
            var comboServices = await _unitOfWork.ComboService.GetAsync(c => c.ComboId == comboId);
            return _mapper.Map<IEnumerable<ComboServiceDto>>(comboServices);
        }

        //public async Task AddServiceToComboAsync(Guid comboId, Guid serviceId)
        //{
        //    var comboService = new ComboService { ComboId = comboId, ServiceId = serviceId };
        //    await _unitOfWork.ComboServices.AddAsync(comboService);
        //    await _unitOfWork.SaveAsync();
        //}

        //public async Task RemoveServiceFromComboAsync(Guid comboId, Guid serviceId)
        //{
        //    var comboService = await _unitOfWork.ComboServices.GetByIdsAsync(comboId, serviceId);
        //    if (comboService != null)
        //    {
        //        _unitOfWork.ComboServices.Remove(comboService);
        //        await _unitOfWork.SaveAsync();
        //    }
        //}
    }
}

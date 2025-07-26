using DAL.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface ITourService
    {
        Task<ICollection<TourService>> GetAllAsync();
        Task<TourService?> GetByIdAsync(Guid id);
        Task AddAsync(TourService entity);
        Task UpdateAsync(TourService entity);
        Task DeleteAsync(Guid id);
    }
} 
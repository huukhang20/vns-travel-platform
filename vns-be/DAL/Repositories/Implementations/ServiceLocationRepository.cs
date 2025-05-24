using DAL.Context;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories.Implementations
{
    public class ServiceLocationRepository : Repository<ServiceLocation>, IServiceLocationRepository
    {
        public ServiceLocationRepository(AppDbContext context) : base(context)
        {
        }
    }
}

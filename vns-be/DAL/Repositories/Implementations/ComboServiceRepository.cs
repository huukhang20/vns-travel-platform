using DAL.Context;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories.Implementations
{
    public class ComboServiceRepository : Repository<ComboService>, IComboServiceRepository
    {
        public ComboServiceRepository(AppDbContext context) : base(context)
        {
        }
    }
}

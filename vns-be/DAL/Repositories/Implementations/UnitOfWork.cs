using DAL.Context;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories.Implementations
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public IBookingRepository Booking { get; private set; }

        public IComboRepository Combo { get; private set; }

        public IFinancialReportRepository FinancialReport { get; private set; }

        public ILocationRepository Location { get; private set; }

        public IMessageRepository Message { get; private set; }

        public IPartnerDocumentRepository PartnerDocument { get; private set; }

        public IPartnerRepository Partner { get; private set; }

        public IPaymentRepository Payment { get; private set; }

        public IRevenueRepository Revenue { get; private set; }

        public IServicePromotionRepository ServicePromotion { get; private set; }

        public IServiceRepository Service { get; private set; }

        public IUserRepository User { get; private set; }

        public IVoucherRepository Voucher { get; private set; }        

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            Booking = new BookingRepository(_context);
            Combo = new ComboRepository(_context);
            FinancialReport = new FinancialReportRepository(_context);
            Location = new LocationRepository(_context);
            Message = new MessageRepository(_context);
            PartnerDocument = new PartnerDocumentRepository(_context);
            Partner = new PartnerRepository(_context);
            Payment = new PaymentRepository(_context);
            Revenue = new RevenueRepository(_context);
            ServicePromotion = new ServicePromotionRepository(_context);
            Service = new ServiceRepository(_context);
            User = new UserRepository(_context);
            Voucher = new VoucherRepository(_context);
        }        
        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}

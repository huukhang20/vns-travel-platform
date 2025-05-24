namespace DAL.Repositories.Interfaces
{
    public interface IUnitOfWork
    {
        public IBookingRepository Booking { get; }
        public IComboRepository Combo { get; }
        public IComboServiceRepository ComboService { get; }
        public IFeedbackRepository Feedback { get; }
        public IFinancialReportRepository FinancialReport { get; }
        public ILocationRepository Location { get; }
        public IMessageRepository Message { get; }
        public IPartnerDocumentRepository PartnerDocument { get; }
        public IPartnerRepository Partner { get; }
        public IPaymentRepository Payment { get; }
        public IRevenueRepository Revenue { get; }
        public IServiceLocationRepository ServiceLocation { get; }
        public IServicePromotionRepository ServicePromotion { get; }
        public IServiceRepository Service { get; }
        public IUserRepository User { get; }
        public IVoucherRepository Voucher { get; }
        Task SaveChangesAsync();
        void Dispose();       
    }
}

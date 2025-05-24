namespace DAL.Repositories
{
    public interface IUnitOfWork
    {
        IBookingRepository BookingRepository { get; }
        IComboRepository ComboRepository { get; }
        IComboRepository ComboServiceRepository { get; }
        IFeedbackRepository FeedbackRepository { get; }
        IFinancialReportRepository FinancialReportRepository { get; }
        ILocationRepository LocationRepository { get; }
        IMessageRepository MessageRepository { get; }
        IPartnerDocumentRepository PartnerDocumentRepository { get; }
        IPartnerRepository PartnerRepository { get; }
        IPaymentRepository PaymentRepository { get; }
        IRevenueRepository RevenueRepository { get; }
        IServiceLocationRepository ServiceLocationRepository { get; }
        IServicePromotionRepository ServicePromotionRepository { get; }
        IServiceRepository ServiceRepository { get; }
        IUserRepository UserRepository { get; }
        IVoucherRepository VoucherRepository { get; }
        Task<int> SaveChangesAsync();
        void Dispose();
        void Commit();
    }
}

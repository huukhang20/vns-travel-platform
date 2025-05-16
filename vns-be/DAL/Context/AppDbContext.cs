using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Context
{
    public class AppDbContext : DbContext
    {

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Voucher> Vouchers { get; set; }
        public virtual DbSet<Partner> Partners { get; set; }
        public virtual DbSet<PartnerDocument> PartnerDocuments { get; set; }
        public virtual DbSet<Feedback> Feedbacks { get; set; }
        public virtual DbSet<Service> Services { get; set; }
        public virtual DbSet<Booking> Bookings { get; set; }
        public virtual DbSet<Combo> Combos { get; set; }
        public virtual DbSet<ComboService> ComboServices { get; set; }
        public virtual DbSet<ServicePromotion> ServicePromotions { get; set; }
        public virtual DbSet<Revenue> Revenues { get; set; }
        public virtual DbSet<FinancialReport> FinancialReports { get; set; }
        public virtual DbSet<ServiceLocation> ServiceLocations { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<Message> Messages { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {            
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ComboService>(entity => { 
                entity.HasNoKey();
            });

            modelBuilder.Entity<ServiceLocation>(entity => {
                entity.HasNoKey();
            });

            modelBuilder.Entity<ServicePromotion>(entity => {
                entity.HasNoKey();
            });
        }
    }
}

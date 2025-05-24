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

            modelBuilder.Entity<ComboService>()
                .HasKey(cs => new { cs.ComboId, cs.ServiceId });

            modelBuilder.Entity<ComboService>()
                .HasOne(cs => cs.Combo)
                .WithMany(c => c.ComboServices)
                .HasForeignKey(cs => cs.ComboId);

            modelBuilder.Entity<ComboService>()
                .HasOne(cs => cs.Service)
                .WithMany(s => s.ComboServices)
                .HasForeignKey(cs => cs.ServiceId);

            modelBuilder.Entity<ServicePromotion>(entity =>
            {
                entity.HasKey(e => e.ServicePromotionId);
                entity.HasOne(e => e.Service)
                      .WithMany(s => s.ServicePromotions)
                      .HasForeignKey(e => e.ServiceId);
            });



            modelBuilder.Entity<Service>()
    .HasMany(s => s.ServicePromotions)
    .WithOne(sp => sp.Service)
    .HasForeignKey(sp => sp.ServiceId);

            modelBuilder.Entity<ServiceLocation>()
                .HasKey(sl => new { sl.ServiceId, sl.LocationId });

            modelBuilder.Entity<ServiceLocation>()
                .HasOne(sl => sl.Service)
                .WithMany(s => s.ServiceLocations)
                .HasForeignKey(sl => sl.ServiceId);

            modelBuilder.Entity<ServiceLocation>()
                .HasOne(sl => sl.Location)
                .WithMany(l => l.ServiceLocations)
                .HasForeignKey(sl => sl.LocationId);

        }
    }
}

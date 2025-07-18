using DAL.Commons;
using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Context
{
    public class AppDbContext : DbContext
    {
        private readonly DatabaseType _databaseType;

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
        public DbSet<OtpCode> OtpCodes { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options, DatabaseType databaseType = DatabaseType.SqlServer) 
            : base(options)
        {
            _databaseType = databaseType;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships
            modelBuilder.Entity<ComboService>()
                .HasKey(cs => new { cs.ComboId, cs.ServiceId });

            modelBuilder.Entity<ComboService>()
                .HasOne(cs => cs.Combo)
                .WithMany(c => c.ComboServices)
                .HasForeignKey(cs => cs.ComboId)
                .OnDelete(_databaseType == DatabaseType.Sqlite ? DeleteBehavior.Cascade : DeleteBehavior.Restrict);

            modelBuilder.Entity<ComboService>()
                .HasOne(cs => cs.Service)
                .WithMany(s => s.ComboServices)
                .HasForeignKey(cs => cs.ServiceId)
                .OnDelete(_databaseType == DatabaseType.Sqlite ? DeleteBehavior.Cascade : DeleteBehavior.Restrict);

            modelBuilder.Entity<ServicePromotion>(entity =>
            {
                entity.HasKey(e => e.ServicePromotionId);
                entity.HasOne(e => e.Service)
                      .WithMany(s => s.ServicePromotions)
                      .HasForeignKey(e => e.ServiceId)
                      .OnDelete(_databaseType == DatabaseType.Sqlite ? DeleteBehavior.Cascade : DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Service>()
                .HasMany(s => s.ServicePromotions)
                .WithOne(sp => sp.Service)
                .HasForeignKey(sp => sp.ServiceId)
                .OnDelete(_databaseType == DatabaseType.Sqlite ? DeleteBehavior.Cascade : DeleteBehavior.Restrict);

            modelBuilder.Entity<ServiceLocation>()
                .HasKey(sl => new { sl.ServiceId, sl.LocationId });

            modelBuilder.Entity<ServiceLocation>()
                .HasOne(sl => sl.Service)
                .WithMany(s => s.ServiceLocations)
                .HasForeignKey(sl => sl.ServiceId)
                .OnDelete(_databaseType == DatabaseType.Sqlite ? DeleteBehavior.Cascade : DeleteBehavior.Restrict);

            modelBuilder.Entity<ServiceLocation>()
                .HasOne(sl => sl.Location)
                .WithMany(l => l.ServiceLocations)
                .HasForeignKey(sl => sl.LocationId)
                .OnDelete(_databaseType == DatabaseType.Sqlite ? DeleteBehavior.Cascade : DeleteBehavior.Restrict);

            // SQLite-specific configurations
            if (_databaseType == DatabaseType.Sqlite)
            {
                ConfigureForSqlite(modelBuilder);
            }
        }

        private void ConfigureForSqlite(ModelBuilder modelBuilder)
        {
            // Configure string properties for SQLite
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(string))
                    {
                        modelBuilder.Entity(entityType.ClrType)
                            .Property(property.Name)
                            .HasColumnType("TEXT");
                    }
                }
            }
        }
    }
}

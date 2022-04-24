using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GiftingTool.Models
{
    public partial class GiftingToolContext : DbContext
    {
        public GiftingToolContext()
        {
        }

        public GiftingToolContext(DbContextOptions<GiftingToolContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Address { get; set; }
        public virtual DbSet<GiftCategory> GiftCategory { get; set; }
        public virtual DbSet<Gifts> Gifts { get; set; }
        public virtual DbSet<OrderDetails> OrderDetails { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-66SGHCF;Database=GiftingTool;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>(entity =>
            {
                entity.HasKey(e => e.PkAddressId)
                    .HasName("PK__Address__795CAFFD6F465B74");

                entity.Property(e => e.PkAddressId).HasColumnName("pk_address_id");

                entity.Property(e => e.Country)
                    .HasColumnName("country")
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('India')");

                entity.Property(e => e.District)
                    .IsRequired()
                    .HasColumnName("district")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Pincode)
                    .IsRequired()
                    .HasColumnName("pincode")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasColumnName("state")
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<GiftCategory>(entity =>
            {
                entity.HasKey(e => e.PkGiftCategoryId)
                    .HasName("PK__gift_cat__1EF09235FA4E35E7");

                entity.ToTable("gift_category");

                entity.Property(e => e.PkGiftCategoryId).HasColumnName("pk_gift_category_id");

                entity.Property(e => e.CategoryDescription)
                    .IsRequired()
                    .HasColumnName("category_description")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.CategoryName)
                    .IsRequired()
                    .HasColumnName("category_name")
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Gifts>(entity =>
            {
                entity.HasKey(e => e.PkGiftId)
                    .HasName("PK__gifts__4968C47F4EBEA3B1");

                entity.ToTable("gifts");

                entity.Property(e => e.PkGiftId).HasColumnName("pk_gift_id");

                entity.Property(e => e.FkGiftCategoryId).HasColumnName("fk_gift_category_id");

                entity.Property(e => e.GiftName)
                    .IsRequired()
                    .HasColumnName("gift_name")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.GiftPrice)
                    .IsRequired()
                    .HasColumnName("gift_price")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.GiftQuantity).HasColumnName("gift_quantity");

                entity.Property(e => e.Image)
                    .IsRequired()
                    .HasColumnName("image")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.HasOne(d => d.FkGiftCategory)
                    .WithMany(p => p.Gifts)
                    .HasForeignKey(d => d.FkGiftCategoryId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__gifts__fk_gift_c__3D5E1FD2");
            });

            modelBuilder.Entity<OrderDetails>(entity =>
            {
                entity.HasKey(e => e.PkOrderDetailsId)
                    .HasName("PK__order_de__73DAEEFA2B29C77C");

                entity.ToTable("order_details");

                entity.Property(e => e.PkOrderDetailsId).HasColumnName("pk_order_details_id");

                entity.Property(e => e.FkGiftId).HasColumnName("fk_gift_id");

                entity.Property(e => e.FkOrderId).HasColumnName("fk_order_id");

                entity.Property(e => e.GiftQuantity).HasColumnName("gift_quantity");

                entity.Property(e => e.OrderDate)
                    .HasColumnName("order_date")
                    .HasColumnType("date");

                entity.HasOne(d => d.FkGift)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.FkGiftId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__order_det__fk_gi__49C3F6B7");

                entity.HasOne(d => d.FkOrder)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.FkOrderId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__order_det__fk_or__48CFD27E");
            });

            modelBuilder.Entity<Orders>(entity =>
            {
                entity.HasKey(e => e.PkOrderId)
                    .HasName("PK__orders__B95C8E63D952D441");

                entity.ToTable("orders");

                entity.Property(e => e.PkOrderId).HasColumnName("pk_order_id");

                entity.Property(e => e.DeliveryAddress)
                    .IsRequired()
                    .HasColumnName("delivery_address")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.FkAddressId).HasColumnName("fk_address_id");

                entity.Property(e => e.FkUserId).HasColumnName("fk_user_id");

                entity.Property(e => e.OrderCost)
                    .IsRequired()
                    .HasColumnName("order_cost")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.RecipientEmail)
                    .IsRequired()
                    .HasColumnName("recipient_email")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.RecipientName)
                    .IsRequired()
                    .HasColumnName("recipient_name")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.RecipientPhoneNumber)
                    .IsRequired()
                    .HasColumnName("recipient_phone_number")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.FkAddress)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.FkAddressId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__orders__fk_addre__45F365D3");

                entity.HasOne(d => d.FkUser)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.FkUserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__orders__fk_user___44FF419A");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.PkUserId)
                    .HasName("PK__Users__2F416313AF27CAB4");

                entity.Property(e => e.PkUserId).HasColumnName("pk_user_id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasColumnName("full_name")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.IsOnline).HasColumnName("isOnline");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

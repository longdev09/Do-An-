using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Be_e_learning.Model;
namespace Be_e_learning.Model
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DataContext()
        {

        }

        #region Dbset
        public DbSet<VaiTro> vaiTros { get; set; }
        public DbSet<NguoiDung> nguoiDungs { get; set; }
        public DbSet<GiangVien> giangViens { get; set; }
        public DbSet<KhoaHoc> khoaHocs { get; set; }
        public DbSet<DanhMuc> danhMucs { get; set; }
        public DbSet<ChuongKhoaHoc> chuongKhoaHocs { get; set; }
        public DbSet<LoaiNoiDung> loaiNoiDungs { get; set; }
        public DbSet<NoiDung> noiDungs { get; set; }
        public DbSet<Video> videos { get; set; }
        public DbSet<HocVien> hocViens { get;set; }
        public DbSet<TracNghiem> tracNghiems { get; set; }
        public DbSet<DapAn> dapAns { get; set; }
        public DbSet<GioHang> gioHangs { get; set; }
        public DbSet<ChiTietGioHang> chiTietGioHangs { get; set; }
        public DbSet<HoaDon> hoaDons { get; set; }
        public DbSet<ChiTietHoaDon> chiTietHoaDons { get; set; }
        public DbSet<KhoaHocDaMua> khoaHocDaMuas { get; set; }
        public DbSet<DanhGiaKhoaHoc> danhGiaKhoaHocs { get; set; }
        public DbSet<GiamGia> giamGias { get; set; }
        public DbSet<ChiTietGiamGia> chiTietGiamGias { get; set; }
        public DbSet<HoaDonBanKh> hoaDonBanKhs { get; set; }

        public DbSet<ThongTinThanhToan> thongTinThanhToans { get; set; }

        public DbSet<LoiNhuanGiangVien> loiNhuanGiangViens { get; set; }

        public DbSet<LichSuThanhToan> lichSuThanhToans { get; set; }


        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<VaiTro>(entity =>
            {
                entity.ToTable("VaiTro");

                entity.HasKey(e => e.maVt); //  tao khoa chinh

                entity.Property(e => e.maVt)
                .HasMaxLength(255)
                .IsUnicode(false);

                entity.Property(e => e.tenVt)
                .HasMaxLength(50)
                .IsUnicode(true);
            });

            modelBuilder.Entity<NguoiDung>(entity =>
            {
                entity.ToTable("NguoiDung");
                entity.HasKey(e => e.maNg);

                entity.Property(e => e.maNg)
                .HasMaxLength(255)
                .IsUnicode(false);

                entity.Property(e => e.tenDn)
                .HasMaxLength(255)
                .IsUnicode(true);

                entity.Property(e => e.matKhau)
               .HasMaxLength(255)
               .IsUnicode(true);

                entity.Property(e => e.trangThai)
               .HasMaxLength(255)
               .IsUnicode(true);

                entity.Property(e => e.maVt)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.HasOne(e => e.vaiTro)
                .WithMany(e => e.nguoiDungs)
                .HasForeignKey(e => e.maVt)
                .HasConstraintName("FK_nguoiDung_vaiTro");

            });

            modelBuilder.Entity<GiangVien>(entity =>
            {
                entity.ToTable("GiangVien");
                entity.HasKey(e => e.maGv);


                entity.Property(e => e.maGv)
               .HasMaxLength(255)
               .IsUnicode(false);


                entity.Property(e => e.tenGv)
                .HasMaxLength(255)
                .IsUnicode(true);

                entity.Property(e => e.ngaySinh)
               .HasColumnType("date");

                entity.Property(e => e.phai)
               .HasMaxLength(10)
               .IsUnicode(true);

                entity.Property(e => e.sdt)
               .HasMaxLength(11)
               .IsUnicode(true);

                entity.Property(e => e.email)
               .HasMaxLength(255)
               .IsUnicode(true);



                entity.Property(e => e.maNg)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.linhVuc)
               .HasMaxLength(255)
               .IsUnicode(true);

                entity.Property(e => e.linhVuc)
               .HasMaxLength(255)
               .IsUnicode(true);

                entity.Property(e => e.linhVuc)
               .HasMaxLength(255)
               .IsUnicode(true);

               entity.Property(e => e.avata)
              .HasMaxLength(255)
              .IsUnicode(false);

                entity.Property(e => e.matTruocCccd)
              .HasMaxLength(255)
              .IsUnicode(false);

                entity.Property(e => e.matSauCccd)
              .HasMaxLength(255)
              .IsUnicode(false);


                entity.HasOne(e => e.nguoiDung)
                .WithOne(e => e.giangVien)
                .HasForeignKey<GiangVien>(e => e.maNg)
                .HasConstraintName("FK_giangVien_nguoiDung");



            });

            modelBuilder.Entity<DanhMuc>(entity =>
            {
                entity.ToTable("DanhMuc");

                entity.HasKey(e => e.maDm);

                entity.Property(e => e.maDm)
                .HasMaxLength(255)
                .IsUnicode(false);

                entity.Property(e => e.tenDm)
                .HasMaxLength(255)
                .IsUnicode(true);

            });

            modelBuilder.Entity<KhoaHoc>(entity =>
            {
                entity.ToTable("KhoaHoc");
                entity.HasKey(e => e.maKh);

                entity.Property(e => e.maKh)
                .HasMaxLength(255)
                .IsUnicode(false);


                entity.Property(e => e.tenKh)
                .HasMaxLength(255)
                .IsUnicode(true);

                entity.Property(e => e.hinh)
               .HasMaxLength(255)
               .IsUnicode(true);

                entity.Property(e => e.trangThai)
               .HasMaxLength(255)
               .IsUnicode(true);

                entity.Property(e => e.gia)
                 .IsRequired(false);

                entity.Property(e => e.giaGiam)
               .IsRequired(false);

                entity.Property(e => e.ketQuaDatDuoc)
              .HasMaxLength(int.MaxValue)
              .IsUnicode(true);

                entity.Property(e => e.gioiThieu)
             .HasMaxLength(int.MaxValue)
             .IsUnicode(true);

                entity.Property(e => e.ngayTao)
              .HasColumnType("date");



                entity.Property(e => e.maGv)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.maDm)
              .HasMaxLength(255)
              .IsUnicode(false);

                entity.HasOne(e => e.giangVien)
                .WithMany(e => e.khoaHocs)
                .HasForeignKey(e => e.maGv)
                .HasConstraintName("FK_khoaHoc_giangVien");

                entity.HasOne(e => e.danhMuc)
                .WithMany(e => e.khoaHocs)
                .HasForeignKey(e => e.maDm)
                .HasConstraintName("FK_khoaHoc_danhmuc");
            });

            modelBuilder.Entity<ChuongKhoaHoc>(entity =>
            {
                entity.ToTable("ChuongKhoaHoc");
                entity.HasKey(e => e.maCh);

                entity.Property(e => e.maCh)
                .HasMaxLength(255)
                .IsUnicode(false);


                entity.Property(e => e.tenChuong)
                .HasMaxLength(255)
                .IsUnicode(true);

                entity.Property(e => e.stt);

                entity.Property(e => e.maKh)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.HasOne(e => e.khoaHoc)
                .WithMany(e => e.chuongKhoaHocs)
                .HasForeignKey(e => e.maKh)
                .HasConstraintName("FK_ChuongKhoaHoc_khoaHoc");

            });

            modelBuilder.Entity<LoaiNoiDung>(entity =>
            {
                entity.ToTable("LoaiNoiDung");
                entity.HasKey(e => e.maLoaiNd);

                entity.Property(e => e.maLoaiNd)
                .HasMaxLength(255)
                .IsUnicode(false);

                entity.Property(e => e.tenLoai)
                .HasMaxLength(255)
                .IsUnicode(true);

            });

            modelBuilder.Entity<NoiDung>(entity =>
            {

                entity.ToTable("NoiDung");
                entity.HasKey(e => e.maNd);

                entity.Property(e => e.maNd)
                .HasMaxLength(255)
                .IsUnicode(false);

                entity.Property(e => e.maCh)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.tieuDe)
               .HasMaxLength(255)
               .IsUnicode(true);

                entity.Property(e => e.moTa)
               .HasMaxLength(int.MaxValue)
               .IsUnicode(true);

                entity.Property(e => e.stt);

                entity.Property(e => e.maLoaiNd)
               .HasMaxLength(255)
               .IsUnicode(false);


                entity.HasOne(e => e.chuongKhoaHoc)
                 .WithMany(e => e.noiDungs)
                 .HasForeignKey(e => e.maCh)
                 .HasConstraintName("FK_BaiGiang_ChuongKhoaHoc");

                entity.HasOne(e => e.loaiNoiDung)
                 .WithMany(e => e.noiDungs)
                 .HasForeignKey(e => e.maLoaiNd)
                 .HasConstraintName("FK_BaiGiang_LoaiNoiDung");

            });

            modelBuilder.Entity<Video>(entity =>
            {

                entity.ToTable("Video");
                entity.HasKey(e => e.maVideo);

                entity.Property(e => e.maVideo)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.videoUlr)
               .HasMaxLength(int.MaxValue)
               .IsUnicode(false);

                entity.Property(e => e.maNd)
                 .HasMaxLength(255)
                 .IsUnicode(false);

                entity.Property(e => e.tenFile)
                  .HasMaxLength(255)
                  .IsUnicode(true);

                entity.Property(e => e.tenFile)
                .HasMaxLength(255)
                .IsUnicode(true);

                entity.Property(e => e.thoiLuongVideo)
               .HasMaxLength(255)
               .IsUnicode(true);


                entity.Property(e => e.ngay)
                 .HasColumnType("date");


                entity.HasOne(e => e.noidung)
                 .WithOne(e => e.video)
                 .HasForeignKey<Video>(e => e.maNd)
                 .HasConstraintName("FK_Video_NoiDung");

            });

            modelBuilder.Entity<TracNghiem>(entity =>
            {
                entity.ToTable("TracNghiem");
                entity.HasKey(e => e.maTrn);

                entity.Property(e => e.maTrn)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.dapAnDung)
              .IsRequired(false);

                entity.Property(e => e.tenCauHoi)
               .HasMaxLength(int.MaxValue)
               .IsUnicode(true);

                entity.Property(e => e.maNd)
                 .HasMaxLength(255)
                 .IsUnicode(false);


                entity.HasOne(e => e.noiDung)
                .WithOne(e => e.tracNghiem)
                .HasForeignKey<TracNghiem>(e => e.maNd)
                .HasConstraintName("FK_TracNghiem_NoiDung");

            });

            modelBuilder.Entity<DapAn>(entity =>
            {
                entity.ToTable("DapAn");
                entity.HasKey(e => e.maDa);

                entity.Property(e => e.maDa)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.tenDa)
                .HasMaxLength(int.MaxValue)
               .IsUnicode(true);

                entity.Property(e => e.giaiThich)
               .HasMaxLength(int.MaxValue)
               .IsUnicode(true);

                entity.Property(e => e.sttDn)
                 .IsRequired(false);


                entity.Property(e => e.maTrn)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.HasOne(e => e.tracNghiem)
                .WithMany(e => e.dapAns)
                .HasForeignKey(e => e.maTrn)
                .HasConstraintName("FK_DapAn_TracNghiem");

            });

            modelBuilder.Entity<HocVien>(entity =>
            {

                entity.ToTable("HocVien");
                entity.HasKey(e => e.maHv);

                entity.Property(e => e.maHv)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.hoTen)
               .HasMaxLength(255)
               .IsUnicode(true);

                entity.Property(e => e.sdt)
                 .HasMaxLength(255)
                 .IsUnicode(false);


                entity.Property(e => e.email)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.ngaySinh)
                .HasColumnType("date");

                entity.Property(e => e.avata)
                 .HasMaxLength(int.MaxValue)
                 .IsUnicode(false);

                entity.Property(e => e.maNg)
                 .HasMaxLength(255)
                 .IsUnicode(false);


                entity.HasOne(e => e.nguoiDung)
                .WithOne(e => e.hocVien)
                .HasForeignKey<HocVien>(e => e.maNg)
                .HasConstraintName("FK_hocvien_nguoiDung");
            });

            modelBuilder.Entity<GioHang>(entity =>
            {
                entity.ToTable("GioHang");
                entity.HasKey(e => e.maGh);

                entity.Property(e => e.maGh)
                .HasMaxLength(255)
                .IsUnicode(false);

                entity.Property(e => e.maHv)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.tongTien)
               .IsRequired(false);


                entity.HasOne(e => e.hocVien)
               .WithOne(e => e.gioHang)
               .HasForeignKey<GioHang>(e => e.maHv)
               .HasConstraintName("FK_gioHang_hocVien");


            });

            modelBuilder.Entity<ChiTietGioHang>(entity =>
            {
                entity.ToTable("ChiTietGioHang")
                 .HasKey(e => new { e.maGh, e.maKh });

                entity.Property(e => e.maGh)
                .HasMaxLength(255)
                .IsUnicode(false);

                entity.Property(e => e.maKh)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.donGia)
                .IsRequired(false);

                entity.HasOne(e => e.gioHang)
                .WithMany(p => p.chiTietGioHangs)
                .HasForeignKey(d => d.maGh)
                .HasConstraintName("FK_chiTietGioHang_gioHang");

                entity.HasOne(e => e.khoaHoc)
                .WithMany(p => p.chiTietGioHangs)
                .HasForeignKey(d => d.maKh)
                .HasConstraintName("FK_chiTietGioHang_khoaHoc");

            });

            modelBuilder.Entity<HoaDon>(entity =>
            {
                entity.ToTable("HoaDon");
                entity.HasKey(e => e.maHd);

                entity.Property(e => e.maHd)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.tongTien)
                .IsRequired(false);

                entity.Property(e => e.maHv)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.ngayThanhToan)
               .HasColumnType("date");


                entity.HasOne(e => e.hocVien)
               .WithMany(e => e.hoaDons)
               .HasForeignKey(e => e.maHv)
               .HasConstraintName("FK_HoaDon_HocVien");

            });

            modelBuilder.Entity<ChiTietHoaDon>(entity =>
            {
                entity.ToTable("ChiTietHoaDon")
                 .HasKey(e => new { e.maHd, e.maKh });

                entity.Property(e => e.maHd)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.maKh)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.donGia)
                .IsRequired(false);

                entity.HasOne(e => e.hoaDon)
               .WithMany(e => e.chiTietHoaDons)
               .HasForeignKey(e => e.maHd)
               .HasConstraintName("FK_ChiTietHoaDons_HoaDon");

                entity.HasOne(e => e.khoaHoc)
               .WithMany(e => e.chiTietHoaDons)
               .HasForeignKey(e => e.maKh)
               .HasConstraintName("FK_ChiTietHoaDons_KhoaHoc");

            });

            modelBuilder.Entity<KhoaHocDaMua>(entity =>
            {
                entity.ToTable("KhoaHocDaMua")
                .HasKey(e => new { e.maKh, e.maHv });

                entity.Property(e => e.maHv)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.maKh)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.tienTrinh)
                .IsRequired(false);

                entity.HasOne(e => e.khoaHoc)
               .WithMany(e => e.khoaHocDaMuas)
               .HasForeignKey(e => e.maKh)
               .HasConstraintName("FK_KhoaHocDaMuas_HoaDon");

                entity.HasOne(e => e.hocVien)
               .WithMany(e => e.khoaHocDaMuas)
               .HasForeignKey(e => e.maHv)
               .HasConstraintName("FK_KhoaHocDaMuas_KhoaHoc");

            });

            modelBuilder.Entity<DanhGiaKhoaHoc>(entity =>
            {
                entity.ToTable("DanhGiaKhoaHoc");
                entity.HasKey(e => e.maDanhGia);

                entity.Property(e => e.maHv)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.maKh)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.soSao)
               .IsRequired(false);

                entity.Property(e => e.ngayDg)
                .HasColumnType("date");

                entity.HasOne(e => e.khoaHoc)
               .WithMany(e => e.danhGiaKhoaHocs)
               .HasForeignKey(e => e.maKh)
               .HasConstraintName("FK_DanhGiaKhoaHoc_KhoaHoa");

                entity.HasOne(e => e.hocVien)
               .WithMany(e => e.danhGiaKhoaHocs)
               .HasForeignKey(e => e.maHv)
               .HasConstraintName("FK_DanhGiaKhoaHoc_HocVien");

            });

            modelBuilder.Entity<GiamGia>(entity =>
            {
                entity.ToTable("GiamGia");
                entity.HasKey(e => e.maGg);

                entity.Property(e => e.maGg)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.maGv)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.phanTramGiam)
               .IsRequired(false);

                entity.Property(e => e.ghiChu)
               .HasMaxLength(int.MaxValue)
               .IsUnicode(true);

                entity.Property(e => e.ngayTao)
              .HasColumnType("datetime");

                entity.HasOne(e => e.giangVien)
               .WithMany(e => e.giamGias)
               .HasForeignKey(e => e.maGv)
               .HasConstraintName("FK_GiamGia_GiangVien");

            });

            modelBuilder.Entity<ChiTietGiamGia>(entity =>
            {
                entity.ToTable("ChiTietGiamGia");
                entity.HasKey(e => new {e.maKh, e.maGg});

                entity.Property(e => e.maGg)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.maKh)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.ngayBatDau)
               .HasColumnType("date");

                entity.Property(e => e.ngayKetThuc)
               .HasColumnType("date");


                entity.HasOne(e => e.giamGia)
               .WithMany(e => e.chiTietGiamGias)
               .HasForeignKey(e => e.maGg)
               .HasConstraintName("FK_chiTietGiamGia_GiamGia");

            });

            modelBuilder.Entity<HoaDonBanKh>(entity =>
            {
                entity.ToTable("HoaDonBanKh");
                entity.HasKey(e => e.maHdKhMua);

                entity.Property(e => e.maGv)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.tenHv)
                 .HasMaxLength(255)
                 .IsUnicode(true);


                entity.Property(e => e.maKh)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.ngayMua)
               .HasColumnType("date");

                entity.Property(e => e.donGia)
                   .IsRequired(false);

                entity.Property(e => e.loiNhuanThuDc)
                 .IsRequired(false);


                entity.HasOne(e => e.giangVien)
               .WithMany(e => e.hoaDonBanKhs)
               .HasForeignKey(e => e.maGv)
               .HasConstraintName("FK_HoaDonBanKh_GiangVien");

               

            });

            modelBuilder.Entity<ThongTinThanhToan>(entity =>
            {
                entity.ToTable("ThongTinThanhToan");
                entity.HasKey(e => e.maTt);

                entity.Property(e => e.maGv)
               .HasMaxLength(255)
               .IsUnicode(false);


                entity.Property(e => e.tenNganHang)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.logoNganHang)
                 .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.stk)
                 .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.nguoiThuHuong)
                 .HasMaxLength(255)
               .IsUnicode(true);




                entity.HasOne(e => e.giangVien)
             .WithOne(e => e.thongTinThanhToan)
             .HasForeignKey<ThongTinThanhToan>(e => e.maGv)
             .HasConstraintName("FK_thongTinThanhToan_giangVien");



            });

            modelBuilder.Entity<LoiNhuanGiangVien>(entity =>
            {
                entity.ToTable("LoiNhuanGiangVien");
                entity.HasKey(e => e.maLoiNhuan);

                entity.Property(e => e.maGv)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.tongLoiNhuan)
               .IsRequired(false);

              entity.HasOne(e => e.giangVien)
             .WithOne(e => e.loiNhuanGiangVien)
             .HasForeignKey<LoiNhuanGiangVien>(e => e.maGv)
             .HasConstraintName("FK_LoiNhuanGiangVien_giangVien");



            });


            modelBuilder.Entity<LichSuThanhToan>(entity =>
            {
                entity.ToTable("LichSuThanhToan");
                entity.HasKey(e => e.maLs);

                entity.Property(e => e.maGv)
               .HasMaxLength(255)
               .IsUnicode(false);

                entity.Property(e => e.trangThai)
               .HasMaxLength(255)
               .IsUnicode(true);

                entity.Property(e => e.donGiaRut)
               .IsRequired(false);

                entity.Property(e => e.ngayRut)
              .HasColumnType("date");

                entity.Property(e => e.ngayThanhToan)
                .HasColumnType("date")
                .IsRequired(false);

                entity.HasOne(e => e.giangViens)
               .WithMany(e => e.lichSuThanhToans)
               .HasForeignKey(e => e.maGv)
               .HasConstraintName("FK_lichSuThanhToans_GiangVien");

            });

        }
    }
}

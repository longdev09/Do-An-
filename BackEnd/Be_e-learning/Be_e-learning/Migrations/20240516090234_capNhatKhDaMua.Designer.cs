﻿// <auto-generated />
using System;
using Be_e_learning.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Be_e_learning.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240516090234_capNhatKhDaMua")]
    partial class capNhatKhDaMua
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Be_e_learning.Model.ChiTietGioHang", b =>
                {
                    b.Property<string>("maKh")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<float?>("donGia")
                        .HasColumnType("real");

                    b.Property<string>("maGh")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.HasKey("maKh");

                    b.HasIndex("maGh");

                    b.ToTable("ChiTietGioHang");
                });

            modelBuilder.Entity("Be_e_learning.Model.ChiTietHoaDon", b =>
                {
                    b.Property<string>("maKh")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<float?>("donGia")
                        .HasColumnType("real");

                    b.Property<string>("maHd")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.HasKey("maKh");

                    b.HasIndex("maHd");

                    b.ToTable("ChiTietHoaDon");
                });

            modelBuilder.Entity("Be_e_learning.Model.ChuongKhoaHoc", b =>
                {
                    b.Property<string>("maCh")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("maKh")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<int>("stt")
                        .HasColumnType("int");

                    b.Property<string>("tenChuong")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("maCh");

                    b.HasIndex("maKh");

                    b.ToTable("ChuongKhoaHoc");
                });

            modelBuilder.Entity("Be_e_learning.Model.DanhMuc", b =>
                {
                    b.Property<string>("maDm")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("tenDm")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("maDm");

                    b.ToTable("DanhMuc");
                });

            modelBuilder.Entity("Be_e_learning.Model.DapAn", b =>
                {
                    b.Property<string>("maDa")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ketQua")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("maTrn")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("tenDa")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("maDa");

                    b.HasIndex("maTrn");

                    b.ToTable("DapAn");
                });

            modelBuilder.Entity("Be_e_learning.Model.GiangVien", b =>
                {
                    b.Property<string>("maGv")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("avata")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("email")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("linhVuc")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("maNg")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("matSauCccd")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("matTruocCccd")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime?>("ngaySinh")
                        .HasColumnType("date");

                    b.Property<string>("phai")
                        .HasMaxLength(10)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(10)");

                    b.Property<string>("sdt")
                        .HasMaxLength(11)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(11)");

                    b.Property<string>("tenGv")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("maGv");

                    b.HasIndex("maNg")
                        .IsUnique()
                        .HasFilter("[maNg] IS NOT NULL");

                    b.ToTable("GiangVien");
                });

            modelBuilder.Entity("Be_e_learning.Model.GioHang", b =>
                {
                    b.Property<string>("maGh")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("maHv")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<float?>("tongTien")
                        .HasColumnType("real");

                    b.HasKey("maGh");

                    b.HasIndex("maHv")
                        .IsUnique()
                        .HasFilter("[maHv] IS NOT NULL");

                    b.ToTable("GioHang");
                });

            modelBuilder.Entity("Be_e_learning.Model.HoaDon", b =>
                {
                    b.Property<string>("maHd")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("maHv")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("ngayThanhToan")
                        .HasColumnType("date");

                    b.Property<float?>("tongTien")
                        .HasColumnType("real");

                    b.HasKey("maHd");

                    b.HasIndex("maHv");

                    b.ToTable("HoaDon");
                });

            modelBuilder.Entity("Be_e_learning.Model.HocVien", b =>
                {
                    b.Property<string>("maHv")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("avata")
                        .HasMaxLength(2147483647)
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("email")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("hoTen")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("maNg")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("ngaySinh")
                        .HasColumnType("date");

                    b.Property<string>("sdt")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.HasKey("maHv");

                    b.HasIndex("maNg")
                        .IsUnique()
                        .HasFilter("[maNg] IS NOT NULL");

                    b.ToTable("HocVien");
                });

            modelBuilder.Entity("Be_e_learning.Model.KhoaHoc", b =>
                {
                    b.Property<string>("maKh")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<float?>("gia")
                        .HasColumnType("real");

                    b.Property<string>("gioiThieu")
                        .HasMaxLength(2147483647)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("hinh")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("ketQuaDatDuoc")
                        .HasMaxLength(2147483647)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("maDm")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("maGv")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("tenKh")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("trangThai")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("maKh");

                    b.HasIndex("maDm");

                    b.HasIndex("maGv");

                    b.ToTable("KhoaHoc");
                });

            modelBuilder.Entity("Be_e_learning.Model.KhoaHocDaMua", b =>
                {
                    b.Property<string>("maHv")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("maKh")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("tienTrinh")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("maHv");

                    b.HasIndex("maKh");

                    b.ToTable("KhoaHocDaMua");
                });

            modelBuilder.Entity("Be_e_learning.Model.LoaiNoiDung", b =>
                {
                    b.Property<string>("maLoaiNd")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("tenLoai")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("maLoaiNd");

                    b.ToTable("LoaiNoiDung");
                });

            modelBuilder.Entity("Be_e_learning.Model.NguoiDung", b =>
                {
                    b.Property<string>("maNg")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("maVt")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("matKhau")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("tenDn")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("trangThai")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("maNg");

                    b.HasIndex("maVt");

                    b.ToTable("NguoiDung");
                });

            modelBuilder.Entity("Be_e_learning.Model.NoiDung", b =>
                {
                    b.Property<string>("maNd")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("maCh")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("maLoaiNd")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("moTa")
                        .HasMaxLength(2147483647)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("stt")
                        .HasColumnType("int");

                    b.Property<string>("tieuDe")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("maNd");

                    b.HasIndex("maCh");

                    b.HasIndex("maLoaiNd");

                    b.ToTable("NoiDung");
                });

            modelBuilder.Entity("Be_e_learning.Model.TracNghiem", b =>
                {
                    b.Property<string>("maTrn")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("maNd")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("tenCauHoi")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("maTrn");

                    b.HasIndex("maNd");

                    b.ToTable("TracNghiem");
                });

            modelBuilder.Entity("Be_e_learning.Model.VaiTro", b =>
                {
                    b.Property<string>("maVt")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("tenVt")
                        .HasMaxLength(50)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("maVt");

                    b.ToTable("VaiTro");
                });

            modelBuilder.Entity("Be_e_learning.Model.Video", b =>
                {
                    b.Property<string>("maVideo")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("maNd")
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("ngay")
                        .HasColumnType("date");

                    b.Property<string>("tenFile")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("thoiLuongVideo")
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("videoUlr")
                        .HasMaxLength(2147483647)
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.HasKey("maVideo");

                    b.HasIndex("maNd")
                        .IsUnique()
                        .HasFilter("[maNd] IS NOT NULL");

                    b.ToTable("Video");
                });

            modelBuilder.Entity("Be_e_learning.Model.ChiTietGioHang", b =>
                {
                    b.HasOne("Be_e_learning.Model.GioHang", "gioHang")
                        .WithMany("chiTietGioHangs")
                        .HasForeignKey("maGh")
                        .HasConstraintName("FK_chiTietGioHang_gioHang");

                    b.HasOne("Be_e_learning.Model.KhoaHoc", "khoaHoc")
                        .WithMany("chiTietGioHangs")
                        .HasForeignKey("maKh")
                        .HasConstraintName("FK_chiTietGioHang_khoaHoc")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("gioHang");

                    b.Navigation("khoaHoc");
                });

            modelBuilder.Entity("Be_e_learning.Model.ChiTietHoaDon", b =>
                {
                    b.HasOne("Be_e_learning.Model.HoaDon", "hoaDon")
                        .WithMany("chiTietHoaDons")
                        .HasForeignKey("maHd")
                        .HasConstraintName("FK_ChiTietHoaDons_HoaDon");

                    b.HasOne("Be_e_learning.Model.KhoaHoc", "khoaHoc")
                        .WithMany("chiTietHoaDons")
                        .HasForeignKey("maKh")
                        .HasConstraintName("FK_ChiTietHoaDons_KhoaHoc")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("hoaDon");

                    b.Navigation("khoaHoc");
                });

            modelBuilder.Entity("Be_e_learning.Model.ChuongKhoaHoc", b =>
                {
                    b.HasOne("Be_e_learning.Model.KhoaHoc", "khoaHoc")
                        .WithMany("chuongKhoaHocs")
                        .HasForeignKey("maKh")
                        .HasConstraintName("FK_ChuongKhoaHoc_khoaHoc");

                    b.Navigation("khoaHoc");
                });

            modelBuilder.Entity("Be_e_learning.Model.DapAn", b =>
                {
                    b.HasOne("Be_e_learning.Model.TracNghiem", "tracNghiem")
                        .WithMany("dapAns")
                        .HasForeignKey("maTrn")
                        .HasConstraintName("FK_DapAn_TracNghiem");

                    b.Navigation("tracNghiem");
                });

            modelBuilder.Entity("Be_e_learning.Model.GiangVien", b =>
                {
                    b.HasOne("Be_e_learning.Model.NguoiDung", "nguoiDung")
                        .WithOne("giangVien")
                        .HasForeignKey("Be_e_learning.Model.GiangVien", "maNg")
                        .HasConstraintName("FK_giangVien_nguoiDung");

                    b.Navigation("nguoiDung");
                });

            modelBuilder.Entity("Be_e_learning.Model.GioHang", b =>
                {
                    b.HasOne("Be_e_learning.Model.HocVien", "hocVien")
                        .WithOne("gioHang")
                        .HasForeignKey("Be_e_learning.Model.GioHang", "maHv")
                        .HasConstraintName("FK_gioHang_hocVien");

                    b.Navigation("hocVien");
                });

            modelBuilder.Entity("Be_e_learning.Model.HoaDon", b =>
                {
                    b.HasOne("Be_e_learning.Model.HocVien", "hocVien")
                        .WithMany("hoaDons")
                        .HasForeignKey("maHv")
                        .HasConstraintName("FK_HoaDon_HocVien");

                    b.Navigation("hocVien");
                });

            modelBuilder.Entity("Be_e_learning.Model.HocVien", b =>
                {
                    b.HasOne("Be_e_learning.Model.NguoiDung", "nguoiDung")
                        .WithOne("hocVien")
                        .HasForeignKey("Be_e_learning.Model.HocVien", "maNg")
                        .HasConstraintName("FK_hocvien_nguoiDung");

                    b.Navigation("nguoiDung");
                });

            modelBuilder.Entity("Be_e_learning.Model.KhoaHoc", b =>
                {
                    b.HasOne("Be_e_learning.Model.DanhMuc", "danhMuc")
                        .WithMany("khoaHocs")
                        .HasForeignKey("maDm")
                        .HasConstraintName("FK_khoaHoc_danhmuc");

                    b.HasOne("Be_e_learning.Model.GiangVien", "giangVien")
                        .WithMany("khoaHocs")
                        .HasForeignKey("maGv")
                        .HasConstraintName("FK_khoaHoc_giangVien");

                    b.Navigation("danhMuc");

                    b.Navigation("giangVien");
                });

            modelBuilder.Entity("Be_e_learning.Model.KhoaHocDaMua", b =>
                {
                    b.HasOne("Be_e_learning.Model.HocVien", "hocVien")
                        .WithMany("khoaHocDaMuas")
                        .HasForeignKey("maHv")
                        .HasConstraintName("FK_KhoaHocDaMuas_KhoaHoc")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Be_e_learning.Model.KhoaHoc", "khoaHoc")
                        .WithMany("khoaHocDaMuas")
                        .HasForeignKey("maKh")
                        .HasConstraintName("FK_KhoaHocDaMuas_HoaDon");

                    b.Navigation("hocVien");

                    b.Navigation("khoaHoc");
                });

            modelBuilder.Entity("Be_e_learning.Model.NguoiDung", b =>
                {
                    b.HasOne("Be_e_learning.Model.VaiTro", "vaiTro")
                        .WithMany("nguoiDungs")
                        .HasForeignKey("maVt")
                        .HasConstraintName("FK_nguoiDung_vaiTro");

                    b.Navigation("vaiTro");
                });

            modelBuilder.Entity("Be_e_learning.Model.NoiDung", b =>
                {
                    b.HasOne("Be_e_learning.Model.ChuongKhoaHoc", "chuongKhoaHoc")
                        .WithMany("noiDungs")
                        .HasForeignKey("maCh")
                        .HasConstraintName("FK_BaiGiang_ChuongKhoaHoc");

                    b.HasOne("Be_e_learning.Model.LoaiNoiDung", "loaiNoiDung")
                        .WithMany("noiDungs")
                        .HasForeignKey("maLoaiNd")
                        .HasConstraintName("FK_BaiGiang_LoaiNoiDung");

                    b.Navigation("chuongKhoaHoc");

                    b.Navigation("loaiNoiDung");
                });

            modelBuilder.Entity("Be_e_learning.Model.TracNghiem", b =>
                {
                    b.HasOne("Be_e_learning.Model.NoiDung", "noiDung")
                        .WithMany("tracNghiems")
                        .HasForeignKey("maNd")
                        .HasConstraintName("FK_TracNghiem_NoiDung");

                    b.Navigation("noiDung");
                });

            modelBuilder.Entity("Be_e_learning.Model.Video", b =>
                {
                    b.HasOne("Be_e_learning.Model.NoiDung", "noidung")
                        .WithOne("video")
                        .HasForeignKey("Be_e_learning.Model.Video", "maNd")
                        .HasConstraintName("FK_Video_NoiDung");

                    b.Navigation("noidung");
                });

            modelBuilder.Entity("Be_e_learning.Model.ChuongKhoaHoc", b =>
                {
                    b.Navigation("noiDungs");
                });

            modelBuilder.Entity("Be_e_learning.Model.DanhMuc", b =>
                {
                    b.Navigation("khoaHocs");
                });

            modelBuilder.Entity("Be_e_learning.Model.GiangVien", b =>
                {
                    b.Navigation("khoaHocs");
                });

            modelBuilder.Entity("Be_e_learning.Model.GioHang", b =>
                {
                    b.Navigation("chiTietGioHangs");
                });

            modelBuilder.Entity("Be_e_learning.Model.HoaDon", b =>
                {
                    b.Navigation("chiTietHoaDons");
                });

            modelBuilder.Entity("Be_e_learning.Model.HocVien", b =>
                {
                    b.Navigation("gioHang");

                    b.Navigation("hoaDons");

                    b.Navigation("khoaHocDaMuas");
                });

            modelBuilder.Entity("Be_e_learning.Model.KhoaHoc", b =>
                {
                    b.Navigation("chiTietGioHangs");

                    b.Navigation("chiTietHoaDons");

                    b.Navigation("chuongKhoaHocs");

                    b.Navigation("khoaHocDaMuas");
                });

            modelBuilder.Entity("Be_e_learning.Model.LoaiNoiDung", b =>
                {
                    b.Navigation("noiDungs");
                });

            modelBuilder.Entity("Be_e_learning.Model.NguoiDung", b =>
                {
                    b.Navigation("giangVien");

                    b.Navigation("hocVien");
                });

            modelBuilder.Entity("Be_e_learning.Model.NoiDung", b =>
                {
                    b.Navigation("tracNghiems");

                    b.Navigation("video");
                });

            modelBuilder.Entity("Be_e_learning.Model.TracNghiem", b =>
                {
                    b.Navigation("dapAns");
                });

            modelBuilder.Entity("Be_e_learning.Model.VaiTro", b =>
                {
                    b.Navigation("nguoiDungs");
                });
#pragma warning restore 612, 618
        }
    }
}

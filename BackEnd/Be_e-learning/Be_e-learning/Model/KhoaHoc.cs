using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Be_e_learning.Model
{
    public class KhoaHoc
    {
        public string maKh { get; set; }
        public string tenKh { get; set; }
        public float? gia { get; set; }
        public float? giaGiam { get; set; }

        public string hinh { get; set; }
        public string gioiThieu { get; set; }
        public string trangThai { get; set; }
        public string ketQuaDatDuoc { get; set; }
        public string maGv { get; set; }
        public string maDm { get; set; }
        public DateTime ngayTao { get; set; }


        public ICollection<ChuongKhoaHoc> chuongKhoaHocs { get; set; }
        public ICollection<ChiTietGioHang> chiTietGioHangs { get; set; }
        public ICollection<ChiTietHoaDon> chiTietHoaDons { get; set; }
        public ICollection<KhoaHocDaMua> khoaHocDaMuas { get; set; }
        public ICollection<DanhGiaKhoaHoc> danhGiaKhoaHocs { get; set; }
        public ICollection<ChiTietGiamGia> chiTietGiamGias { get; set; }
       

        


        public KhoaHoc ( )
        {
            chuongKhoaHocs = new HashSet<ChuongKhoaHoc>();
            chiTietGioHangs = new HashSet<ChiTietGioHang>();
            chiTietHoaDons = new HashSet<ChiTietHoaDon>();  
            khoaHocDaMuas = new HashSet<KhoaHocDaMua>();
            danhGiaKhoaHocs = new HashSet<DanhGiaKhoaHoc>();
            chiTietGiamGias = new HashSet<ChiTietGiamGia>();
          

        }

        public GiangVien giangVien { get; set; }

        public DanhMuc danhMuc { get; set; }

    }
}

using System;
using System.Collections;
using System.Collections.Generic;

namespace Be_e_learning.Model
{
    public class HocVien
    {
        public string maHv { get; set; }
        public string hoTen { get; set; }
        public DateTime ngaySinh {get; set;}
        public string avata {  get; set;}
        public string email { get; set;}
        public string sdt { get; set;}
        public string maNg { get; set; }

        public virtual NguoiDung nguoiDung { get; set; }

        public virtual GioHang gioHang { get; set; }    

        public ICollection<HoaDon> hoaDons {  get; set; }
        public ICollection<KhoaHocDaMua> khoaHocDaMuas { get; set; }
        public ICollection<DanhGiaKhoaHoc> danhGiaKhoaHocs { get; set; }

        public HocVien ()
        {
            hoaDons = new HashSet<HoaDon> ();
            khoaHocDaMuas = new HashSet<KhoaHocDaMua> ();
            danhGiaKhoaHocs = new HashSet<DanhGiaKhoaHoc>();
        }
    }
}

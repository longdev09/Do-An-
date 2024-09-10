using System;
using System.Collections;
using System.Collections.Generic;

namespace Be_e_learning.Model
{
    public class HoaDon
    {
        public string maHd {  get; set; }
        public string maHv { get; set;}
        public float? tongTien{ get; set;}
        public DateTime ngayThanhToan { get; set;}

        public HocVien hocVien { get; set;}

        public ICollection<ChiTietHoaDon> chiTietHoaDons { get; set;}
        public HoaDon ()
        {
            chiTietHoaDons = new HashSet<ChiTietHoaDon> ();
        }
    }
}

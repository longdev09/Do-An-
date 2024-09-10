using System;
using System.Collections.Generic;

namespace Be_e_learning.Model
{
    public class GiamGia
    {

        public string maGg {  get; set; }
        public float? phanTramGiam { get; set; }
        public string maGv { get; set; }
        public string ghiChu { get; set; }
        public DateTime ngayTao { get; set; }
        public GiangVien giangVien { get; set; }
        public ICollection<ChiTietGiamGia> chiTietGiamGias { get; set; }
        public GiamGia()
        {
            chiTietGiamGias = new HashSet<ChiTietGiamGia>();
        }



    }
}

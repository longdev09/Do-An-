using System;

namespace Be_e_learning.Model
{
    public class ChiTietGiamGia
    {
        public string maGg { get; set; }
        public string maKh { get; set; }
        public DateTime ngayBatDau { get; set; }
        public DateTime ngayKetThuc { get; set; }
        public KhoaHoc khoaHoc { get; set; }
        public GiamGia giamGia { get; set; }

    }
}

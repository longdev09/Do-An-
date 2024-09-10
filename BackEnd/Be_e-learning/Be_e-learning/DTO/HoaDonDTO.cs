using System;
using System.Collections.Generic;

namespace Be_e_learning.DTO
{
    public class HoaDonDTO
    {
        public string maHd { get; set; }
        public string maHv { get; set; }
        public float? tongTien { get; set; }
        public DateTime ngayThanhToan { get; set; }
        public List<ChiTietHoaDonDTO> ChiTietHoaDon { get; set; }

        public class ChiTietHoaDonDTO
        {
            public string maHd { get; set; }
            public string maKh { get; set; }
            public float? donGia { get; set; }
        }

    }
}

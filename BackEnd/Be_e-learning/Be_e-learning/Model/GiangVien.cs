using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Be_e_learning.Model
{
    public class GiangVien
    {

        public string maGv { get; set; }
        public string tenGv { get; set; }
        public DateTime? ngaySinh { get; set; }
        public string phai { get; set; }
        public string sdt { get; set;  }
        public string email { get; set; }
        public string linhVuc { get; set; }
        public string avata { get; set; }
        public string matTruocCccd { get; set; }
        public string matSauCccd { get; set; }
        public string maNg { get; set; }
        public virtual NguoiDung nguoiDung { get; set; }
        public virtual ThongTinThanhToan thongTinThanhToan { get; set; }

        public virtual LoiNhuanGiangVien loiNhuanGiangVien { get; set; }
 
        public ICollection<KhoaHoc> khoaHocs { get; set; }
        public ICollection<GiamGia> giamGias { get; set; }

        public ICollection<HoaDonBanKh> hoaDonBanKhs { get; set; }

        public ICollection<LichSuThanhToan> lichSuThanhToans { get; set; }
        public GiangVien ()
        {
            khoaHocs = new HashSet<KhoaHoc>();
            giamGias = new HashSet<GiamGia>();
            hoaDonBanKhs = new HashSet<HoaDonBanKh>();
            lichSuThanhToans = new HashSet<LichSuThanhToan>();

        }


    }
}

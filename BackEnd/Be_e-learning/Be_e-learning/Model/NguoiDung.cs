using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Be_e_learning.Model
{
    public class NguoiDung
    {   
        public string maNg { get; set; }
        public string tenDn { get; set; }
        public string matKhau { get; set;  }
        public string maVt { get; set; }
        public string trangThai { get; set; }

        //public ICollection<GiangVien> giangViens { get; set; }
        //public NguoiDung()
        //{
        //    giangViens = new HashSet<GiangVien>();
        //}
        public virtual GiangVien giangVien { get; set; }
        public virtual HocVien hocVien { get; set; }

        public VaiTro vaiTro { get; set; }
        

    }
}

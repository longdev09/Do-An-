using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Be_e_learning.Model
{
    public class ChuongKhoaHoc
    {

        public string maCh { get; set; }
        public string maKh { get; set; }
        public string tenChuong { get; set; }
        public int stt { get; set; }

        public KhoaHoc khoaHoc { get; set; }

        public ICollection<NoiDung> noiDungs { get; set; }

        public ChuongKhoaHoc ()
        {
            noiDungs = new HashSet<NoiDung>();
        }

    }
}

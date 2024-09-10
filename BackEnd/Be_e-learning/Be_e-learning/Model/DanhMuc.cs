using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Be_e_learning.Model
{
    public class DanhMuc
    {

        public string maDm { get; set; }
        public string tenDm { get; set; }

        public ICollection<KhoaHoc> khoaHocs { get; set; }

        public DanhMuc ()
        {
            khoaHocs = new HashSet<KhoaHoc>();
        }

    }
}

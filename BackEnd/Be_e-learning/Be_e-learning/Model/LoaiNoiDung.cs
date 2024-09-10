using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Be_e_learning.Model
{
    public class LoaiNoiDung
    {
        public string maLoaiNd { get; set; }
        public string tenLoai { get; set; }

        public ICollection<NoiDung> noiDungs { get; set; }
        public LoaiNoiDung()
        {
            noiDungs = new HashSet<NoiDung>();
        }
    }
}

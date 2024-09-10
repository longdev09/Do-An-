using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Be_e_learning.Model
{
    public class VaiTro
    {
       
        public string maVt { get; set; }
        public string tenVt { get; set; }


        public ICollection<NguoiDung> nguoiDungs { get; set; }

        public VaiTro()
        {
            nguoiDungs = new HashSet<NguoiDung>();
        }
    }
}

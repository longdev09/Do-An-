using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Be_e_learning.Model
{
    public class Video
    {
        public string maVideo { get; set; }
        public string  videoUlr { get; set; }
        public string maNd { get; set; }
        public string tenFile { get; set; }
        public DateTime ngay {  get; set; }
        public string thoiLuongVideo { get; set; }
        public virtual NoiDung noidung { get; set; }

    }
}

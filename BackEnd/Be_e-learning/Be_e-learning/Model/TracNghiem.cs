using System.Collections.Generic;

namespace Be_e_learning.Model
{
    public class TracNghiem
    {

        public string maTrn { get; set; }
        public string tenCauHoi { get; set; }   
        public string maNd { get; set; }
        public int? dapAnDung {  get; set; }
        public virtual NoiDung noiDung { get; set; }

        public ICollection<DapAn> dapAns { get; set; }
        public TracNghiem()
        {
            dapAns = new HashSet<DapAn>();
        }
    }
}

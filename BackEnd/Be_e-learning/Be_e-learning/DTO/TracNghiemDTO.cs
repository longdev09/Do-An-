using System.Collections.Generic;

namespace Be_e_learning.DTO
{
    public class TracNghiemDTO
    {
        public string maTrn { get; set; }
        public string tenCauHoi { get; set; }
        public string maNd { get; set; }
        public int dapAnDung { get; set; }
        public List<DapAnDTO> dsDapAn { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Be_e_learning.Model
{
    public class NoiDung
    {
       public string maNd { get; set; }
       public string tieuDe { get; set; }
       public string moTa { get; set; }
       public int stt { get; set; }
       public string maCh { get; set; } 
       public string maLoaiNd { get; set; }
       public ChuongKhoaHoc chuongKhoaHoc { get; set; }
       public LoaiNoiDung loaiNoiDung { get; set; }
       public virtual Video video { get; set; }

       public virtual TracNghiem tracNghiem { get; set; }
      
    }
}

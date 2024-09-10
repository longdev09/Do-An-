using System;
using System.Collections;
using System.Collections.Generic;

namespace Be_e_learning.Model
{
    public class LichSuThanhToan
    {
       public string maLs { get; set; }
       public float? donGiaRut { get; set; }
       public DateTime ngayRut { get; set; }
       public DateTime? ngayThanhToan { get; set; }
       public string trangThai { get; set; }
       public string maGv { get; set; }

       public GiangVien giangViens { get; set; }   

    }




}

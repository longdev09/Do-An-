using System.Collections;
using System.Collections.Generic;

namespace Be_e_learning.Model
{
    public class GioHang
    {

        public string maGh {  get; set; }  
        public string maHv { get; set; }
        public float? tongTien { get; set; }
        public virtual HocVien hocVien { get; set; }

        public ICollection<ChiTietGioHang> chiTietGioHangs { get; set; }
        public GioHang() 
        {
            chiTietGioHangs = new HashSet<ChiTietGioHang>();
        
        }    
    }
}

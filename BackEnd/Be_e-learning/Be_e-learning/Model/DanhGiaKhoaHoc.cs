using System;

namespace Be_e_learning.Model
{
    public class DanhGiaKhoaHoc
    {

        public string maDanhGia {  get; set; }  
        public string maHv {  get; set; }   
        public string maKh { get; set; }
        public string noiDung { get; set; }
        public int? soSao {  get; set; }
        public DateTime ngayDg { get; set; }
        public KhoaHoc khoaHoc { get; set; }
        public HocVien hocVien { get; set; }
    }
}

namespace Be_e_learning.Model
{
    public class KhoaHocDaMua
    { 
        public string maKh { get; set; }
        public string maHv { get; set; }
        public int? tienTrinh { get; set; }

        public KhoaHoc khoaHoc { get; set; }
        public HocVien hocVien { get; set; }


    }
}

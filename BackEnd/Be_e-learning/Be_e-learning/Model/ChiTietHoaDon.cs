namespace Be_e_learning.Model
{
    public class ChiTietHoaDon
    {
       public string maHd {  get; set; }
       public string maKh { get; set; }
       public float? donGia { get; set; }

       public KhoaHoc khoaHoc { get; set; }
       public HoaDon hoaDon { get; set; }
    }
}

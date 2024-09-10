namespace Be_e_learning.Model
{
    public class ThongTinThanhToan
    {
        public string maTt { get; set; }
        public string tenNganHang { get; set; }
        public string logoNganHang { get; set; }
        public string stk { get; set; }
        public string nguoiThuHuong { get; set; }
        public string maGv { get; set; }
        public virtual GiangVien giangVien { get; set; }
    }
}

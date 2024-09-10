using Microsoft.AspNetCore.Http;

namespace Be_e_learning.DTO
{
    public class KhoaHocDTO
    {
        public string maKh { get; set; }
        public string tenKh { get; set; }
        public float? gia { get; set; }
        public IFormFile hinh { get; set; }
        public string gioiThieu { get; set; }
        public string trangThai { get; set; }
        public string ketQuaDatDuoc { get; set; }
        public string maGv { get; set; }
        public string maDm { get; set; }
    }
}

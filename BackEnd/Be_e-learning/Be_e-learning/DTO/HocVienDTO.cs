using Microsoft.AspNetCore.Http;
using System;

namespace Be_e_learning.DTO
{
    public class HocVienDTO
    {
        public string maHv { get; set; }
        public string hoTen { get; set; }
        public DateTime ngaySinh { get; set; }
        public IFormFile avata { get; set; }
        public string email { get; set; }
        public string sdt { get; set; }
        public string maNg { get; set; }
    }
}

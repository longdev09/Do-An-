using Be_e_learning.Model;
using Microsoft.AspNetCore.Http;
using System;

namespace Be_e_learning.DTO
{
    public class GiangVienDTO
    {
        public string maGv { get; set; }
        public string tenGv { get; set; }
        public DateTime? ngaySinh { get; set; }
        public string phai { get; set; }
        public string sdt { get; set; }
        public string email { get; set; }
        public string linhVuc { get; set; }
        public IFormFile avata { get; set; }
        public IFormFile matTruocCccd { get; set; }
        public IFormFile matSauCccd { get; set; }
        public string maNg { get; set; }
    }
}

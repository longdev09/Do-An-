using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Be_e_learning.DTO
{
    public class VideoDTO
    {
        public string maVideo { get; set; }
        public IFormFile video { get; set; }
        public string maNd { get; set; }
        public string tenFile { get; set; }
        public DateTime ngay { get; set; }

    }
}

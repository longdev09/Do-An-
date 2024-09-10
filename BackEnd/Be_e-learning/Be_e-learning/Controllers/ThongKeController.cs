using Be_e_learning.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace Be_e_learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThongKeController : ControllerBase
    {
        private readonly IThongKeService _thongKeService;
        public ThongKeController (IThongKeService thongKeService)
        {
            _thongKeService = thongKeService;
        }


        [Authorize(Roles = "VTGV")]
        [HttpGet]
        [Route("thong-ke-doanh-thu-giang-vien")]
        public IActionResult thongKeDoanhThuGiangVien(string ngayBd, string ngayKetThuc)
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value; // lay magv thong qua token
            DateTime dateTimeBd = DateTime.Parse(ngayBd, null, System.Globalization.DateTimeStyles.RoundtripKind);
            DateTime dateTimeKt = DateTime.Parse(ngayKetThuc, null, System.Globalization.DateTimeStyles.RoundtripKind);
            var tongTien = _thongKeService.tongThuNhapGiangVien(maGv, dateTimeBd, dateTimeKt);
            return Ok(tongTien);
        }



        [Authorize(Roles = "VTGV")]
        [HttpGet]
        [Route("thong-ke-doanh-thu-giang-vien-all")]
        public IActionResult thongKeDoanhThuGiangVienAll()
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value; // lay magv thong qua token
            var tongTien = _thongKeService.tongThuNhapGiangVienAll(maGv);
            return Ok(tongTien);
        }

        [Authorize(Roles = "VTGV")]
        [HttpGet]
        [Route("thong-ke-loi-nhuan-giang-vien-all")]
        public IActionResult thongKeLoiNhuanGiangVienAll()
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value; // lay magv thong qua token
            var tongTien = _thongKeService.tongLoiNhuanGiangVienAll(maGv);
            return Ok(tongTien);
        }


        [Authorize(Roles = "VTGV")]
        [HttpGet]
        [Route("thong-ke-loi-nhuan-giang-vien")]
        public IActionResult thongKeLoiNhuanGiangVien( string ngayBd, string ngayKetThuc)
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value; // lay magv thong qua token
            DateTime dateTimeBd = DateTime.Parse(ngayBd, null, System.Globalization.DateTimeStyles.RoundtripKind);
            DateTime dateTimeKt = DateTime.Parse(ngayKetThuc, null, System.Globalization.DateTimeStyles.RoundtripKind);
            var data = _thongKeService.thongKeLoiNhuan(maGv, dateTimeBd, dateTimeKt);
            return Ok(data);
        }





    }
}

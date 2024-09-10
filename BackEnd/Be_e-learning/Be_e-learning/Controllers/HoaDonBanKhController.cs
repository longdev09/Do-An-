using Be_e_learning.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Be_e_learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonBanKhController : ControllerBase
    {

        private readonly IHoaDonBanKhService _hoaDonBanKhService;
        public HoaDonBanKhController (IHoaDonBanKhService hoaDonBanKhService)
        {
            _hoaDonBanKhService = hoaDonBanKhService;
        }


        [Authorize(Roles = "VTGV")]
        [HttpGet]
        [Route("lay-danh-sach-hoa-don-mua-giang-vien")]
        public IActionResult gethoaDonMuaGiangVien()
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value;
            var hd =  _hoaDonBanKhService.getHoaDonBanKhGiangVien(maGv);
            return Ok(hd);
        }
    }
}

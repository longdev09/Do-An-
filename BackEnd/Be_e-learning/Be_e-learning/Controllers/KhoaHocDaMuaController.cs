using Be_e_learning.DTO;
using Be_e_learning.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Be_e_learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhoaHocDaMuaController : ControllerBase
    {
        private readonly IKhoaHocDaMuaService _khoaHocDaMuaService;
        public KhoaHocDaMuaController(IKhoaHocDaMuaService khoaHocDaMuaService)
        {
            _khoaHocDaMuaService = khoaHocDaMuaService;
        }


        [Authorize(Roles = "VTHV")]
        [HttpGet]
        [Route("lay-khoa-hoa-da-mua")]
        public IActionResult getKhocHoaDaMua()
        {
            var maHv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maHv")?.Value;
            var ds = _khoaHocDaMuaService.getKhoaHocDaMua(maHv);
            return Ok(ds);
        }

        [Authorize(Roles = "VTHV")]
        [HttpGet]
        [Route("lay-tien-do-hoc-tap")]
        public IActionResult getTienDoKhoahoc(string maKh)
        {
            var maHv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maHv")?.Value;
            int? tienDo = _khoaHocDaMuaService.getTienDoHocTap(maHv, maKh);
            return Ok(tienDo);
        }


        [Authorize(Roles = "VTHV")]
        [HttpPut]
        [Route("cap-nhat-tien-do-hoc-tap")]
        public IActionResult updateTienDoHocTap(string maKh, int tienDo)
        {
            var maHv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maHv")?.Value;
            int check = _khoaHocDaMuaService.updateTienDoKhoaHoc(maHv, maKh, tienDo);

            if (check > 0)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Cập nhật thành công",
                    data = null
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Cập nhật thất bại",
                data = null
            });
          
        }
    }
}

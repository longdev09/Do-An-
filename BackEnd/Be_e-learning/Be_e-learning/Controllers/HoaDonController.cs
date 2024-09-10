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
    public class HoaDonController : ControllerBase
    {
        private readonly IHoaDonService _hoaDonService;
        private readonly IKhoaHocDaMuaService _khoaHocDaMuaService;
        private readonly IGioHangService _gioHangService;

        public HoaDonController(IHoaDonService hoaDonService, IKhoaHocDaMuaService khoaHocDaMuaService, IGioHangService gioHangService) 
        {
            _hoaDonService = hoaDonService;
            _khoaHocDaMuaService = khoaHocDaMuaService;
            _gioHangService = gioHangService;   
        }

        [Authorize(Roles = "VTHV")]
        [HttpPost]
        [Route("tao-hoa-don")]
        public IActionResult createHoaDon([FromForm] HoaDonDTO hoaDonDTO)
        {

            var maHv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maHv")?.Value;
            hoaDonDTO.maHv = maHv;
            var maHd = _hoaDonService.createHoaDon(hoaDonDTO);
            if (maHd != null)
            {
                // tien hanh them vao kh hoc da mua
                _khoaHocDaMuaService.createKhoaHocDaMua(maHd, maHv);
                // lam trong gio hang
                _gioHangService.deleteGioHangMua(maHv, maHd);

                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Thanh toán thành công",
                    data = null
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Thanh toán thất bại",
                data = null
            });
        }

        [Authorize(Roles = "VTGV")]
        [HttpGet]
        [Route("lay-hoa-don-giang-vien")]
        public IActionResult getHoaDonGiangVien()
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value;
            var res = _hoaDonService.getHoaDonGiangVien(maGv);
            if(res != null)
            {

                return Ok(new ApiResponse
                {
                    success = true,
                    message = "lấy danh sách hóa đơn thành công !",
                    data = res
                });
            }

            return Ok(new ApiResponse
            {
                success = true,
                message = "lấy danh sách hóa đơn thất bại !",
                data = null
            });
        }


        [Authorize(Roles = "VTHV")]
        [HttpGet]
        [Route("lay-danh-sach-hoa-don-hoc-vien")]
        public IActionResult getDsHoaDonHocVien()
        {
            var maHv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maHv")?.Value;
            var res = _hoaDonService.getHoaDonHocVien(maHv);
            if (res != null)
            {

                return Ok(new ApiResponse
                {
                    success = true,
                    message = "lấy danh sách hóa đơn thành công !",
                    data = res
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "lấy danh sách hóa đơn thất bại !",
                data = null
            });

        }



        [HttpGet]
        [Route("lay-danh-sach-chi-tiet-hoa-don")]
        public IActionResult getChiTietHoaDon(string maHd)
        {
            var res = _hoaDonService.getChiTietHoaDon(maHd);
            if (res.Any())
            {

                return Ok(new ApiResponse
                {
                    success = true,
                    message = "lấy danh sách chi tiết hóa đơn thành công !",
                    data = res
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "lấy danh sách chi tiết hóa đơn thất bại !",
                data = null
            });
        }
    }
}

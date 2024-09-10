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
    public class GioHangController : ControllerBase
    {

        private readonly IGioHangService _gioHangService;
        public GioHangController(IGioHangService gioHangService)
        {
            _gioHangService = gioHangService;
        }


        [Authorize(Roles = "VTHV")]
        [HttpGet]
        [Route("lay-danh-sach-gio-hang-ma-hoc-vien")]
        public IActionResult getGioHangHocVien()
        {
            var maHv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maHv")?.Value;
            var res = _gioHangService.getAllGioHangHv(maHv);
            return Ok(res);
        }


        // tao gio hang va them khoa hoc vao chi tiet gio hang
        [Authorize(Roles = "VTHV")]
        [HttpPost]
        [Route("tao-gio-hang")]
        public IActionResult createGioHang([FromForm] GioHangDTO gioHangDTO)
        {
            var maHv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maHv")?.Value;
            int check = _gioHangService.createGioHang(maHv, gioHangDTO.maKh);

            if (check > 0)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Thêm giỏ hàng thành công!",
                    data = null
                });
            }
            if (check == -1) // tra ve va hien thi thong bao kho hoc da co trong gio
            {
                return Ok(new ApiResponse
                {
                    success = false,
                    message = "Khóa học đã được mua!",
                    data = null
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Thêm giỏ hàng thất bại!",
                data = null
            });
        }


        [Authorize(Roles = "VTHV")]
        [HttpDelete]
        [Route("xoa-khoa-hoc-gio")]
        public IActionResult deleteSanPhamGio(string maKh)
        {
            // lay ma hv gui kem theo token
            var maHv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maHv")?.Value;
            int check = _gioHangService.deleteGioHang(maHv, maKh);
            if (check > 0)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Xóa khóa học khỏi giỏ thành công!",
                    data = null
                });
            }
            return Ok(new ApiResponse
            {
                success = true,
                message = "Xóa khóa học khỏi giỏ thất bại!",
                data = null
            });

        }


    }
}

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
    public class DanhGiaKhoaHocController : ControllerBase
    {
        private readonly IDanhGiaKhoaHocService _danhGiaKhoaHocService;
        public DanhGiaKhoaHocController(IDanhGiaKhoaHocService danhGiaKhoaHocService)
        {
            _danhGiaKhoaHocService = danhGiaKhoaHocService;
        }

        [Authorize(Roles = "VTHV")]
        [HttpPost]
        [Route("tao-danh-gia-khoa-hoc")]
        public IActionResult createDanhGiaKhoaHoc([FromForm] DanhGiaKhoaHocDTO danhGiaKhoaHocDTO)
        {
            var maHv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maHv")?.Value;
            var res = _danhGiaKhoaHocService.createDanhGia(maHv, danhGiaKhoaHocDTO);
            if(res > 0)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Đánh giá khóa học thành công !",
                    data = null
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Đánh giá khóa học thất bại !",
                data = null
            });

        }


        [Authorize(Roles = "VTGV")]
        [HttpGet]
        [Route("lay-danh-sach-danh-gia-giang-vien")]
        public IActionResult getDsDanhGiaGiangVien()
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value;
            var res = _danhGiaKhoaHocService.getDanhGiaGiangVien(maGv);

            if (res != null)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Lấy danh sách đánh giá thành công",
                    data = res
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Lấy danh sách đánh giá thất bại",
                data = null
            });
        }

    }
}

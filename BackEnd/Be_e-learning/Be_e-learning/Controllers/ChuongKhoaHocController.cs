using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Be_e_learning.Services;
using Be_e_learning.Model;
using Be_e_learning.DTO;
namespace Be_e_learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChuongKhoaHocController : ControllerBase
    {
        private readonly IChuongKhoaHocService _chuongKhoaHoc;
        public ChuongKhoaHocController(IChuongKhoaHocService chuongKhoaHoc)
        {
            _chuongKhoaHoc = chuongKhoaHoc;
        }


        [HttpGet]
        [Route("lay-danh-sach-chuong-theo-ma-khoa-hoc")]
        public IActionResult getAllChuongMaKh (string maKh)
        {
            try {
                var res = _chuongKhoaHoc.getChuongMakh(maKh); 
                if(res != null)
                {
                    return StatusCode(StatusCodes.Status201Created, res); // Trả về mã 400 Bad Request nếu không thành công
                }
                else
                {
                    return StatusCode(StatusCodes.Status400BadRequest, res); // Trả về mã 400 Bad Request nếu không thành công
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("tao-chuong")]
        public  IActionResult createChuong ( ChuongKhoaHoc chuongKhoaHoc)
        {

            try
            {
                var res = _chuongKhoaHoc.createChuong(chuongKhoaHoc);
                if (res != null) // Kiểm tra kết quả trả về từ createChuong
                {
                    /*eturn Ok(new { status = StatusCodes.Status201Created, data = res });*/
                    return StatusCode(StatusCodes.Status201Created, res); // Trả về mã 400 Bad Request nếu không thành công
                }
                else
                {
                    return StatusCode(StatusCodes.Status400BadRequest); // Trả về mã 400 Bad Request nếu không thành công
                }
            }
            catch
            {
                return BadRequest();
            }
           
        }

        [HttpPut]
        [Route("cap-nhat-chuong")]
        public IActionResult updateChuong ([FromForm] ChuongKhoaHoc chuongKhoaHoc)
        {
            try
            {
                _chuongKhoaHoc.updateChuong(chuongKhoaHoc);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpDelete]
        [Route("xoa-chuong")]
        public IActionResult deleteChuong(string maCh)
        {
            int check = _chuongKhoaHoc.deleteChuong(maCh);
            if (check > 0)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Xóa chương thành công",
                 
                });
            }
            return Ok(new ApiResponse
            {
                success = true,
                message = "Xóa chương thất bại",

            });
        }

    }
}

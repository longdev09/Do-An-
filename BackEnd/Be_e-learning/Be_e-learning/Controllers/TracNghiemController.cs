using Be_e_learning.DTO;
using Be_e_learning.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Be_e_learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TracNghiemController : ControllerBase
    {
        private readonly ITracNghiemService _tracnghiemService;
        public TracNghiemController(ITracNghiemService tracnghiemService)
        {
            _tracnghiemService = tracnghiemService;
        }

        [HttpPost]
        [Route("tao-trac-nghiem")]
        public IActionResult createTracNghiem([FromForm] TracNghiemDTO tracNghiemDTO)
        {
            int check  = _tracnghiemService.createTracNghiem(tracNghiemDTO);
            if(check > 0)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Tạo trắc nghiệm thành công",
                    data = null
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Tạo trắc nghiệm thất bại",
                data = null
            });
        }

        [HttpGet]
        [Route("lay-trac-nghiem")]
        public IActionResult getTracNghiem(string maNd)
        {
            var tracNghiem = _tracnghiemService.getTracNghiem(maNd);
            if(tracNghiem != null)
            {
                return Ok(new ApiResponse
                {
                    success = true,             
                    data = tracNghiem
                });
            }

            return Ok(new ApiResponse
            {
                success = false,             
                data = null
            });
        }
    }
}

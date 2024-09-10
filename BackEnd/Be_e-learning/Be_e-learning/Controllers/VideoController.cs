using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Be_e_learning.Services;
using Be_e_learning.DTO;
using Be_e_learning.FireBase;
using Be_e_learning.Model;
using Be_e_learning.RadomKey;
using Microsoft.AspNetCore.Authorization;
using Xabe.FFmpeg;
namespace Be_e_learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly IVideoService _videoService;
        public VideoController(IVideoService videoService)
        {
            _videoService = videoService;
        }


        [HttpGet]
        [Route("lay-video-theo-ma-noi-dung")]
        public IActionResult getVideo(string maNd)
        {
            var res = _videoService.getVideoMaNd(maNd);
            if(res != null)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Lấy video thành công",
                    data = res
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Lấy video thất bại",
                data = res
            });
        }


        [Authorize(Roles = "VTGV")]
        [HttpPost]
        [Route("tao-video")]
        public async Task<IActionResult> createVideo(string maKh, [FromForm] VideoDTO video )
        {
            var maGv = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "maGv")?.Value;
            string folderName = maGv + "/" + maKh + "/video" + "/" + video.maNd;
            string maVd = RandomKey.randomMa("V");
            string ulrVideo = await UploadFireBase.upLoadVideo_Storage(video.video, folderName, maVd);

            
            var res = _videoService.createVideo(maVd, ulrVideo, video);
            if (res != null)
            {
                return Ok(new ApiResponse
                {
                    success = true,
                    message = "Tải lên video thành công",
                    data = res
                });
            }
            return Ok(new ApiResponse
            {
                success = false,
                message = "Tải lên video thất bại",
                data = "null"
            }); 
        }
    }
}

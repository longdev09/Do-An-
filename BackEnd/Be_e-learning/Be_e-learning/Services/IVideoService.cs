using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Be_e_learning.Model;
using Be_e_learning.DTO;
using static Org.BouncyCastle.Asn1.Cmp.Challenge;
namespace Be_e_learning.Services
{
    public interface IVideoService
    {
        Video createVideo(string maVd, string ulr, VideoDTO video);
        Video getVideoMaNd (string maNd);

    }
    public class VideoServices : IVideoService
    {
        public readonly DataContext _dataContext;

        public VideoServices(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public Video createVideo(string maVd, string ulr, VideoDTO video)
        {
            Video video1 = new Video();
            video1.maVideo = maVd;
            video1.tenFile = video.tenFile;
            video1.videoUlr = ulr;
            video1.maNd = video.maNd;
            video1.ngay = new DateTime();
            _dataContext.videos.Add(video1);
            _dataContext.SaveChanges();
            return video1;
           
        }

        // ra 1 video theo ma noi dung
        public Video getVideoMaNd(string maNd)
        {
            var video = _dataContext.videos.Where(t => t.maNd == maNd).FirstOrDefault();
            return video;
        }
    }
}

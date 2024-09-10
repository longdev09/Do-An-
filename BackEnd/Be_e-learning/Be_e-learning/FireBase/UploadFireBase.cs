using Firebase.Storage;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Be_e_learning.FireBase
{
    public class UploadFireBase
    {

        public UploadFireBase()
        {

        }

        public static async Task<string> upLoadImg_Storage(IFormFile imageFile, string folderName, string nameFile)
        {
            
                // Khởi tạo FirebaseStorage với tên bucket của Firebase Storage
                var storage = new FirebaseStorage("app-e-learning-3f826.appspot.com");

                // Đọc dữ liệu của ảnh vào một mảng byte
                using (var memoryStream = new MemoryStream())
                {
                    await imageFile.CopyToAsync(memoryStream);
                    byte[] imageBytes = memoryStream.ToArray();

                // Lấy tên tệp gốc từ IFormFile
                    string fileName = Path.GetFileName(imageFile.FileName);
                    string path = $"{folderName}/{nameFile}.jpg";

                    // Tạo một MemoryStream từ mảng byte
                    using (var imageStream = new MemoryStream(imageBytes))
                    {
                        // Tải ảnh lên Firebase Storage
                        var uploadTask = await storage.Child(path).PutAsync(imageStream);

                        // Lấy URL của ảnh đã tải lên
                        string imageUrl = await storage.Child(path).GetDownloadUrlAsync();

                        return imageUrl;
                    }
                }
            
            
        }





        public static async Task<string> upLoadVideo_Storage(IFormFile videoFile, string folderName, string fileName)
        {
            try
            {
                // Khởi tạo FirebaseStorage với tên bucket của Firebase Storage
                var storage = new FirebaseStorage("app-e-learning-3f826.appspot.com");

                // Đọc dữ liệu từ IFormFile và chuyển đổi thành mảng byte
                using (var stream = new MemoryStream())
                {
                    await videoFile.CopyToAsync(stream);
                    byte[] videoBytes = stream.ToArray();

                    // Đường dẫn đến file trên Firebase Storage
                    string path = $"{folderName}/{fileName}.mp4"; // Giả sử video có định dạng MP4

                    // Tải lên dữ liệu video lên Firebase Storage
                    using (var byteStream = new MemoryStream(videoBytes))
                    {
                        var uploadTask = await storage.Child(path).PutAsync(byteStream);

                        // Lấy URL public của video từ Firebase Storage
                        string videoUrl = await storage.Child(path).GetDownloadUrlAsync();

                        return videoUrl;
                    }
                }
            }
            catch (Exception ex)
            {
                // Trong trường hợp xảy ra lỗi, trả về một phản hồi lỗi (Internal Server Error) với thông điệp lỗi
                return "Loi upload";
            }
        }

        //public static async Task<string> FirebaseShortLink(string longLink)
        //{
        //    //FirebaseApp.Create(new AppOptions
        //    //{
        //    //    Credential = GoogleCredential.FromFile("your-firebase-admin-sdk.json"),
        //    //});

        //    //var dynamicLink = await FirebaseAdmin.DynamicLinks.DynamicLinks.CreateAsync(
        //    //    new Uri(longLink),
        //    //    new FirebaseAdmin.DynamicLinks.DynamicLinkOptions { ShortDynamicLinkPathLength = ShortDynamicLinkPathLength.Short });

        //    //return dynamicLink.ShortLink.ToString();
        //}




    }
}

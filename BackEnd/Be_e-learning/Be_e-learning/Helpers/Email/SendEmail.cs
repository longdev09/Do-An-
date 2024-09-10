using MimeKit;
using System;
using MailKit.Net.Smtp;
using System.Linq;
namespace Be_e_learning.Helpers.Email
{
    public class SendEmail
    {

       
        public static void guiEmailXacThucTkGv(string emailTo,  string tenGv, string matKhau)
        {

    
            string htmlContent = $@"
                <div style='border: 1px solid #ddd; width: 600px;'>
                    <div style='border-bottom: 1px solid #ddd; background-color: #ddd; padding: 10px;'>
                        <h1 style='color: rgb(43, 192, 226); margin: 0; text-align: center;'>LearnC ACADEMY</h1>
                    </div>
                    <div style='padding: 10px 20px;'>
                        <h3 style='text-align: center;'>👋 Xin chào {tenGv}</h3>
                        <div>
                            <p>Kính gửi khách hàng {tenGv.ToUpper()}</p>
                            <p>Chân thành cảm ơn bạn đã đăng ký trở thành giảng viên của LearnC ACADEMY. Thông tin <b>bạn đã được chấp nhận</b> và dưới đây là thông tin về tài khoản đăng nhập của bạn:</p>
                        </div>
                        <div>
                            <table style='border-collapse: collapse; width: 100%;'>
                                <tbody>
                                    <tr>
                                        <td style='border: 1px solid #ddd; padding: 8px; text-align: left;'>Tên đăng nhập</td>
                                        <td style='border: 1px solid #ddd; padding: 8px; text-align: left;'>{emailTo}</td>
                                    </tr>
                                    <tr>
                                        <td style='border: 1px solid #ddd; padding: 8px; text-align: left;'>Mật khẩu</td>
                                        <td style='border: 1px solid #ddd; padding: 8px; text-align: left;'>{matKhau}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style='margin-top: 20px; display: flex; justify-content: center;'>
                            <a href='https://your-login-page.com' style='padding: 20px; background-color: aquamarine; text-decoration: none; color: black; text-align: center; width: 300px;'>Đăng Nhập Tại Đây</a>
                        </div>
                        <div style='margin-top: 100px;'>
                            <p style='margin: 0;'>Trân trọng.</p>
                            <p>------------------------------------------------------------------------</p>
                        </div>
                        <div style='text-align: center; font-size: 10px;'>
                            Copyright longDev, All rights reserved.
                        </div>
                    </div>
                </div>";
            // Thông tin tài khoản email của bạn
            string emailFrom = "longbachnguyen09dev@gmail.com";
            string password = "ybpqdhxhcpsudgth";

            // Thông tin người nhận email

            // Tạo đối tượng MimeMessage
            MimeMessage message = new MimeMessage();
            message.From.Add(new MailboxAddress("LearnC", emailFrom));
            message.To.Add(new MailboxAddress("Recipient Name", emailTo));
            message.Subject = "Thông tin đăng ký tài khoản giảng viên của bản đã được duyệt";

            // Tạo đối tượng TextPart với nội dung của email
            TextPart textPart = new TextPart("html")
            {
                Text = htmlContent
            };

            // Thêm TextPart vào MimeMessage
            message.Body = textPart;

            // Cấu hình thông tin máy chủ SMTP
            using (SmtpClient client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, false);
                client.Authenticate(emailFrom, password);

                // Gửi email
                client.Send(message);
                client.Disconnect(true);
            }

            Console.WriteLine("Email sent successfully.");
        }
    }
}

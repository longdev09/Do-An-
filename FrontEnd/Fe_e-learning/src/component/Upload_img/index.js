import React, { useState } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

function MyUpload({ onDataSubmit }) {
  const [imageUrl, setImageUrl] = useState(null);
  const handleImageUpload = async (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setImageUrl(e.target.result);
        // Chuyển đổi hình ảnh thành chuỗi base64
        const base64Image = await convertImageToBase64(info.file.originFileObj);
        // Gửi chuỗi base64 lên server
        onDataSubmit(base64Image);
      };
      reader.readAsDataURL(info.file.originFileObj);
      message.success(`uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(` upload failed.`);
    }
  };

  // Hàm chuyển đổi hình ảnh thành chuỗi base64
  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(imageFile);
    });
  };

  return (
    <div>
      <Upload.Dragger
        accept="image/*"
        customRequest={({ file, onSuccess }) =>
          setTimeout(() => onSuccess("ok"), 0)
        }
        maxCount={1}
        onChange={handleImageUpload}
      >
        {imageUrl ? (
          <div>
            <h3>Uploaded Image:</h3>
            <img src={imageUrl} alt="uploaded" style={{ maxWidth: "100%" }} />
          </div>
        ) : (
          <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Nhấp hoặc kéo tệp vào khu vực này để tải lên
            </p>
            <p className="ant-upload-hint">Tải lên ảnh đại diện cho khóa học</p>
          </>
        )}
      </Upload.Dragger>
    </div>
  );
}

export default MyUpload;

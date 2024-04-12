'use client';

import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import { getAxios } from '@/app/api/axios';
// import axios from 'axios';

export default function Page() {
  // 生成文件名，作为 key 使用
  const generateFileName = (ossData, file) => {
    console.log(ossData, file);
    const filename = Date.now() + file;
    return ossData.dir + filename;
  };

  const handleChange = (info: any) => {
    fetch('http://localhost:3000/oss/singnature', {
      method: 'GET',
    })
      .then((res) => {
        res.json();
      })
      .then(async (data) => {
        const ossDate = data.data;
        const key = generateFileName(ossDate, info.file.name);
        const formDate = new FormData();
        formDate.append('key', key);
        formDate.append('OSSAccessKeyId', ossDate.accessId);
        formDate.append('policy', ossDate.policy);
        formDate.append('success_action_status', '200');
        formDate.append('signature', ossDate.signature);
        formDate.append('file', info.file);
        // const res = await axios.post(ossDate.host, formDate);
        const res = await fetch(ossDate.host, {
          method: 'POST',
          body: formDate,
        });
        console.log('res', res);
        if (res.status === 200) {
          alert('文件上传成功');
        }
      });
  };

  return (
    <Upload onChange={handleChange} beforeUpload={() => false}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
}

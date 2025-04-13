import {DocumentPickerResponse} from '@react-native-documents/picker';
import {Attachment} from '../models/TaskModel';
import { CLOUDINARY_URL, UPLOAD_PRESET } from '../../cloudinary.config';
import axios from 'axios';

export const asyncSequentialMap = async (arr: DocumentPickerResponse[]) => {
  const results: Attachment[] = [];

  for (const item of arr) {
    const result = await handleUploadFileToClodinary(item);
    results.push({
      name: item.name ?? '',
      size: item.size ?? 0,
      url: result,
    });
  }
  return results;
};

export const handleUploadFileToClodinary = async (file: DocumentPickerResponse) => {
//   setIsLoading(true);
//   const items = [...taskDetail.attachments];
  const items = [];
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', UPLOAD_PRESET);

  try {
    const res = await axios.post(CLOUDINARY_URL, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    items.push({
      name: file.name ?? '',
      size: file.size ?? 0,
      url: res.data.secure_url,
    });
    // handleChangeValue('attachments', items);
    console.log(items);
    return res.data.secure_url;
  } catch (err: any) {
    console.error('Upload attachments failed:', err.message);
  } finally {
    setIsLoading(false);
  }
};
function setIsLoading(arg0: boolean) {
    throw new Error('Function not implemented.');
}


import {Slider} from '@miblanchard/react-native-slider';
import {DocumentPickerResponse, pick} from '@react-native-documents/picker';
import axios from 'axios';
import {DocumentUpload} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Dimensions, Modal, TouchableOpacity, View} from 'react-native';
import {CLOUDINARY_URL, UPLOAD_PRESET} from '../../cloudinary.config';
import {colors} from '../contants/colors';
import {fontFamilies} from '../contants/fontFamilies';
import {Attachment} from '../models/TaskModel';
import {globalStyles} from '../styles/globalStyles';
import {bytesToMB} from '../utils/bytesToMB';
import RowComponent from './RowComponent';
import SpaceConponent from './SpaceConponent';
import TextComponent from './TextComponent';
import TitleComponent from './TitleComponent';

interface Props {
  onUpload: (file: Attachment) => void;
}

const UploadFileComponent = (props: Props) => {
  const {onUpload} = props;
  const [visibleModalUpload, setVisibleModalUpload] = useState(false);
  const [file, setFile] = useState<DocumentPickerResponse>();
  const [progressUpload, setProgressUpload] = useState(0);
  const [attachment, setAttachment] = useState<Attachment>();

  useEffect(() => {
    file && handleUploadFileToClodinary(file);
  }, [file]);

  useEffect(() => {
    attachment && onUpload(attachment);
  }, [attachment]);

  const handleUploadFileToClodinary = async (file: DocumentPickerResponse) => {
    setVisibleModalUpload(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', UPLOAD_PRESET);
    let lastPercent = 0;

    try {
      const res = await axios.post(CLOUDINARY_URL, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: any) => {
          if (progressEvent.total) {
            const percent = Math.floor((progressEvent.loaded / progressEvent.total));
            if (percent !== lastPercent) {
              lastPercent = percent;
              setProgressUpload(percent);
              console.log(`Upload Progress: ${percent}%`);
            }
          }
        },
      });

      const dataAtt: Attachment = {
        name: file.name ?? '',
        url: res.data.secure_url,
        size: file.size ?? 0,
      };

      setAttachment(dataAtt);
      return res.data.secure_url;
    } catch (err: any) {
      console.error('Upload attachments failed:', err.message);
    } finally {
      setVisibleModalUpload(false);
    }
  };

  const handlePickerDocument = async () => {
    try {
      const result = await pick({
        mode: 'open',
      });
      setFile(result[0]);
    } catch (error: any) {
      console.log(`handlePickerDocument error: ${error.message}`);
    }
  };
  return (
    <>
      <TouchableOpacity onPress={handlePickerDocument}>
        <DocumentUpload size={22} color={colors.white} />
      </TouchableOpacity>
      <Modal
        visible={visibleModalUpload}
        transparent
        animationType="slide"
        style={{flex: 1}}>
        <View
          style={[
            globalStyles.container,
            {
              flex: 1,
              backgroundColor: `${colors.gray}80`,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <View
            style={{
              width: Dimensions.get('window').width * 0.8,
              padding: 20,
              borderRadius: 12,
              backgroundColor: colors.white,
            }}>
            <TitleComponent
              text="Uploading..."
              color={colors.bgColor}
              flex={0}
            />
            <SpaceConponent height={12} />
            <View>
              <TextComponent
                text={file?.name ?? ''}
                color={colors.bgColor}
                flex={0}
              />
              <TextComponent
                text={`${bytesToMB(file?.size as number)} MB`}
                color={colors.gray2}
                flex={0}
              />
            </View>
            <RowComponent>
              <View style={{flex: 1, marginRight: 12}}>
                <Slider
                  value={progressUpload}
                  thumbTintColor={colors.success}
                  renderThumbComponent={() => <></>}
                  trackStyle={{height: 6, borderRadius: 100}}
                  minimumTrackTintColor={colors.success}
                  maximumTrackTintColor={colors.desc}
                />
              </View>
              <TextComponent
                text={`${progressUpload * 100}%`}
                color={colors.bgColor}
                flex={0}
                font={fontFamilies.bold}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default UploadFileComponent;

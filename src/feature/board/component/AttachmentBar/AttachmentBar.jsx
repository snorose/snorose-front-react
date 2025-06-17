import { React, useRef } from 'react';
import { useState } from 'react';

import { useToast } from '@/shared/hook';
import { Icon } from '@/shared/component';

import styles from './AttachmentBar.module.css';

export default function AttachmentBar({ setAttachmentsInfo }) {
  const { toast } = useToast();
  const img = useRef();
  const vid = useRef();
  const changeImageUpload = async (e) => {
    //files는 binary file list-> 사진 파일 그자체의 배열, JS에서는 File Object List가 됨
    const newFiles = e.target.files;
    console.log(newFiles);

    const maxFileSize = 50 * 1024 * 1024; //50MB
    let totalFileSize = 0;

    //인풋된 파일들 읽기
    //shallow copy 만들기
    const newFileArray = Array.from(newFiles);

    newFileArray.map((file) => {
      setAttachmentsInfo((attArray) => [
        ...attArray,
        {
          fileName: `${file.name}`,
          fileComment: '',
          fileType: file.type,
          type: 'PHOTO',
          //New Code
          file: file,
          id: '',
        },
      ]);
    });
  };
  const changeVideoUpload = async (e) => {
    const newFiles = e.target.files;
    console.log(newFiles);

    const maxFileSize = 50 * 1024 * 1024; //50MB
    let totalFileSize = 0;

    //인풋된 파일들 읽기
    //shallow copy 만들기
    const newFileArray = Array.from(newFiles);

    newFileArray.map((file) => {
      setAttachmentsInfo((attArray) => [
        ...attArray,
        {
          fileName: file.name,
          fileComment: '',
          fileType: file.type,
          type: 'VIDEO',
          //New Code
          file: file,
          id: '',
        },
      ]);
    });
  };
  const [imageIconState, setImageIconState] = useState('image');
  const [videoIconState, setVideoIconState] = useState('video');

  return (
    <div className={styles.bar}>
      <div className={styles.attachmentBar}>
        <Icon
          id={imageIconState}
          width={24}
          height={24}
          className={styles.image}
          onClick={() => {
            //이거 고치기
            setImageIconState('image-fill');
            img.current.click();
          }}
          onMouseOver={() => setImageIconState('image-fill')}
          onMouseLeave={() => setImageIconState('image')}
        />
        <input
          type='file'
          accept='image/*'
          className={styles.imageInput}
          ref={img}
          onChange={changeImageUpload}
          multiple
        />
        <Icon
          id={videoIconState}
          width={24}
          height={24}
          onClick={() => {
            setVideoIconState('video-fill');
            vid.current.click();
          }}
          onMouseOver={() => setVideoIconState('video-fill')}
          onMouseLeave={() => setVideoIconState('video')}
        />
        <input
          type='file'
          accept='video/*'
          className={styles.videoInput}
          ref={vid}
          onChange={changeVideoUpload}
          multiple
        />
      </div>
    </div>
  );
}

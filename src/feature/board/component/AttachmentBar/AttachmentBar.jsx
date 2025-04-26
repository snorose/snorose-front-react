import { React, useRef } from 'react';
import { useState } from 'react';

import { useToast } from '@/shared/hook';
import { Icon } from '@/shared/component';

import styles from './AttachmentBar.module.css';

export default function AttachmentBar({
  setAttachmentsInfo,
  setDataUrlImages,
  files,
  setFiles,
}) {
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
    const updated = [...files, ...newFileArray];
    console.log(updated);
    //첨부파일 개수 제한
    if (updated.length > 10) {
      toast('사진은 최대 10장까지만 첨부할 수 있습니다.');
      return;
    }

    //첨부파일 용량 제한
    for (let file of updated) {
      totalFileSize = totalFileSize + file.size;
    }
    if (totalFileSize > maxFileSize) {
      toast('최대 50MB까지만 첨부할 수 있습니다.');
      return;
    }

    setFiles(updated);

    const readFilesAsDataURLs = newFileArray.map((file) => {
      //attachmentsInfo state에 데이터 넣기
      setAttachmentsInfo((attArray) => [
        ...attArray,
        {
          fileName: file.name,
          fileComment: '',
          fileType: file.type,
          type: 'PHOTO',
        },
      ]);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
      });
    });

    const imageDataUrls = await Promise.all(readFilesAsDataURLs);
    setDataUrlImages((imgArray) => [...imgArray, ...imageDataUrls]);
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
          multiple
        />
      </div>
    </div>
  );
}

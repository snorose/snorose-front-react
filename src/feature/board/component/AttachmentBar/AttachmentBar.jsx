import { React, useRef, useState } from 'react';

import { Icon } from '@/shared/component';
import { useToast } from '@/shared/hook';
import { TOAST } from '@/shared/constant';

import styles from './AttachmentBar.module.css';

export default function AttachmentBar({ attachmentsInfo, setAttachmentsInfo }) {
  const { toast } = useToast();
  const img = useRef();
  const vid = useRef();

  //이미지*영상 첨부 버튼의 UI 상태를 좌우함
  const [isImageIconHighlighted, setIsImageIconHighlighted] = useState(false);
  const [isVideoIconHighlighted, setIsVideoIconHighlighted] = useState(false);

  //이미지*영상 개수 및 용량 제한 정책
  const attachmentFileSizeLimit = {
    imageFileSize: 5 * 1024 * 1024, //MB
    imageQuantity: 10,
    videoFileSize: 50 * 1024 * 1024,
    videoQuantity: 1,
  };

  const changeImageUpload = async (e) => {
    const newFiles = e.target.files;
    //이미지 첨부 개수 제한
    if (
      attachmentsInfo.filter((att) => att.type === 'PHOTO').length +
        newFiles.length >
      attachmentFileSizeLimit.imageQuantity
    ) {
      toast(TOAST.ATTACHMENT.imageQuantityError);
      return;
    }

    //이미지 용량 제한
    const newFileArray = Array.from(newFiles).filter(
      (file) => file.size <= attachmentFileSizeLimit.imageFileSize
    );
    if (newFiles.length > newFileArray.length) {
      toast(TOAST.ATTACHMENT.imageFileSizeError);
    }

    //새로 선택한 이미지들을 attachmentsInfo 리스트 맨 뒤에 추가해주기
    newFileArray.map((file) => {
      setAttachmentsInfo((attArray) => [
        ...attArray,
        {
          fileName: `${file.name}`,
          fileComment: '',
          fileType: file.type,
          type: 'PHOTO',
          file: file,
          id: '',
        },
      ]);
    });

    //같은 파일 선택할 시 함수가 트리거되지 않는 것을 방지함
    e.target.value = null;
  };

  const changeVideoUpload = async (e) => {
    const newFiles = e.target.files;
    //영상 첨부 개수 제한
    if (
      attachmentsInfo.filter((att) => att.type === 'VIDEO').length +
        newFiles.length >
      attachmentFileSizeLimit.videoQuantity
    ) {
      toast(TOAST.ATTACHMENT.videoQuantityError);
      return;
    }

    //영상 용량 제한
    const newFileArray = Array.from(newFiles).filter(
      (file) => file.size <= attachmentFileSizeLimit.videoFileSize
    );
    if (newFiles.length > newFileArray.length) {
      toast(TOAST.ATTACHMENT.videoFileSizeError);
    }

    //새로 선택한 영상들을 attachmentsInfo 리스트 맨 뒤에 추가해주기
    newFileArray.map((file) => {
      setAttachmentsInfo((attArray) => [
        ...attArray,
        {
          fileName: file.name,
          fileComment: '',
          fileType: file.type,
          type: 'VIDEO',
          file: file,
          id: '',
        },
      ]);
    });

    //같은 파일 선택할 시 함수가 트리거되지 않는 것을 방지함
    e.target.value = null;
  };

  return (
    <div className={styles.bar}>
      <div className={styles.attachmentBar}>
        <Icon
          id={isImageIconHighlighted ? 'image-fill' : 'image'}
          width={24}
          height={24}
          className={styles.image}
          onClick={() => {
            img.current.click();
          }}
          onMouseOver={() => setIsImageIconHighlighted(true)}
          onMouseLeave={() => setIsImageIconHighlighted(false)}
        />
        <input
          type='file'
          accept='.jpg, .jpeg, .jfif, .png, .webp, .bmp'
          className={styles.imageInput}
          ref={img}
          onChange={changeImageUpload}
          multiple
        />
        <Icon
          id={isVideoIconHighlighted ? 'video-fill' : 'video'}
          width={24}
          height={24}
          onClick={() => {
            vid.current.click();
          }}
          onMouseOver={() => setIsVideoIconHighlighted(true)}
          onMouseLeave={() => setIsVideoIconHighlighted(false)}
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

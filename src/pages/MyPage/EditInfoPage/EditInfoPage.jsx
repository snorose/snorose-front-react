import styles from './EditInfoPage.module.css';
import { useState } from 'react';
import { Icon } from '../../../components/Icon';
import { BackAppBar, ActionButton } from '../../../components/AppBar';
import { CategoryFieldset, Dropdown } from '../../../components/Fieldset';
import { MAJORS } from '../../../constants';

export default function EditInfoPage() {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [nameError, setNameError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [major, setMajor] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  const specialCharRegex = /[!@#\$%\^\&*\)\(+=._-]/;
  const emojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF]+/g;

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    if (specialCharRegex.test(value) || emojiRegex.test(value)) {
      setNameError('특수문자는 사용할 수 없습니다');
    } else {
      setNameError('');
    }
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);

    if (specialCharRegex.test(value) || emojiRegex.test(value)) {
      setNicknameError('특수문자는 사용할 수 없습니다');
    } else {
      setNicknameError('');
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleBirthdateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 5) {
      value =
        value.slice(0, 4) + '. ' + value.slice(4, 6) + '. ' + value.slice(6, 8);
    } else if (value.length >= 3) {
      value = value.slice(0, 4) + '. ' + value.slice(4, 6);
    }
    e.target.value = value;
  };

  return (
    <main className={styles.editInfoPage}>
      <header className={styles.topContainer}>
        <div>
          <BackAppBar />
        </div>
        <div className={styles.submitBtn}>
          <ActionButton>완료</ActionButton>
        </div>
      </header>

      <section className={styles.profileContainer}>
        <div className={styles.profileImgContainer}>
          <div
            className={styles.profileImg}
            onClick={() => document.getElementById('profileImageInput').click()}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt='프로필'
                className={styles.profilePreview}
              />
            ) : (
              <Icon id='profile-basic-camera' />
            )}
          </div>
          <input
            type='file'
            id='profileImageInput'
            style={{ display: 'none' }}
            accept='image/*'
            onChange={handleProfileImageChange}
          />
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.infoWrapper}>
            <h3 className={styles.title}>이름</h3>
            <div
              className={`${styles.inputWrapper} ${nameError ? styles.errorInputWrapper : ''}`}
            >
              <input
                type='text'
                className={`${styles.inputText} ${nameError ? styles.errorInputText : ''}`}
                placeholder='이름을 입력하세요'
                value={name}
                onChange={handleNameChange}
              />
            </div>
            {nameError && <p className={styles.errorMessage}>{nameError}</p>}
          </div>
          <div className={styles.infoWrapper}>
            <h3 className={styles.title}>생년월일</h3>
            <div className={styles.inputWrapper}>
              <input
                type='text'
                className={styles.inputText}
                placeholder='2000. 01. 01'
                maxLength={12}
                onChange={handleBirthdateChange}
                pattern='\d{4}\.\d{2}\.\d{2}'
                title='형식: YYYY.MM.DD (예: 2000. 01. 01)'
              />
            </div>
          </div>
          <div className={styles.infoWrapper}>
            <h3 className={styles.title}>닉네임</h3>
            <div
              className={`${styles.inputWrapper} ${nicknameError ? styles.errorInputWrapper : ''}`}
            >
              <input
                type='text'
                className={`${styles.inputText} ${nicknameError ? styles.errorInputText : ''}`}
                placeholder='닉네임을 입력하세요'
                value={nickname}
                onChange={handleNicknameChange}
              />
            </div>
            {nicknameError && (
              <p className={styles.errorMessage}>{nicknameError}</p>
            )}
          </div>
        </div>
      </section>
      <CategoryFieldset title='전공' required>
        <Dropdown
          options={MAJORS}
          select={major}
          setFn={setMajor}
          placeholder='선택하세요'
        />
      </CategoryFieldset>
    </main>
  );
}

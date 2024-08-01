import React, { useState } from 'react';
import styles from './MyPage.module.css';
import Icon from '../../../components/Icon/Icon';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <main className={styles.myPage}>
      <div className={styles.myPageUpper}>
        <div className={styles.logoOverlay}></div>
      </div>

      <div className={styles.profileImage}>
        <Icon id='profile-basic' />
      </div>

      <div className={styles.myPageLower}>
        <div className={styles.myInfo}>
          <div className={styles.name}>힘하리</div>
          <div className={styles.studentIdMemberType}>
            <div className={styles.studentId}>17학번</div>
            <Icon id='middle-dot' />
            <div className={styles.memberType}>정회원</div>
          </div>
          <div className={styles.pointWrapper}>
            <div className={styles.point}>
              <Icon id='point-circle' />
              39
            </div>
            <Link to='view-point-list'>
              <a className={styles.pointList}>
                포인트 내역 보기
                <Icon id='arrow-text-blue' />
              </a>
            </Link>
          </div>
        </div>

        <div className={styles.tabMenu}>
          <div
            className={`${styles.tab} ${activeTab === 'account' ? styles.active : ''}`}
            onClick={() => {
              setActiveTab('account');
            }}
          >
            계정 정보
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'activity' ? styles.active : ''}`}
            onClick={() => {
              setActiveTab('activity');
            }}
          >
            내 활동
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'guide' ? styles.active : ''}`}
            onClick={() => setActiveTab('guide')}
          >
            이용 안내
          </div>
        </div>

        {activeTab === 'account' && (
          <>
            <div className={styles.infoWrapper}>
              {[
                { label: '아이디', value: 'suen0904' },
                { label: '이메일', value: 'suen0904@sookmyung.ac.kr' },
                { label: '학번', value: '17123123' },
                { label: '전공', value: '시각영상디자인과' },
                { label: '생년월일', value: '1996. 01. 01' },
              ].map((info, index) => (
                <div className={styles.info} key={index}>
                  <div className={styles.label}>{info.label}</div>
                  <div className={styles.value}>{info.value}</div>
                </div>
              ))}
            </div>

            <div className={styles.buttonWrapper}>
              <Link to='edit-info'>
                <div className={styles.editButton}>내 정보 수정</div>
              </Link>
              <Link to='password'>
                <div className={styles.passwordButton}>비밀번호 변경</div>
              </Link>
            </div>
          </>
        )}

        {activeTab === 'activity' && (
          <>
            <div className={styles.infoWrapper}>
              {[
                '내 글 모아보기',
                '댓글 닷 글 모아보기 ',
                '다운 받은 시험 후기 모아보기',
              ].map((item) => (
                <div className={styles.ItemWrapper} key={item}>
                  <span>{item}</span>
                  <Icon id='arrow-text-grey'></Icon>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'guide' && (
          <>
            <div className={styles.infoWrapper}>
              {['개인정보 처리 방침', '서비스 이용 약관'].map((item) => (
                <div className={styles.ItemWrapper} key={item}>
                  <span>{item}</span>
                  <Icon id='arrow-text-grey'></Icon>
                </div>
              ))}
            </div>

            <div className={styles.buttonWrapper}>
              <Link to='#'>
                <div className={styles.editButton}>로그아웃</div>
              </Link>
              <Link to='delete-account'>
                <div className={styles.passwordButton}>회원탈퇴</div>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

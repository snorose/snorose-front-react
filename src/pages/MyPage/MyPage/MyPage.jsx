import React from 'react';
import styles from './MyPage.module.css';
import { Link } from 'react-router-dom';
import profileIcon from '../../../assets/icon-profile.svg';

export default function MyPage() {
  return (
    <main className={styles.myPage}>
      <div className={styles.myPageUpper}>
        <div className={styles.logoOverlay}></div>
        <div className={styles.myInfo}>
          <p className={styles.name}>힘하리</p>
          <div className={styles.myImg}>
            <img src={profileIcon} alt='프로필 이미지' />
          </div>
          <div className={styles.profileYearMember}>
            <p className={styles.yearOfAdmission}>17학번</p>
            <p>|</p>
            <p className={styles.memberType}>정회원</p>
          </div>
        </div>
      </div>

      <div className={styles.myPageLower}>
        <div className={styles.detailContainer}>
          <div className={styles.pointContainer}>
            <h3 className={styles.title}>보유 포인트</h3>
            <p className={styles.point}>39</p>
          </div>
          <div className={styles.detailContent}>
            <p className={styles.detailContentTitle}>포인트 내역 보기</p>
          </div>
        </div>
        <div className={styles.detailContainer}>
          <h3 className={styles.title}>계정</h3>
          <div className={styles.detailContent}>
            <p>아이디</p>
            <p className={styles.detailContentDesc}>suen0904</p>
          </div>
          <div className={styles.detailContent}>
            <p c>이메일</p>
            <p className={styles.detailContentDesc}>suen0904@sookmyung.ac.kr</p>
          </div>
          <div className={styles.detailContent}>
            <p>아이디</p>
            <p className={styles.detailContentDesc}>suen0904</p>
          </div>
          <div className={styles.detailContent}>
            <p>학번</p>
            <p className={styles.detailContentDesc}>17123123</p>
          </div>
          <div className={styles.detailContent}>
            <p>전공</p>
            <p className={styles.detailContentDesc}>시각영상디자인과</p>
          </div>
          <div className={styles.detailContent}>
            <p>생년월일</p>
            <p className={styles.detailContentDesc}>1996.01.01</p>
          </div>
        </div>
        <div className={styles.detailContainer}>
          <h3 className={styles.title}>내 활동</h3>
          <p className={styles.detailContent}>내 글 모아보기</p>
          <p className={styles.detailContent}>댓글 단 글 모아보기</p>
          <p className={styles.detailContent}>다운받은 시험 후기 모아보기</p>
        </div>
        <div className={styles.detailContainer}>
          <h3 className={styles.title}>이용 안내</h3>
          <p className={styles.detailContent}>개인정보 처리 방침</p>
          <p className={styles.detailContent}>서비스 이용 약관</p>
        </div>
        <div className={styles.accountActions}>
          <Link to='/my-page/delete-account' className={styles.detailContent}>
            회원 탈퇴
          </Link>
          <p className={styles.detailContent}>로그아웃</p>
        </div>
      </div>
    </main>
  );
}

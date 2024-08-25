import React from 'react';
import styles from './PolicyPage.module.css';
import { CloseAppBar } from '@/components/AppBar';

const ServicePolicyPageContent = `제 1 장 총칙

제 1 조 (목적)
본 약관은 통계청이 운영하는 나라통계시스템 운영홈페이지(이하 "당 사이트")에서 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차, 이용자와 당 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.

제 2 조 (약관의 효력과 변경)
① 당 사이트는 이용자가 본 약관 내용에 동의하는 것을 조건으로 이용자에게 서비스를 제공하며, 당 사이트의 서비스 제공 행위 및 이용자의 서비스 사용 행위에는 본 약관을 우선적으로 적용하겠습니다.
② 당 사이트는 본 약관을 사전 고지 없이 변경할 수 있으며, 변경된 약관은 당 사이트 내에 공지함으로써 이용자가 직접 확인하도록 할 것입니다. 이용자가 변경된 약관에 동의하지 아니하는 경우 본인의 회원등록을 취소(회원탈퇴)할 수 있으며, 계속 사용할 경우에는 약관 변경에 대한 암묵적 동의로 간주됩니다. 변경된 약관은 공지와 동시에 그 효력을 발휘합니다.

제 3 조 (약관 외 준칙)
본 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 기타 관련 법령의 규정에 의합니다.

제 4 조 (용어의 정의)
① 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
1. 이용자 : 본 약관에 따라 당 사이트가 제공하는 서비스를 받는 자
2. 가 입 : 당 사이트가 제공하는 신청서 양식에 해당 정보를 기입하고, 본 약관에 동의하여 서비스 이용계약을 완료시키는 행위
`;

export default function ServicePolicyPage() {
  return (
    <main className={styles.policyPage}>
      <CloseAppBar alignRight={true} stroke='#000' />
      <section className={styles.contentWrapper}>
        <h1 className={styles.title}>서비스 이용 약관</h1>
        <article className={styles.content}>{ServicePolicyPageContent}</article>
      </section>
    </main>
  );
}

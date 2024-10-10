import { Button } from '@/pages/SnoroseVerifyPage';

import {
  Accordion,
  AccordionListItem,
  AccordionTag,
} from '@/components/Accordion';
import { BackAppBar } from '@/components/AppBar';
import { Icon } from '@/components/Icon';

import {
  ABOUT_SNOROSE,
  SNOROSE_HISTORY,
  SNOROSE_MEMBERSHIP_LEVEL,
  HALL_OF_FAME_ADMINS,
} from '@/constants';

import HALL_OF_FAME from '@/assets/images/hallOfFame.svg';

import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <main>
      <BackAppBar hasMenu />
      <Icon className={styles.logo} id='about-logo' width={221} height={25} />
      <div className={styles.container}>
        <Accordion title='스노로즈 소개'>
          <pre className={styles.aboutUs}>{ABOUT_SNOROSE}</pre>
        </Accordion>
        <Accordion title='스노로즈 연혁'>
          <AccordionListItem list={SNOROSE_HISTORY} />
        </Accordion>
        <Accordion title='회원 등급 설명'>
          <AccordionListItem list={SNOROSE_MEMBERSHIP_LEVEL} />
        </Accordion>
        <Accordion title='명예의 전당'>
          <section className={styles.hallOfFame}>
            <img src={HALL_OF_FAME} alt='hallOfFame' />
            <div className={styles.tags}>
              {HALL_OF_FAME_ADMINS.map((admin) => (
                <AccordionTag admin={admin} />
              ))}
            </div>
          </section>
          <Button
            className={styles.apply}
            onClick={() => alert('지원 기간이 아닙니다!')}
          >
            리자 지원하기
          </Button>
        </Accordion>
      </div>
    </main>
  );
}

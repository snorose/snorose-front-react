import { BackAppBar, Icon } from '@/shared/component';

import {
  Accordion,
  AccordionListItem,
  AccordionTag,
} from '@/feature/home/component';
import {
  ABOUT_SNOROSE,
  SNOROSE_HISTORY,
  SNOROSE_MEMBERSHIP_LEVEL,
} from '@/feature/home/constant';
import HALL_OF_FAME_ADMINS from '@/feature/home/data/HallOfFrameAdmins.json';
import HALL_OF_FAME from '@/assets/images/hallOfFame.svg';

import styles from './AboutPage.module.css';
import { useState } from 'react';

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <main>
      <BackAppBar hasMenu />
      <Icon className={styles.logo} id='about-logo' width={221} height={25} />
      <div className={styles.container}>
        <Accordion
          title='스노로즈 소개'
          isOpen={openIndex === 0}
          onClick={() => toggle(0)}
        >
          <pre className={styles.aboutUs}>{ABOUT_SNOROSE}</pre>
        </Accordion>
        <Accordion
          title='스노로즈 연혁'
          isOpen={openIndex === 1}
          onClick={() => toggle(1)}
        >
          <AccordionListItem
            list={SNOROSE_HISTORY}
            listName='SNOROSE_HISTORY'
          />
        </Accordion>
        <Accordion
          title='회원 등급 설명'
          isOpen={openIndex === 2}
          onClick={() => toggle(2)}
        >
          <AccordionListItem
            list={SNOROSE_MEMBERSHIP_LEVEL}
            listName='SNOROSE_MEMBERSHIP_LEVEL'
          />
        </Accordion>
        <Accordion
          title='명예의 전당'
          isOpen={openIndex === 3}
          onClick={() => toggle(3)}
        >
          <section className={styles.hallOfFame}>
            <img src={HALL_OF_FAME} alt='hallOfFame' />
            <div className={styles.tags}>
              {HALL_OF_FAME_ADMINS.map((admin, index) => (
                <AccordionTag
                  key={`${admin.nickname}-${index}`}
                  admin={admin}
                />
              ))}
            </div>
          </section>
        </Accordion>
      </div>
    </main>
  );
}

const majorsList = [
  //문과대학
  { id: '한국어문학부', name: '한국어문학부' },
  { id: '역사문화학과', name: '역사문화학과' },
  { id: '프랑스언어·문화학과', name: '프랑스언어·문화학과' },
  { id: '중어중문학부', name: '중어중문학부' },
  { id: '독일언어·문화학과', name: '독일언어·문화학과' },
  { id: '일본학과', name: '일본학과' },
  { id: '문헌정보학과', name: '문헌정보학과' },
  { id: '문화관광학전공', name: '문화관광학전공' },
  { id: '르꼬르동블루외식경영전공', name: '르꼬르동블루외식경영전공' },
  { id: '교육학부', name: '교육학부' },

  //이과대학
  { id: '화학과', name: '화학과' },
  { id: '생명시스템학부', name: '생명시스템학부' },
  { id: '수학과', name: '수학과' },
  { id: '통계학과', name: '통계학과' },
  { id: '체육교육과', name: '체육교육과' },
  { id: '무용과', name: '무용과' },

  //공과대학
  { id: '화공생명공학부', name: '화공생명공학부' },
  { id: '인공지능공학부', name: '인공지능공학부' },
  { id: 'IT공학전공', name: 'IT공학전공' },
  { id: '지능형전자시스템전공', name: '지능형전자시스템전공' },
  { id: '신소재물리전공', name: '신소재물리전공' },
  { id: '컴퓨터과학전공', name: '컴퓨터과학전공' },
  { id: '데이터사이언스전공', name: '데이터사이언스전공' },
  { id: '소프트웨어융합전공', name: '소프트웨어융합전공' },
  { id: '기계시스템학부', name: '기계시스템학부' },
  { id: '기초공학부', name: '기초공학부' },
  { id: '첨단공학부', name: '첨단공학부' },

  // 생활과학대학
  { id: '가족자원경영학과', name: '가족자원경영학과' },
  { id: '아동복지학부', name: '아동복지학부' },
  { id: '의류학과', name: '의류학과' },
  { id: '식품영양학과', name: '식품영양학과' },

  // 사회과학대학
  { id: '정치외교학과', name: '정치외교학과' },
  { id: '행정학과', name: '행정학과' },
  { id: '홍보광고학과', name: '홍보광고학과' },
  { id: '소비자경제학과', name: '소비자경제학과' },
  { id: '사회심리학과', name: '사회심리학과' },

  // 법과대학
  { id: '법학부', name: '법학부' },

  // 경상대학
  { id: '경제학부', name: '경제학부' },
  { id: '경영학부', name: '경영학부' },

  // 음악대학
  { id: '피아노과', name: '피아노과' },
  { id: '관현악과', name: '관현악과' },
  { id: '성악과', name: '성악과' },
  { id: '작곡과', name: '작곡과' },

  // 약학대학
  { id: '약학부', name: '약학부' },

  // 미술대학
  { id: '시각·영상디자인과', name: '시각·영상디자인과' },
  { id: '산업디자인과', name: '산업디자인과' },
  { id: '환경디자인과', name: '환경디자인과' },
  { id: '공예과', name: '공예과' },
  { id: '회화과', name: '회화과' },

  // 순헌칼리지
  { id: '자유전공학부', name: '자유전공학부' },
  { id: '기초교양학부', name: '기초교양학부' },
  { id: '융합학부/연계전공', name: '융합학부/연계전공' },

  // 글로벌융합대학
  { id: '글로벌융합학부', name: '글로벌융합학부' },

  // 글로벌서비스학부
  { id: '글로벌협력전공', name: '글로벌협력전공' },
  { id: '앙트러프러너십전공', name: '앙트러프러너십전공' },

  // 영어영문학부
  { id: '영어영문학전공', name: '영어영문학전공' },
  { id: '테슬(TESL)전공', name: '테슬(TESL)전공' },

  // 미디어학부
  { id: '미디어학부', name: '미디어학부' },
];

export const MAJORS = Object.freeze(
  majorsList.slice(0).sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  })
);

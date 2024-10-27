import styles from './PostContent.module.css';

const urlPattern = /(https?:\/\/[a-zA-Z0-9._/]+|www\.[a-zA-Z0-9._/]+)/g;

export default function PostContent({ content }) {
  const linkedCountent = content.split(urlPattern).map((part, index) => {
    if (!urlPattern.test(part)) {
      return part;
    }

    const href = part.startsWith('http') ? part : `https://${part}`;
    return (
      <a
        className={styles.link}
        key={index}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
      >
        {part}
      </a>
    );
  });

  return <p className={styles.content}>{linkedCountent}</p>;
}

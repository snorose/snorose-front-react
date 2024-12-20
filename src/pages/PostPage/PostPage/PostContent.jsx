import styles from './PostContent.module.css';

const urlRegex = /(https?:\/\/[^\s]+)/g;

export default function PostContent({ content }) {
  const replace = (text) => {
    const convertedText = text.replace(
      urlRegex,
      (url) =>
        `<a href=${url} target='_blank' rel='noopener noreferrer'>${url}</a>`
    );

    return { __html: convertedText };
  };

  return (
    <p
      className={styles.content}
      dangerouslySetInnerHTML={replace(content)}
    ></p>
  );
}

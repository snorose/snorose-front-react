import Url from '@/components/Url/Url.jsx';

const urlPattern = /(https?:\/\/[a-zA-Z0-9._/]+|www\.[a-zA-Z0-9._/]+)/g;

export const linkifyUrls = (content) => {
  return content.split(urlPattern).map((part, index) => {
    if (!urlPattern.test(part)) {
      return part;
    }

    const href = part.startsWith('http') ? part : `https://${part}`;

    return <Url href={href}>{part}</Url>;
  });
};

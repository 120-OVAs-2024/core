import { Image as ImageUI } from 'books-ui';

import css from './image.module.css';

interface Props {
  src: string;
  alt: string;
  title?: string;
  size: string;
  hasHtml?: boolean;
  addClass?: string;
  noCaption?: boolean
}

export const Image: React.FC<Props> = ({ src, title, alt, size, hasHtml, ...props }) => {
  return !hasHtml ? (
    <ImageUI src={src} alt={alt} title={title} size={size} {...props} />
  ) : (
    <figure>
      <ImageUI src={src} alt={alt.replace(/<[^>]*>/g, '')} size={size} noCaption {...props} />
      <figcaption className={css['image__figcaption']}>
        <p className="u-font-bold">{title}</p>&nbsp;
        <p dangerouslySetInnerHTML={{ __html: alt }}></p>
      </figcaption>
    </figure>
  );
};

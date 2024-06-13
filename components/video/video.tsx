import type { VideoPlayerProps } from 'books-ui'
import { VideoPlayer } from 'books-ui';

interface Props extends VideoPlayerProps {
  alt: string;
  title?: string;
}

export const Video: React.FC<Props> = ({ title, alt, poster = "assets/base/poster.webp", ...props }) => (
  <figure>
    <VideoPlayer poster={poster} {...props} />
    <figcaption className="u-font-italic u-my-3 u-text-center">
      <strong>{title}</strong>&nbsp;{alt}
    </figcaption>
  </figure>
);

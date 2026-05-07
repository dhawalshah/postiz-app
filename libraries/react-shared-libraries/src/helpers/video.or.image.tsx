import { FC } from 'react';
import { clsx } from 'clsx';
export const VideoOrImage: FC<{
  src: string;
  autoplay: boolean;
  isContain?: boolean;
  imageClassName?: string;
  videoClassName?: string;
}> = (props) => {
  const { src, autoplay, isContain, imageClassName, videoClassName } = props;
  if (src?.indexOf('mp4') > -1) {
    return (
      <video
        src={src}
        autoPlay={autoplay}
        className={clsx('w-full h-full', videoClassName)}
        muted={true}
        loop={true}
      />
    );
  }
  if (src?.toLowerCase().indexOf('.pdf') > -1) {
    return (
      <div
        className={clsx(
          'w-full h-full flex flex-col items-center justify-center bg-[#f5f5f5] text-[#666]',
          imageClassName
        )}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2v6h6" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 15v-4m0 4h1.5a1.5 1.5 0 0 0 0-3H9m6 3v-4m0 2h1.5M15 15h2M9 11v4" stroke="#c00" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontSize: 11, marginTop: 4 }}>PDF</span>
      </div>
    );
  }
  return (
    <img
      className={clsx(
        isContain ? 'object-contain' : 'object-cover',
        'w-full h-full',
        imageClassName
      )}
      src={src}
    />
  );
};

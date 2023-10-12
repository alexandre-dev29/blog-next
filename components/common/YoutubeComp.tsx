export function YouTubeComp({ youtubeUrl }: { youtubeUrl: string }) {
  console.log(youtubeUrl);
  return (
    <div className={'youtube_container'}>
      <iframe
        src={youtubeUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="Embedded YouTube video"
        className={'youtube_frame'}
      />
    </div>
  );
}

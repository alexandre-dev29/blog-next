export function EmbeddableMdxComp({ youtubeUrl }: { youtubeUrl: string }) {
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

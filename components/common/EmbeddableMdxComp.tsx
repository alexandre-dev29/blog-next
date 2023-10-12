import { EmbeddedType } from '@/types/uiTypes';

export function EmbeddableMdxComp({
  embeddedurl,
  embeddedtype,
}: {
  embeddedurl: string;
  embeddedtype: EmbeddedType;
}) {
  return (
    <div className={'embedded_container'}>
      <iframe
        src={embeddedurl}
        allow={
          embeddedtype === EmbeddedType.Youtube
            ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            : ''
        }
        allowFullScreen
        title="Embedded YouTube video"
        className={'embedded_frame'}
      />
    </div>
  );
}

import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import ClassNames from 'embla-carousel-class-names';
import { useCallback } from 'react';

export default function DaySlider({
  children,
  OPTIONS,
  defaultIndex,
}: {
  children: (onClick: (index: number) => void) => JSX.Element;
  OPTIONS: EmblaOptionsType;
  defaultIndex?: number;
}) {
  const [sliderRef, sliderApi] = useEmblaCarousel(
    {
      ...OPTIONS,
      startIndex: defaultIndex,
    },
    [ClassNames({ active: true, inView: 'is-inView' })]
  );
  const onClick = useCallback(
    (index: number) => {
      if (!sliderApi) return;
      sliderApi.scrollTo(index);
    },
    [sliderApi]
  );
  return (
    <>
      <div className="overflow-hidden" ref={sliderRef}>
        {children(onClick)}
      </div>
    </>
  );
}

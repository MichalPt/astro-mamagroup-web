import React, { useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useAutoplay } from './EmblaCarouselAutoplay'
import { useAutoplayProgress } from './EmblaCarouselAutoplayProgress'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { getFormattedDate } from "@/utils/date"

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const progressNode = useRef(null)
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 8000 })
  ])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi)

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode)

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide text-center flex flex-col items-center justify-center">
            <div className="mb-4 dark:brightness-200">
              <img className="embla__slide__img" src="images/fmo-1000.png" alt="fmo"/>
            </div>
            <span className="title text-3xl bg-gradient-to-r from-accent-two/85 via-accent-one/85 to-accent-two/85 dark:from-accent-two dark:via-accent-one dark:to-accent-two bg-clip-text text-transparent">
              Welcome to MaMa Group website
            </span>
            <p className="mt-4 mb-4 text-lg font-medium">
              where we bridge theoretical and experimental knowledge<br/> of nonlinear optical spectroscopy
            </p>
          </div>
          {slides.map((post) => (
            <div className="embla__slide flex flex-col items-center justify-center" key={post.id}>
              {/* <div className="embla__slide__number"> */}
                {/* <span>{index + 1}</span> */}
                  <div className="flex flex-col items-center justify-center text-center m-4">
                      <a data-astro-prefetch href={`/news/${post.id}/`} className="citrus-link relative px-4 hover:brightness-80">
                        {post.data.image && 
                            <div className="flex justify-center">
                                <img src={post.data.image} alt={post.data.image.split('/').at(-1)} height="120" width="120"/>
                            </div>
                        }
                      </a>
                      <div className="citrus-link font-medium text-accent-base">
                        {/* <time>{post.data.publishDate}</time> */}
                        <a href={'/news'} className="citrus-link">
                          <h2>News</h2>
                        </a>
                        <span className="text-sm">{getFormattedDate(post.data.publishDate)}</span>
                        <a href={`/news/${post.id}/`} className="citrus-link relative"><h1>{post.data.title}</h1>
                          {post.body}
                        </a>
                      </div>
                      {/* <FormattedDate
                          class="text-lighter text-xs no-underline"
                          date={post.data.publishDate}
                          dateTimeOptions={siteConfig.date.options}
                      />  */}
                      
                  </div>
              
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onAutoplayButtonClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>

        <div
          className={`embla__progress`.concat(
            showAutoplayProgress ? '' : ' embla__progress--hidden'
          )}
        >
          <div className="embla__progress__bar" ref={progressNode} />
        </div>

        {/* <button className="embla__play" onClick={toggleAutoplay} type="button">
          {autoplayIsPlaying ? 'Stop' : 'Start'}
        </button> */}

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
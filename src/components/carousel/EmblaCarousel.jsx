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
    Autoplay({ playOnInit: true, delay: 10000 })
  ])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const { autoplayIsPlaying, onAutoplayButtonClick } =
    useAutoplay(emblaApi)

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode)

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">

          {/* First slide with welcome message */}
          <div className="embla__slide text-center flex flex-col items-center justify-center">
            <img className="embla__slide__img mb-4  dark:brightness-200 w-full h-auto object-cover" src="images/fmo-1000.png" alt="fmo"/>
            <span className="title text-2xl sm:text-3xl bg-gradient-to-r from-accent-two/85 via-accent-one/85 to-accent-two/85 dark:from-accent-two dark:via-accent-one dark:to-accent-two bg-clip-text text-transparent">
              Welcome to MaMa Group website
            </span>
            <p className="mt-4 mb-4 text-sm sm:text-lg font-medium">
              where we bridge theoretical and experimental knowledge<br/> of nonlinear optical spectroscopy
            </p>
          </div>

          {/* Slides with posts */}
          {slides.map((post) => (
            <div className="embla__slide flex flex-col items-center justify-center" key={post.id}>
                  <div className="flex flex-col items-center justify-center text-center m-4 w-full">
                      <a href={`/news/${post.id}/`} className="citrus-link relative px-4 hover:brightness-80">
                        {post.data.image && 
                            <div className="flex justify-center w-full">
                                <img className="embla__slide__img w-full h-auto object-cover" src={post.data.image} alt={post.data.image.split('/').at(-1)} height="120" width="450" layout="responsive"/>
                            </div>
                        }
                      </a>
                      <div className="font-medium text-accent-base w-full">
                        {/* <a href={'/news'} className="citrus-link">
                          <h2>News</h2>
                        </a> */}
                        <span className="text-lighter text-xs">{getFormattedDate(post.data.publishDate)}</span>
                        <a href={`/news/${post.id}/`} className="citrus-link relative">
                          <h1 className="mt-4 title">{post.data.title}</h1>
                          {post.data.teaser && <div className="mt-1 text-sm sm:text-lg">{post.data.teaser}</div>}
                        </a>
                      </div>
                  </div>
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
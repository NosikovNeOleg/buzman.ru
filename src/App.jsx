import React, { useEffect } from 'react'

function useParallax() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-parallax-depth]'))
    if (!nodes.length) return

    let pointerX = 0, pointerY = 0, scrollY = 0, raf = null
    const update = () => {
      nodes.forEach(el => {
        const depth = parseFloat(el.getAttribute('data-parallax-depth') || '0.15')
        const moveX = (pointerX - 0.5) * depth * 30
        const moveY = (pointerY - 0.5) * depth * 24 + (scrollY * depth * 0.06)
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`
      })
      raf = null
    }
    const schedule = () => { if (raf == null) raf = requestAnimationFrame(update) }
    const onPointer = (e) => {
      const w = window.innerWidth || 1; const h = window.innerHeight || 1
      pointerX = e.clientX / w; pointerY = e.clientY / h; schedule()
    }
    const onScroll = () => { scrollY = window.scrollY || document.documentElement.scrollTop || 0; schedule() }

    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()

    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', schedule)
    }
  }, [])
}

export default function App(){
  useParallax()

  useEffect(() => {
    // parallax is attached; nothing else for now
  }, [])

  return (
    <>
      <main className="layout">
        <section className="hero hero--light">
          <div className="hero__left" data-parallax-depth="0.20">
            <div className="hero__photo">
              <img src={`${import.meta.env.BASE_URL}assets/sergey.png`} alt="Упс, я пропал" />
              <div className="hero__photo-gradient" aria-hidden="true"></div>
            </div>
          </div>
          <div className="hero__right">
            <p className="hero__eyebrow">Привет!</p>
            <h1 className="hero__title">Меня зовут Сергей и я продаю свою машину</h1>
            <p className="hero__lead">Кликните на кнопку ниже чтобы посмотреть</p>
            <div className="hero__actions">
              <a className="button button--primary" href="https://www.avito.ru/perm/avtomobili/vaz_lada_vesta_1.6_mt_2016_62_858_km_7434530114">Тачка на продажу</a>
            </div>
          </div>
        </section>

        <section className="career" id="about">
          <div className="career__left">
            <h2 className="career__title">Сергей Бузмаков</h2>
            <a>Если жизнь - это вызов, то я перезвоню</a>
           </div>
          <div className="career__right">
            <ul className="chips" aria-label="Skills">
            <a className="button button--twitch" href="https://www.twitch.tv/buzmanme" rel="noopener noreferrer">Twitch</a>
            <a className="button button--telegram" href="https://t.me/buzman2" rel="noopener noreferrer">Telegram</a>
            </ul>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        Made by <a href="https://www.nosikow.ru" target="_blank" rel="noopener noreferrer">Nosikow</a>
      </footer>
    </>
  )
}



import { useState, useRef, useCallback, useEffect } from 'react';

const OPEN_DELAY  = 200;
const CLOSE_DELAY = 180;

function getSessionMuted() {
  try { return sessionStorage.getItem('hanyu_muted') === 'true'; }
  catch { return false; }
}
function setSessionMuted(v) {
  try { sessionStorage.setItem('hanyu_muted', String(v)); } catch {}
}

export default function GalleryCard({
  title, year, slug, cover, coverPosition,
  intro, tags = [], size = 'medium',
  previewVideo, previewPoster,
}) {
  const [open,    setOpen]    = useState(false);
  const [muted,   setMuted]   = useState(getSessionMuted);
  const [side,    setSide]    = useState('right'); // popover side
  const cardRef  = useRef(null);
  const videoRef = useRef(null);
  const openT    = useRef(null);
  const closeT   = useRef(null);

  // ── Hover handlers ───────────────────────────────────────────
  const handleEnter = useCallback(() => {
    clearTimeout(closeT.current);
    openT.current = setTimeout(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setSide(rect.left > window.innerWidth * 0.55 ? 'left' : 'right');
      }
      setOpen(true);
    }, OPEN_DELAY);
  }, []);

  const handleLeave = useCallback(() => {
    clearTimeout(openT.current);
    closeT.current = setTimeout(() => {
      setOpen(false);
    }, CLOSE_DELAY);
  }, []);

  const keepOpen = useCallback(() => clearTimeout(closeT.current), []);

  // ── Keyboard ─────────────────────────────────────────────────
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') { setOpen(false); clearTimeout(openT.current); }
    if (e.key === 'Enter' || e.key === ' ') navigate(e);
  }, []);

  // ── Video sync ───────────────────────────────────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (open) {
      v.muted = muted;
      v.play().catch(() => {
        // Browser blocked unmuted autoplay — fall back to muted
        v.muted = true;
        setMuted(true);
        setSessionMuted(true);
        v.play().catch(() => {});
      });
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [open]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  useEffect(() => () => { clearTimeout(openT.current); clearTimeout(closeT.current); }, []);

  // ── Navigate ─────────────────────────────────────────────────
  const navigate = (e) => {
    e?.preventDefault?.();
    window.location.href = `/${slug}/`;
  };

  // ── Aspect ratio ─────────────────────────────────────────────
const ratioMap = {
  // --- Vertical / Focused (For height and tight rotation) ---
  portrait: '9/16',  // Perfect for a Biellmann spin or the peak of a twist lift
  tall: '3/4',       // Great for sit spins or individual jump poses
  medium: '4/5',     // Your standard balanced card

  // --- Symmetrical ---
  square: '1/1',     // Excellent for headshots, pair static lifts, or UI grids

  // --- Horizontal / Expansive (For ice coverage and speed) ---
  wide: '5/4',       // Good for short step combinations
  landscape: '3/2',  // Classic photography ratio, great for pair death spirals
  cinematic: '16/9', // The sweet spot for long glide moves (Arabesques, Spirals)
  panoramic: '21/9', // Ultra-wide. Ideal for a sweeping Spread Eagle or Ina Bauer
  strip: '3/1'       // Full-rink width. Use this to map a full step sequence or edge trace
};

const ratio = ratioMap[size] || '4/5';

  const imgPos = coverPosition || '50% 35%';

  return (
    <div
      className="gallery-card"
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onKeyDown={handleKey}
      onClick={navigate}
      tabIndex={0}
      role="article"
      aria-label={`${title}, ${year}`}
      style={{ aspectRatio: ratio }}
    >
      {/* Card image */}
      <img
        src={cover}
        alt={title}
        className="card-img"
        style={{ objectPosition: imgPos }}
        loading="lazy"
      />

      {/* Overlay: title + year + chips */}
      <div className="card-overlay">
        <div className="card-info">
          {tags.slice(0, 3).map(t => (
            <span key={t} className="tag-chip">{t}</span>
          ))}
          <h3 className="card-title">{title}</h3>
          <span className="card-year">{year}</span>
        </div>
      </div>

      {/* Popover */}
      {open && (
        <div
          className={`popover popover-${side}`}
          onMouseEnter={keepOpen}
          onMouseLeave={handleLeave}
          onClick={(e) => { e.stopPropagation(); navigate(); }}
          role="region"
          aria-label={`Preview: ${title}`}
        >
          {/* Left: text */}
          <div className="pop-text">
            <h3 className="pop-title">{title}</h3>
            <span className="pop-year">{year}</span>
            <div className="pop-tags">
              {tags.slice(0, 5).map(t => <span key={t} className="tag-chip">{t}</span>)}
            </div>
            <p className="pop-intro">{intro}</p>
            <a
              href={`/${slug}/`}
              className="pop-cta"
              onClick={e => { e.stopPropagation(); navigate(); }}
            >
              Read more →
            </a>
          </div>

          {/* Right: media */}
          <div className="pop-media-wrap">
            {previewVideo ? (
              <div className="pop-media-inner">
                <video
                  ref={videoRef}
                  src={previewVideo}
                  poster={previewPoster || cover}
                  muted={muted}
                  loop
                  playsInline
                  preload="metadata"
                  className="pop-video"
                  onError={() => {}}
                />
                <button
                  className="mute-btn"
                  onClick={e => {
                    e.stopPropagation();
                    const next = !muted;
                    setMuted(next);
                    setSessionMuted(next);
                  }}
                  aria-label={muted ? 'Unmute video' : 'Mute video'}
                >
                  {muted ? '🔇 Unmute' : '🔊 Mute'}
                </button>
              </div>
            ) : (
              <img
                src={previewPoster || cover}
                alt={title}
                className="pop-poster"
                style={{ objectPosition: imgPos }}
              />
            )}
          </div>
        </div>
      )}

      {/* Inline styles */}
      <style>{`
        .gallery-card {
          position: relative;
          break-inside: avoid;
          margin-bottom: 14px;
          border-radius: 12px;
          overflow: visible;
          cursor: pointer;
          outline: none;
        }
        .gallery-card:focus-visible { box-shadow: 0 0 0 2px #c9a76d; }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          display: block;
          transition: transform .35s ease, filter .35s ease;
        }
        .gallery-card:hover .card-img {
          transform: scale(1.025);
          filter: brightness(.88);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,0) 50%);
          display: flex;
          align-items: flex-end;
          padding: 1rem;
          pointer-events: none;
        }
        .card-info { display: flex; flex-direction: column; gap: .25rem; }
        .card-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.15rem;
          font-weight: 400;
          color: #f0e8db;
          line-height: 1.2;
        }
        .card-year {
          font-size: .65rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(200,185,165,.7);
        }

        /* ── Popover ── */
        .popover {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 100;
          width: 460px;
          background: #1c1a18;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 14px;
          box-shadow: 0 20px 60px rgba(0,0,0,.65);
          display: flex;
          gap: 0;
          overflow: hidden;
          pointer-events: auto;
          animation: popIn .18s ease;
        }
        @keyframes popIn {
          from { opacity: 0; transform: translateY(-50%) scale(.96); }
          to   { opacity: 1; transform: translateY(-50%) scale(1); }
        }
        .popover-right { left: calc(100% + 12px); }
        .popover-left  { right: calc(100% + 12px); }

        .pop-text {
          flex: 1;
          padding: 1.2rem 1rem 1.2rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: .45rem;
          min-width: 0;
        }
        .pop-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.1rem;
          font-weight: 400;
          color: #f0e8db;
          line-height: 1.25;
        }
        .pop-year {
          font-size: .62rem;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: rgba(200,185,165,.6);
        }
        .pop-tags { display: flex; flex-wrap: wrap; gap: .3rem; }
        .pop-intro {
          font-size: .82rem;
          line-height: 1.55;
          color: #a89d90;
          font-style: italic;
          margin-top: .1rem;
        }
        .pop-cta {
          margin-top: auto;
          font-size: .7rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #c9a76d;
          text-decoration: none;
          transition: opacity .2s;
        }
        .pop-cta:hover { opacity: .75; }

        .pop-media-wrap {
          width: 190px;
          flex-shrink: 0;
          background: #111;
          position: relative;
        }
        .pop-media-inner { width: 100%; height: 100%; position: relative; }
        .pop-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pop-poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .mute-btn {
          position: absolute;
          bottom: .5rem;
          right: .5rem;
          background: rgba(0,0,0,.65);
          color: #e2d9cc;
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 999px;
          padding: .22em .65em;
          font-size: .65rem;
          letter-spacing: .06em;
          cursor: pointer;
          transition: background .2s;
        }
        .mute-btn:hover { background: rgba(0,0,0,.85); }

        @media (max-width: 560px) {
          .popover { display: none; }
        }
        @media (max-width: 1100px) {
          .popover { width: 360px; }
          .pop-media-wrap { width: 150px; }
        }
      `}</style>
    </div>
  );
}

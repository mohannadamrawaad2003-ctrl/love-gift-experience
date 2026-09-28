import { useMemo, useState } from "react";
import {
  ChevronRight,
  Heart,
  Music2,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  Sparkles,
} from "lucide-react";

type Screen = "test" | "hub" | "bouquet" | "birds" | "letter";

type CatMood = "shy" | "hurt" | "skeptical" | "happy" | "ecstatic";

const bouquetNotes = [
  "You make my heart bloom",
  "Life feels sweeter with you",
  "You make every moment sweeter",
  "I choose you every day",
  "My love for you keeps growing",
  "My heart will always choose you",
];

function getMessage(love: number) {
  if (love <= 10) return "Only that much?";
  if (love <= 40) return "That hurts...";
  if (love <= 65) return "Half? Seriously?";
  if (love <= 91) return "Are you sure?";
  if (love <= 199) return "Aww, that’s more like it!";
  return "Correct answer!";
}

function getMood(love: number): CatMood {
  if (love <= 10) return "shy";
  if (love <= 40) return "hurt";
  if (love <= 91) return "skeptical";
  if (love <= 199) return "happy";
  return "ecstatic";
}

function CornerDoodles() {
  return (
    <>
      <span className="doodle doodle-plane doodle-plane-one">✈</span>
      <span className="doodle doodle-plane doodle-plane-two">✈</span>
      <span className="doodle doodle-heart doodle-heart-one">♡</span>
      <span className="doodle doodle-heart doodle-heart-two">♡</span>
      <span className="doodle doodle-flower doodle-flower-one">✿</span>
      <span className="doodle doodle-flower doodle-flower-two">✿</span>
      <span className="top-right-stamp"><span>♡</span><small>with love</small></span>
    </>
  );
}

function CatIllustration({ mood }: { mood: CatMood }) {
  const isSad = mood === "hurt";
  const isSkeptical = mood === "skeptical";
  const isHappy = mood === "happy" || mood === "ecstatic";
  const isEcstatic = mood === "ecstatic";
  return (
    <div className={`cat-wrap cat-${mood}`} aria-label={`cat mood: ${mood}`}>
      {isEcstatic && <span className="cat-spark cat-spark-one">✦</span>}
      {isEcstatic && <span className="cat-spark cat-spark-two">♡</span>}
      <svg viewBox="0 0 190 145" className="cat-svg" role="img" aria-label="cute cat illustration">
        <path d="M51 49 42 17c-1-4 3-6 6-3l25 17c15-8 31-8 45 0l25-17c3-3 7-1 6 3l-8 32c12 13 17 30 14 48-4 25-28 39-59 39S39 122 35 97c-3-19 3-36 16-48Z" fill="#fffaf9" stroke="#3f3033" strokeWidth="5" strokeLinejoin="round" />
        <path d="M46 25 51 44l18-13Z" fill="#f6b4bf" />
        <path d="m144 25-5 19-18-13Z" fill="#f6b4bf" />
        <ellipse cx="75" cy="71" rx="6" ry="8" fill="#3f3033" />
        <ellipse cx="116" cy="71" rx="6" ry="8" fill="#3f3033" />
        {mood === "shy" && <><path d="M91 85q4 4 8 0" fill="none" stroke="#3f3033" strokeWidth="4" strokeLinecap="round" /><ellipse cx="62" cy="87" rx="10" ry="5" fill="#f4a8b6" opacity=".75" /><ellipse cx="129" cy="87" rx="10" ry="5" fill="#f4a8b6" opacity=".75" /></>}
        {isSad && <><path d="M88 91q8-6 16 0" fill="none" stroke="#3f3033" strokeWidth="4" strokeLinecap="round" /><path d="M67 75q4-8 8-1M116 74q4-8 8 0" fill="none" stroke="#5d9ac0" strokeWidth="4" strokeLinecap="round" /><path d="M64 86c-6 9-5 19 0 22M132 86c6 9 5 19 0 22" fill="none" stroke="#7cb9d7" strokeWidth="3" strokeLinecap="round" /></>}
        {isSkeptical && <><path d="M64 62q10-8 19-2M108 60q9-6 18 2" fill="none" stroke="#3f3033" strokeWidth="5" strokeLinecap="round" /><path d="M88 88q8 5 16 0" fill="none" stroke="#3f3033" strokeWidth="4" strokeLinecap="round" /></>}
        {isHappy && <><path d="M66 69q8-10 16 0M109 69q8-10 16 0" fill="none" stroke="#3f3033" strokeWidth="5" strokeLinecap="round" /><path d="M86 87q9 12 18 0" fill="none" stroke="#3f3033" strokeWidth="4" strokeLinecap="round" /><path d="M94 87v10" stroke="#d5637a" strokeWidth="3" strokeLinecap="round" /><path d="M61 90q-5 8-10 3M130 90q5 8 10 3" fill="none" stroke="#f1a0b0" strokeWidth="4" strokeLinecap="round" /></>}
        <path d="M39 104q-17 0-24 12M151 104q17 0 24 12" fill="none" stroke="#3f3033" strokeWidth="4" strokeLinecap="round" />
        <path d="M70 125q25 14 50 0" fill="none" stroke="#f0b5bf" strokeWidth="5" strokeLinecap="round" />
      </svg>
      {isEcstatic && <span className="cat-heart cat-heart-one">♥</span>}
      {isEcstatic && <span className="cat-heart cat-heart-two">♥</span>}
    </div>
  );
}

function Gauge({ love, onChange }: { love: number; onChange: (value: number) => void }) {
  const activeLength = Math.max(0, Math.min(251.2, (love / 1000) * 251.2));
  const angle = -180 + (love / 1000) * 180;
  const knobX = 100 + Math.cos((angle * Math.PI) / 180) * 80;
  const knobY = 106 + Math.sin((angle * Math.PI) / 180) * 80;
  const updateFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    onChange(Math.round(ratio * 1000));
  };
  return (
    <div className="gauge-zone" onPointerDown={updateFromPointer} onPointerMove={(event) => event.buttons === 1 && updateFromPointer(event)}>
      <svg viewBox="0 0 200 126" className="gauge-svg" aria-hidden="true">
        <path d="M20 106 A80 80 0 0 1 180 106" fill="none" stroke="#f5c9d0" strokeWidth="16" strokeLinecap="round" />
        <path d="M20 106 A80 80 0 0 1 180 106" fill="none" stroke="#d55775" strokeWidth="16" strokeLinecap="round" strokeDasharray={`${activeLength} 251.2`} />
        <path d="M20 106 A80 80 0 0 1 180 106" fill="none" stroke="#fbe5e8" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" opacity=".8" />
        <line x1="100" y1="106" x2={knobX} y2={knobY} stroke="#a83656" strokeWidth="3" strokeLinecap="round" />
        <circle cx={knobX} cy={knobY} r="10" fill="#fffaf9" stroke="#c94969" strokeWidth="3" />
        <text x="100" y="100" textAnchor="middle" className="gauge-number">{love}%</text>
        <text x="100" y="119" textAnchor="middle" className="gauge-label">love</text>
        <text x="20" y="124" className="gauge-end-label">0</text>
        <text x="171" y="124" className="gauge-end-label">∞</text>
      </svg>
      <input className="gauge-input" type="range" min="0" max="1000" value={love} onChange={(event) => onChange(Number(event.target.value))} aria-label="How much do you love me?" />
      <div className="gauge-hint">drag the heart all the way</div>
    </div>
  );
}

function GiftBox({ variant, onClick }: { variant: "one" | "two" | "three"; onClick: () => void }) {
  return (
    <button className={`gift-button gift-${variant}`} onClick={onClick} aria-label={`Open ${variant} surprise`}>
      <span className="gift-shadow" />
      <svg viewBox="0 0 140 150" className="gift-svg" aria-hidden="true">
        <path d="M22 54h96v70H22z" fill="#9ed7e6" stroke="#79baca" strokeWidth="3" />
        <path d="M18 48h104v21H18z" fill="#a9dfe9" stroke="#79baca" strokeWidth="3" />
        <path d="M67 48h26v76H67z" fill="#ed8ca1" opacity=".98" />
        <path d="M22 76h96" stroke="#e77991" strokeWidth="3" opacity=".55" />
        <path d="M70 48c-28 0-38-11-34-20 4-9 18-5 29 7 7 7 9 13 9 13Z" fill="#f08fa4" stroke="#cc6b83" strokeWidth="3" />
        <path d="M84 48c28 0 38-11 34-20-4-9-18-5-29 7-7 7-9 13-9 13Z" fill="#f08fa4" stroke="#cc6b83" strokeWidth="3" />
        <path d="M72 37c3-8 11-8 14 0-1 8-5 11-7 12-3-2-7-5-7-12Z" fill="#e87991" />
        <path d="M32 93h12M98 105h10M47 111h8" stroke="#c7e9ef" strokeWidth="4" strokeLinecap="round" opacity=".8" />
      </svg>
    </button>
  );
}

function BouquetIllustration() {
  const roses = [
    [88, 28, 13], [105, 18, 15], [122, 29, 13], [78, 45, 13], [101, 43, 16], [130, 48, 13], [151, 39, 12], [68, 67, 11], [88, 65, 13], [115, 67, 15], [143, 67, 13], [164, 64, 11], [98, 84, 11], [126, 83, 12],
  ];
  return (
    <svg viewBox="0 0 240 300" className="bouquet-svg" role="img" aria-label="bouquet of red roses">
      <g stroke="#5d9760" strokeWidth="4" strokeLinecap="round">
        <path d="M116 72 105 229" /><path d="M140 72 121 231" /><path d="M91 75 114 230" /><path d="M158 60 127 232" /><path d="M76 80 109 232" />
      </g>
      <g fill="#76ac77"><path d="m85 157-26-16q4 23 24 25Z"/><path d="m138 174 32-19q-4 25-30 27Z"/><path d="m109 193-34-7q13 23 34 19Z"/><path d="m126 145 31-16q-6 23-31 25Z"/></g>
      <path d="M74 218h101l-25 58c-15 10-37 10-52 0Z" fill="#fffaf3" stroke="#d8c8c2" strokeWidth="3" />
      <path d="M75 218q44 20 100 0" fill="none" stroke="#e8dcd1" strokeWidth="4" />
      <path d="M85 242q40 20 80 0" fill="none" stroke="#ede1d7" strokeWidth="3" />
      <path d="M77 258q40 20 80 1" fill="none" stroke="#ede1d7" strokeWidth="3" />
      <path d="M92 226q28 16 60 1" fill="none" stroke="#d95867" strokeWidth="7" strokeLinecap="round" />
      <path d="m124 243 9 10-9 11-9-11Z" fill="#efbf4f" stroke="#d49c34" strokeWidth="2" />
      {roses.map(([cx, cy, r], index) => <g key={index}><circle cx={cx} cy={cy} r={r} fill="#c84651" stroke="#a82f3c" strokeWidth="2" /><path d={`M${cx-r*.7} ${cy}q${r*.7-r*.35} ${-r*.8} ${r*.9} 0q${-r*.6} ${r*.7} ${r*.9} ${0}q${-r*.5} ${r*.8} ${-r*1.1} 0`} fill="none" stroke="#ef7d83" strokeWidth="2" opacity=".8" /></g>)}
    </svg>
  );
}

function BirdsIllustration() {
  return (
    <div className="polaroid-wrap">
      <span className="travel-stamp stamp-love">LOVE<br />PASS</span>
      <span className="travel-stamp stamp-highway">HIGHWAY<br />TICKET</span>
      <span className="butterfly">✦</span>
      <div className="polaroid-card">
        <div className="landscape">
          <div className="cloud cloud-one" /><div className="cloud cloud-two" />
          <div className="hill hill-back" /><div className="hill hill-front" />
          <svg viewBox="0 0 300 90" className="birds-svg" aria-label="two birds flying together">
            <path d="M30 50q18-24 36 0-18-12-36 0ZM98 32q18-24 36 0-18-12-36 0Z" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <span className="tiny-flower flower-a">✿</span><span className="tiny-flower flower-b">✿</span>
        </div>
        <div className="polaroid-caption">birds of a feather</div>
      </div>
    </div>
  );
}

function LetterCat() {
  return (
    <svg viewBox="0 0 160 145" className="letter-cat-svg" aria-label="cat holding a heart">
      <path d="M37 62 31 30l26 17c12-8 31-8 43 0l26-17-6 32c9 9 12 24 9 40-4 23-24 33-52 33S24 125 20 102c-3-16 1-31 17-40Z" fill="#ffefe9" stroke="#5b4446" strokeWidth="4" />
      <path d="M40 39 39 26l14 18M120 39l1-13-14 18" fill="none" stroke="#5b4446" strokeWidth="4" strokeLinecap="round" />
      <circle cx="61" cy="73" r="4" fill="#5b4446" /><circle cx="99" cy="73" r="4" fill="#5b4446" />
      <path d="M73 88q7 7 14 0" fill="none" stroke="#5b4446" strokeWidth="3" strokeLinecap="round" />
      <path d="M73 115 48 91q-14-14-25-1-9 13 2 24l48 30 48-30q11-11 2-24-11-13-25 1Z" fill="#ea7789" stroke="#c85c72" strokeWidth="3" />
      <path d="m73 115 24-24" stroke="#f9b3bd" strokeWidth="3" opacity=".7" />
    </svg>
  );
}

function Home() {
  const [screen, setScreen] = useState<Screen>("test");
  const [love, setLove] = useState(0);
  const [playing, setPlaying] = useState(false);
  const mood = useMemo(() => getMood(love), [love]);
  const isCorrect = love >= 1000;

  const goHub = () => setScreen("hub");
  const backToHub = () => setScreen("hub");

  return (
    <main className="gift-app">
      <div className={`scene scene-${screen}`}>
        <CornerDoodles />
        {screen === "test" && (
          <section className="screen-content test-content">
            <div className="eyebrow"><Sparkles size={14} /> a little question for you</div>
            <CatIllustration mood={mood} />
            <h1>How much do you<br />love me?</h1>
            <p className="test-response">{getMessage(love)}</p>
            <Gauge love={love} onChange={setLove} />
            <p className="micro-copy">there is only one correct answer ♡</p>
            {isCorrect && <button className="primary-button" onClick={goHub}>Next <ChevronRight size={18} /></button>}
          </section>
        )}

        {screen === "hub" && (
          <section className="screen-content hub-content">
            <div className="hub-kicker">a tiny collection of love</div>
            <h1>You passed the love test</h1>
            <p className="hub-subtitle">Your surprises are waiting for you</p>
            <div className="gift-row">
              <GiftBox variant="one" onClick={() => setScreen("bouquet")} />
              <GiftBox variant="two" onClick={() => setScreen("birds")} />
              <GiftBox variant="three" onClick={() => setScreen("letter")} />
            </div>
            <p className="hub-hint">tap a gift to open it</p>
            <div className="hub-bottom-doodle">♡　✿　♡</div>
          </section>
        )}

        {screen === "bouquet" && (
          <section className="screen-content gift-content bouquet-content">
            <button className="back-button" onClick={backToHub}><RotateCcw size={14} /> surprises</button>
            <div className="gift-kicker">a little something for you</div>
            <h1>Your Bouquet</h1>
            <p className="gift-intro">for the person who makes everything bloom</p>
            <div className="bouquet-layout">
              <div className="bouquet-notes bouquet-notes-left">{bouquetNotes.slice(0, 3).map((note) => <span key={note}>{note}</span>)}</div>
              <BouquetIllustration />
              <div className="bouquet-notes bouquet-notes-right">{bouquetNotes.slice(3).map((note) => <span key={note}>{note}</span>)}</div>
            </div>
            <button className="outline-button" onClick={backToHub}>Next <ChevronRight size={17} /></button>
          </section>
        )}

        {screen === "birds" && (
          <section className="screen-content gift-content birds-content">
            <button className="back-button" onClick={backToHub}><RotateCcw size={14} /> surprises</button>
            <div className="gift-kicker">somewhere, always together</div>
            <h1>Birds of a Feather</h1>
            <BirdsIllustration />
            <div className="music-player">
              <div className="music-icon"><Music2 size={16} /></div>
              <div className="music-meta"><strong>BIRDS OF A FEATHER</strong><span>Billie Eilish</span></div>
              <button className="music-control" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause music" : "Play music"}>{playing ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}</button>
              <div className="music-mini-controls"><SkipBack size={13} /><SkipForward size={13} /></div>
            </div>
            <p className="birds-caption">two little souls, one beautiful story ♡</p>
            <button className="outline-button" onClick={backToHub}>Next <ChevronRight size={17} /></button>
          </section>
        )}

        {screen === "letter" && (
          <section className="screen-content gift-content letter-content">
            <button className="back-button" onClick={backToHub}><RotateCcw size={14} /> surprises</button>
            <div className="gift-kicker">words I hope you keep</div>
            <h1>A Letter From My Heart</h1>
            <div className="letter-paper">
              <div className="letter-floral-edge">✿<br />❀<br />✿<br />❀<br />✿</div>
              <p>You make my life feel more beautiful and meaningful, and I feel so lucky to have you. I love you wholeheartedly, and I can't wait to continue loving you for the rest of my life.</p>
              <p>You make me smile, you make me feel safe, and you bring so much happiness into my world. I know I tell you this every day, but you truly are the most beautiful person in my eyes.</p>
              <p>Thank you for being you and for filling my heart with so much love. No matter what happens, I will always choose you.</p>
              <p className="letter-signoff">Always, forever. <Heart size={15} fill="currentColor" /></p>
              <LetterCat />
            </div>
            <button className="outline-button" onClick={backToHub}>Next <ChevronRight size={17} /></button>
          </section>
        )}
      </div>
    </main>
  );
}

export default Home;

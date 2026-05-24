import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  // Quote,
  Search,
  X,
  Menu,
  Star,
  Feather,
} from 'lucide-react';

/* ---------- TYPES ---------- */
interface TimelineItem {
  year: string;
  title: string;
  short: string;
  tag: string;
  articleId: string;
}

interface Article {
  id: string;
  title: string;
  year: string;
  place: string;
  context: string;
  quote: string;
  fact: string;
  body: string[];
  image?: string;
}

interface WorkItem {
  id: string;
  title: string;
  year: string;
  type: 'Верш' | 'Драма' | 'Зборнік' | 'Паэма';
}

/* ---------- DATA ---------- */
const TIMELINE: TimelineItem[] = [
  { year: '1882', title: 'Нараджэнне', short: 'Вязынка. На свет з’яўляецца Іван Луцэвіч.', tag: 'Пачатак', articleId: 'birth' },
  { year: '1904', title: '«Мужык»', short: 'Першая друкаваная публікацыя.', tag: 'Дэбют', articleId: 'muzhyk' },
  { year: '1906', title: '«А хто там ідзе?»', short: 'Голас цэлага народа.', tag: 'Гімн', articleId: 'ahto' },
  { year: '1908', title: '«Жалейка»', short: 'Кніга, якую хавалі ў коміны.', tag: 'Скандал', articleId: 'zhaleika' },
  { year: '1910', title: '«Курган»', short: 'Эпічны твор пра памяць і легенду.', tag: 'Эпас', articleId: 'kurhan' },
  { year: '1913', title: '«Паўлінка»', short: 'Прэм’ера першай беларускай камедыі.', tag: 'Тэатр', articleId: 'paulina' },
  { year: '1918', title: 'Час надзеі', short: 'Нацыянальнае абуджэнне і трывогі эпохі.', tag: 'Эпоха', articleId: '1918' },
  { year: '1922', title: '«Безназоўнае»', short: 'Філасофская драма пасля вайны.', tag: 'Драма', articleId: 'beznazounae' },
  { year: '1930', title: 'Ціск 1930-х', short: 'Атмасфера страху і кантролю.', tag: 'Пагроза', articleId: '1930' },
  { year: '1941', title: 'Вайна', short: 'Эвакуацыя і апошнія вершы.', tag: 'Боль', articleId: '1941' },
  { year: '1942', title: 'Смерць', short: 'Загадкавая гібель у Маскве.', tag: 'Фінал', articleId: 'death' },
];

const ARTICLES: Article[] = [
  {
    id: 'birth', title: 'Нараджэнне і карані', year: '1882',
    place: '7 ліпеня 1882 г., Вязынка, Мінская губерня',
    context: 'Сялянская сям’я арандатараў, цяжкая праца, жывая народная мова — асяроддзе, якое сфарміравала будучага паэта.',
    quote: '«Спадчынай мне ад бацькоў засталася зямля ды песня...»',
    fact: 'Сапраўднае імя — Іван Дамінікавіч Луцэвіч.',
    image: '/portrait-young.jpg',
    body: [
      'Нараджэнне ў Вязынцы стала сімвалічным пачаткам шляху чалавека, які пазней назаве сябе Купалам — паводле імя народнага свята.',
      'Сялянскае асяроддзе дало яму інтанацыю, мову і вобразнасць, з якіх вырасла ўся яго паэзія.',
    ],
  },
  {
    id: 'muzhyk', title: 'Першы друкаваны крок', year: '1904',
    place: '1904, Мінск / Вільня',
    context: 'Купала шукае свой голас — і знаходзіць яго ў абароне годнасці простага чалавека.',
    quote: '«Я мужык, дык і буду мужыком...»',
    fact: 'Гэта быў першы верш Купалы, які з’явіўся ў друкаваным выданні.',
    body: [
      'Публікацыя «Мужыка» стала ўваходам паэта ў вялікую літаратуру — і адразу заявай: пра годнасць, пра права быць сабой.',
    ],
  },
  {
    id: 'ahto', title: '«А хто там ідзе?» — гімн прачнання', year: '1906',
    place: '1906, Вільня',
    context: 'Пасля рэвалюцыі 1905 года беларускі рух набіраў сілу. Народу патрэбны быў кароткі і ясны голас.',
    quote: '«А хто там ідзе? А хто там ідзе?»',
    fact: 'Верш часта называюць паэтычным гімнам беларускага нацыянальнага абуджэння.',
    body: [
      'У гэтым творы Купала ператварыў простае пытанне ў магутны сімвал. Народ ідзе, народ прачынаецца, народ хоча быць пачутым.',
    ],
  },
  {
    id: 'zhaleika', title: '«Жалейка» і канфіскацыя', year: '1908',
    place: '1908, Вільня, падпольная друкарня',
    context: 'Рэпрэсіі пасля рэвалюцыі і страх уладаў перад нацыянальным словам зрабілі выданне небяспечнай справай.',
    quote: '«Не загаснуць зоркі, пакуль ёсць каму на іх глядзець...»',
    fact: 'Частку накладу хавалі ў комінах, гарышчах і нават у трубах.',
    image: '/zhaleika-cover.jpg',
    body: [
      '«Жалейка» — першая вялікая кніга Купалы і адзін з самых гучных літаратурных скандалаў таго часу.',
      'Канфіскацыя не аслабіла славу зборніка, а толькі зрабіла яго легендай.',
    ],
  },
  {
    id: 'kurhan', title: '«Курган» — паэма памяці', year: '1910',
    place: '1910, Вільня',
    context: 'Купала звяртаецца да тэмы гістарычнай памяці і сувязі чалавека з мінулым.',
    quote: '«Паміж пустаў, балот беларускай зямлі...»',
    fact: '«Курган» лічыцца адным з самых вобразных і міфапаэтычных твораў Купалы.',
    body: [
      'Купала спалучыў легенду, гісторыю і сучаснае адчуванне часу. Курган становіцца месцам, дзе мінулае гаворыць з жывымі.',
    ],
  },
  {
    id: 'paulina', title: 'Трыумф «Паўлінкі»', year: '1913',
    place: '1913, Вільня, Беларускі тэатр',
    context: 'Беларускай сцэне бракавала яркай нацыянальнай камедыі, зразумелай і простаму гледачу, і інтэлігенцыі.',
    quote: '«Ой, не быць гэтаму, каб Паўлінка маўчала!»',
    fact: '«Паўлінка» ледзь не трапіла пад забарону, але засталася на сцэне больш за стагоддзе.',
    image: '/paulinka-poster.jpg',
    body: [
      'Камедыя ўлюбіла беларускага гледача ў родную сцэну. Гумар, жывое маўленне і пазнавальныя характары зрабілі яе народнай.',
    ],
  },
  {
    id: '1918', title: 'На скрыжаванні надзеі і трывогі', year: '1918',
    place: '1918, Мінск / Вільня',
    context: 'Перыяд палітычных зломаў і кароткага адчування нацыянальнай магчымасці.',
    quote: '«Народ, што прачнуўся, ужо не засне...»',
    fact: 'Купала асабліва востра піша пра адказнасць інтэлігенцыі перад народам.',
    body: [
      'Год вялікіх надзей і вялікіх трывог — і ўсё гэта чуваць у тэкстах паэта.',
    ],
  },
  {
    id: 'beznazounae', title: '«Безназоўнае» — драма эпохі', year: '1922',
    place: '1922, Мінск',
    context: 'Чалавек пасля вайны і рэвалюцыі апынуўся ў свеце, дзе звыклыя апоры разбураныя.',
    quote: '«Мы — безназоўныя, мы — забытыя...»',
    fact: 'Адзін з самых філасофскіх і балючых твораў Купалы.',
    body: [
      'У гэтым творы Купала ставіць пытанні пра годнасць, памяць і тое, што робіць чалавека чалавекам у эпоху зломаў.',
    ],
  },
  {
    id: '1930', title: 'Пад націскам 1930-х', year: '1930-я',
    place: 'Мінск',
    context: 'Атмасфера падазронасці, ідэалагічнага ціску і рэпрэсій.',
    quote: '«Не кожнае слова можна было сказаць уголас...»',
    fact: 'Купала перажыў моцны маральны крызіс і апынуўся пад пільным кантролем улады.',
    body: [
      '1930-я сталі для беларускай культуры часам маўклівай трагедыі. І Купала адчуў увесь цяжар эпохі.',
    ],
  },
  {
    id: '1941', title: 'Вайна і апошнія вершы', year: '1941',
    place: 'Эвакуацыя, Масква',
    context: 'Пачатак вайны зноў вярнуў тэмы страты, Радзімы і выжывання народа.',
    quote: '«Беларусь мая, зямля мая пакутная...»',
    fact: 'У апошніх вершах гучыць матыў дому, які трэба абараніць і не страціць духоўна.',
    image: '/portrait-old.jpg',
    body: [
      'Апошні перыяд творчасці пазначаны стрыманасцю, але ў ёй хаваецца вялікая эмацыянальная сіла.',
    ],
  },
  {
    id: 'death', title: '1942: апошняя таямніца', year: '1942',
    place: '28 чэрвеня 1942, Масква',
    context: 'Смерць у гасцініцы «Масква» дагэтуль застаецца адной з самых драматычных нявысветленых старонак гісторыі.',
    quote: '«Не згасне песня, пакуль жыве народ...»',
    fact: 'Абставіны смерці і сёння выклікаюць спрэчкі і даследаванні.',
    body: [
      'Нават пасля смерці слова Купалы не страціла сілы — наадварот, яно ўвайшло ў культурную памяць Беларусі.',
    ],
  },
];

const WORKS: WorkItem[] = [
  { id: 'ahto', title: 'А хто там ідзе?', year: '1906', type: 'Верш' },
  { id: 'beznazounae', title: 'Безназоўнае', year: '1922', type: 'Драма' },
  { id: 'zhaleika', title: 'Жалейка', year: '1908', type: 'Зборнік' },
  { id: 'kurhan', title: 'Курган', year: '1910', type: 'Паэма' },
  { id: 'muzhyk', title: 'Мужык', year: '1904', type: 'Верш' },
  { id: 'paulina', title: 'Паўлінка', year: '1913', type: 'Драма' },
  { id: 'raskidanaje', title: 'Раскіданае гняздо', year: '1913', type: 'Драма' },
  { id: 'rodnae-slova', title: 'Роднае слова', year: '1908', type: 'Верш' },
];

const GALLERY = [
  { src: '/portrait-middle.jpg', label: 'Малады Купала', category: 'Фота' as const },
  { src: '/portrait-young.jpg', label: 'Малады Купала, 1911', category: 'Фота' as const },
  { src: '/portrait-old.jpg', label: 'Апошнія гады жыцця', category: 'Фота' as const },
  { src: '/zhaleika-cover.jpg', label: 'Вокладка «Жалейкі»', category: 'Кнігі' as const },
  { src: '/paulinka-poster.jpg', label: 'Афіша «Паўлінкі»', category: 'Афішы' as const },
];

const BIO = [
  { title: 'Карані', text: 'Нарадзіўся 7 ліпеня 1882 у Вязынцы. Сялянскае дзяцінства, цяжкая праца і жывая мова народа.' },
  { title: 'Дэбют', text: 'У 1904 з’яўляецца «Мужык». У 1908 — «Жалейка», канфіскаваная царызмам.' },
  { title: 'Росквіт', text: 'Стаў цэнтральнай фігурай беларускага адраджэння. «Паўлінка», «Курган», «Раскіданае гняздо».' },
  { title: 'Ціск', text: '1930-я: атмасфера страху, цяжкі маральны выбар, унутраная барацьба.' },
  { title: 'Фінал', text: 'Загінуў 28 чэрвеня 1942 у Маскве. Абставіны нявысветленыя да сёння.' },
];

/* ---------- MODAL ---------- */
function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-stone-950/70 p-3 backdrop-blur md:p-8"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#f5efe1] text-stone-900 shadow-2xl"
      >
        <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-stone-900 p-2 text-[#f5efe1] hover:bg-red-700">
          <X size={18} />
        </button>

        {article.image && (
          <div className="aspect-[16/8] overflow-hidden">
            <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
          </div>
        )}

        <div className="px-5 py-8 md:px-12 md:py-12">
          <div className="mb-2 inline-block rounded-full bg-red-700 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5efe1]">{article.year}</div>
          <h2 className="font-serif text-3xl leading-tight md:text-5xl">{article.title}</h2>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-stone-300 bg-white p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-700">📅 Калі</div>
              <p className="mt-2 text-sm leading-6">{article.place}</p>
            </div>
            <div className="rounded-2xl border border-stone-300 bg-white p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-700">🔥 Чаму</div>
              <p className="mt-2 text-sm leading-6">{article.context}</p>
            </div>
            <div className="rounded-2xl border border-stone-300 bg-white p-5 md:col-span-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-700">📖 Цытата</div>
              <blockquote className="mt-3 font-serif text-xl italic leading-snug md:text-2xl">{article.quote}</blockquote>
            </div>
            <div className="rounded-2xl border border-stone-300 bg-white p-5 md:col-span-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-700">🤔 Цікава</div>
              <p className="mt-2 text-sm leading-6">{article.fact}</p>
            </div>
          </div>

          <div className="mt-10 border-t border-stone-300 pt-8">
            <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">Артыкул</div>
            <div className="space-y-4 text-base leading-8 text-stone-800 md:text-lg">
              {article.body.map((p, i) => <p key={i} className={i === 0 ? 'first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:text-red-700' : ''}>{p}</p>)}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- APP ---------- */
export default function App() {
  const [active, setActive] = useState<Article | null>(null);
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState('');
  const [gFilter, setGFilter] = useState<'Усе' | 'Фота' | 'Кнігі' | 'Афішы' | 'Арт'>('Усе');
  const railRef = useRef<HTMLDivElement>(null);

  const openArticle = (id: string) => {
    const article = ARTICLES.find((a) => a.id === id);
    if (article) setActive(article);
    document.body.style.overflow = 'hidden';
  };

  const works = useMemo(
    () =>
      [...WORKS]
        .filter((w) => w.title.toLowerCase().includes(q.toLowerCase()))
        .sort((a, b) => a.title.localeCompare(b.title, 'be')),
    [q]
  );

  const gallery = useMemo(() => (gFilter === 'Усе' ? GALLERY : GALLERY.filter((g) => g.category === gFilter)), [gFilter]);

  const scrollRail = (dir: 'left' | 'right') => {
    railRef.current?.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f5efe1] font-sans text-stone-900 selection:bg-red-700 selection:text-white">
      {/* NAV */}
      <nav className="sticky top-0 z-40 border-b border-stone-900/10 bg-[#f5efe1]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <a href="index.html" className="flex items-center gap-2 font-serif text-xl font-bold md:text-2xl">
            <span className="text-red-700">✦</span> Купала
          </a>
          <div className="hidden gap-8 text-xs font-semibold uppercase tracking-[0.2em] md:flex">
            <a href="#timeline" className="hover:text-red-700">Лента</a>
            <a href="#bio" className="hover:text-red-700">Біяграфія</a>
            <a href="#works" className="hover:text-red-700">Творы</a>
            <a href="#gallery" className="hover:text-red-700">Галерэя</a>
          </div>
          <button className="md:hidden" onClick={() => setMenu(!menu)}>
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menu && (
          <div className="flex flex-col gap-3 border-t border-stone-900/10 bg-[#f5efe1] p-5 text-sm font-semibold uppercase tracking-[0.2em] md:hidden">
            <a href="#timeline" onClick={() => setMenu(false)}>Лента</a>
            <a href="#bio" onClick={() => setMenu(false)}>Біяграфія</a>
            <a href="#works" onClick={() => setMenu(false)}>Творы</a>
            <a href="#gallery" onClick={() => setMenu(false)}>Галерэя</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <header id="top" className="relative overflow-hidden border-b border-stone-900/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-12 md:gap-10 md:px-8 md:py-20">
          <div className="md:col-span-7">
            <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-red-700">
              <Star size={14} fill="currentColor" /> Нумар 1 · Літаратурны архіў
            </div>
            <h1 className="font-serif text-[44px] leading-[0.95] tracking-tight sm:text-6xl md:text-8xl">
              Янка<br />
              <span className="italic text-red-700">Купала</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-stone-700 md:text-lg">
              Паэт, які даў беларусам мову, годнасць і голас. Лента жыцця, ключавыя творы, артыкулы і галерэя — у адным месцы.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#timeline" className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-[#f5efe1] transition hover:bg-red-700">
                Адкрыць ленту часу <ArrowUpRight size={16} />
              </a>
              <a href="#works" className="inline-flex items-center gap-2 rounded-full border border-stone-900 px-6 py-3 text-sm font-semibold transition hover:bg-stone-900 hover:text-[#f5efe1]">
                Спіс твораў
              </a>
            </div>
          </div>
          <div className="relative md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-stone-900/10 bg-stone-200">
              <img src="/portrait-middle.jpg" alt="Янка Купала" className="h-full w-full object-cover grayscale-[0.3]" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-[#f5efe1]/95 p-4 backdrop-blur">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-700">1882 — 1942</div>
                <div className="font-serif text-xl leading-tight">Іван Дамінікавіч Луцэвіч</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rotate-[-6deg] rounded-2xl bg-red-700 px-5 py-3 font-serif italic text-[#f5efe1] shadow-xl md:block">
              «Не гасі зоркі...»
            </div>
          </div>
        </div>

        {/* Big quote ribbon */}
        <div className="border-t border-stone-900/10 bg-stone-900 text-[#f5efe1]">
          <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-hidden whitespace-nowrap px-4 py-4 font-serif text-lg md:text-2xl">
            <div className="flex gap-12 animatedScroll">

              <span>«А хто там ідзе ў вялізнай такой грамадзе?»</span>
              <span className="text-red-500">✦</span>
              <span>«Магутнае слова, ты, роднае слова!»</span>
              <span className="text-red-500">✦</span>
              <span>«Не загаснуць зоркі, пакуль ёсць каму на іх глядзець»</span>
              <span className="text-red-500">✦</span>

              <span>«А хто там ідзе ў вялізнай такой грамадзе?»</span>
              <span className="text-red-500">✦</span>
              <span>«Магутнае слова, ты, роднае слова!»</span>
              <span className="text-red-500">✦</span>
              <span>«Не загаснуць зоркі, пакуль ёсць каму на іх глядзець»</span>
              <span className="text-red-500">✦</span>

            </div>
          </div>
        </div>
      </header>

      {/* HORIZONTAL TIMELINE */}
      <section id="timeline" className="border-b border-stone-900/10 py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-red-700">Раздзел 1</div>
              <h2 className="font-serif text-4xl leading-none md:text-7xl">Лента часу</h2>
              <p className="mt-3 max-w-xl text-stone-600">Гарызантальная дарога з 11 ключавых пунктаў. Гартайце і націскайце.</p>
            </div>
            <div className="hidden gap-2 md:flex">
              <button onClick={() => scrollRail('left')} className="rounded-full border border-stone-900 p-3 transition hover:bg-stone-900 hover:text-[#f5efe1]">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scrollRail('right')} className="rounded-full border border-stone-900 p-3 transition hover:bg-stone-900 hover:text-[#f5efe1]">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={railRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:gap-6"
            style={{ scrollbarWidth: 'thin' }}
          >
            {TIMELINE.map((item, idx) => (
              <motion.button
                key={item.year + idx}
                whileHover={{ y: -4 }}
                onClick={() => openArticle(item.articleId)}
                className="group relative w-[260px] shrink-0 snap-start rounded-3xl border border-stone-900/10 bg-white p-5 text-left transition hover:border-red-700 md:w-[300px] md:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl tracking-tight text-red-700 md:text-4xl">{item.year}</span>
                  <span className="rounded-full bg-stone-100 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em]">{item.tag}</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl leading-tight md:text-3xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{item.short}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 transition group-hover:text-red-700">
                  Чытаць артыкул <ArrowUpRight size={14} />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* BIO — magazine layout */}
      <section id="bio" className="border-b border-stone-900/10 bg-stone-900 py-14 text-[#f5efe1] md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-red-400">Раздзел 2</div>
              <h2 className="font-serif text-4xl leading-none md:text-7xl">Біяграфія</h2>
            </div>
            <Feather size={32} className="hidden text-red-500 md:block" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="rounded-3xl bg-[#f5efe1] p-6 text-stone-900 md:p-10">
                <div className="font-serif text-7xl text-red-700 md:text-9xl">60</div>
                <div className="mt-2 text-sm uppercase tracking-[0.3em] text-stone-600">гадоў жыцця</div>
                <p className="mt-6 text-base leading-7 md:text-lg">
                  За шэсць дзесяцігоддзяў Купала прайшоў шлях ад сялянскага хлопчыка з Вязынкі да паэта, чыё імя стала сімвалам Беларусі.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:col-span-7 md:grid-cols-2">
              {BIO.map((b, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-400">0{i + 1}</div>
                  <div className="mt-2 font-serif text-2xl">{b.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/70">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WORKS — index style */}
      <section id="works" className="border-b border-stone-900/10 py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-red-700">Раздзел 3</div>
              <h2 className="font-serif text-4xl leading-none md:text-7xl">Творы</h2>
              <p className="mt-3 text-stone-600">Алфавітны рэестр з пазначэннем жанру і года.</p>
            </div>
            <div className="relative w-full md:max-w-xs">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Знайсці твор..."
                className="w-full rounded-full border border-stone-900/20 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-red-700"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-stone-900/10">
            <div className="hidden grid-cols-12 gap-4 border-b border-stone-900/10 bg-stone-100 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 md:grid">
              <div className="col-span-1">№</div>
              <div className="col-span-7">Назва</div>
              <div className="col-span-2">Жанр</div>
              <div className="col-span-1">Год</div>
              <div className="col-span-1 text-right">→</div>
            </div>
            {works.map((w, i) => (
              <button
                key={w.id}
                onClick={() => openArticle(w.id)}
                className="group grid w-full grid-cols-12 items-center gap-4 border-b border-stone-900/5 bg-white px-4 py-4 text-left transition last:border-0 hover:bg-stone-50 md:px-6 md:py-5"
              >
                <div className="col-span-12 font-mono text-xs text-stone-400 md:col-span-1">{String(i + 1).padStart(2, '0')}</div>
                <div className="col-span-12 font-serif text-xl group-hover:text-red-700 md:col-span-7 md:text-2xl">{w.title}</div>
                <div className="col-span-6 md:col-span-2">
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">{w.type}</span>
                </div>
                <div className="col-span-3 font-mono text-stone-600 md:col-span-1">{w.year}</div>
                <div className="col-span-3 text-right md:col-span-1">
                  <ArrowUpRight size={18} className="ml-auto transition group-hover:text-red-700 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </button>
            ))}
            {works.length === 0 && (
              <div className="bg-white px-6 py-10 text-center text-stone-400">Нічога не знойдзена</div>
            )}
          </div>
        </div>
      </section>

      {/* GALLERY — bento */}
      <section id="gallery" className="border-b border-stone-900/10 py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-red-700">Раздзел 4</div>
              <h2 className="font-serif text-4xl leading-none md:text-7xl">Галерэя</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['Усе', 'Фота', 'Кнігі', 'Афішы'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setGFilter(c)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    gFilter === c ? 'bg-red-700 text-[#f5efe1]' : 'border border-stone-900/20 hover:bg-stone-900 hover:text-[#f5efe1]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {gallery.map((g, i) => (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`group relative overflow-hidden rounded-2xl bg-stone-200 ${
                  i === 0 ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div className={`overflow-hidden`}>
                  <img src={g.src} alt={g.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-950/80 to-transparent p-3 md:p-5">
                  <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-red-400">{g.category}</div>
                  <div className="mt-1 font-serif text-sm text-[#f5efe1] md:text-lg">{g.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 px-4 py-12 text-[#f5efe1] md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-center gap-6 md:flex-row md:items-end">
          <div>
            <div className="font-serif text-3xl md:text-4xl">Янка Купала</div>
            <div className="mt-2 text-xs uppercase tracking-[0.3em] text-white/40">Літаратурны архіў</div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {active && <ArticleModal article={active} onClose={() => {
              setActive(null)
              document.body.style.overflow = "initial"
              }
            } />}
      </AnimatePresence>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

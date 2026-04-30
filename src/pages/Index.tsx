import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

// ─── Данные ─────────────────────────────────────────────────────────────────

const ARENA_BG = "https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/19484eae-364b-44fe-8f5c-7ce9a6d69010.jpg";
const AGENT_IMG = "https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/4d197a44-5307-459e-820b-c07eeba77f47.jpg";
const WEAPONS_IMG = "https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/509fbabf-2628-477c-a28a-411871fff985.jpg";

const AGENTS = [
  { id: 1, name: 'РЕЙДЕР', role: 'Штурм', img: AGENT_IMG, hp: 150, armor: 100, speed: 88, accuracy: 72, color: '#D94040' },
  { id: 2, name: 'ПРИЗРАК', role: 'Разведка', img: AGENT_IMG, hp: 120, armor: 80, speed: 96, accuracy: 90, color: '#4A8FD4' },
  { id: 3, name: 'СТРАЖ', role: 'Поддержка', img: AGENT_IMG, hp: 180, armor: 130, speed: 70, accuracy: 68, color: '#3DB87A' },
  { id: 4, name: 'ТЕНЬ', role: 'Снайпер', img: AGENT_IMG, hp: 110, armor: 60, speed: 82, accuracy: 98, color: '#9B59D4' },
];

const WEAPONS = [
  { id: 1, name: 'AK-74M', type: 'Штурм', rarity: 'legendary', damage: 94, range: 78, recoil: 62, rate: 74, img: WEAPONS_IMG },
  { id: 2, name: 'SVD', type: 'Снайпер', rarity: 'epic', damage: 99, range: 98, recoil: 45, rate: 28, img: WEAPONS_IMG },
  { id: 3, name: 'MP5-SD', type: 'ПП', rarity: 'rare', damage: 65, range: 52, recoil: 80, rate: 92, img: WEAPONS_IMG },
  { id: 4, name: 'Desert Eagle', type: 'Пистолет', rarity: 'epic', damage: 88, range: 55, recoil: 55, rate: 42, img: WEAPONS_IMG },
  { id: 5, name: 'M249', type: 'Пулемёт', rarity: 'legendary', damage: 82, range: 70, recoil: 40, rate: 98, img: WEAPONS_IMG },
  { id: 6, name: 'SPAS-12', type: 'Дробовик', rarity: 'rare', damage: 96, range: 30, recoil: 50, rate: 35, img: WEAPONS_IMG },
];

const MAPS = [
  { id: 1, name: 'ПОЛИГОН АЛЬФА', type: '5v5 Тактика', img: ARENA_BG, size: 'Средняя', time: 'День', status: 'hot' },
  { id: 2, name: 'ЗАБЫТЫЙ ЗАВОД', type: '5v5 Захват', img: ARENA_BG, size: 'Большая', time: 'Ночь', status: 'new' },
  { id: 3, name: 'ГОРОДСКОЙ КВАРТАЛ', type: '5v5 Штурм', img: ARENA_BG, size: 'Малая', time: 'Сумерки', status: '' },
  { id: 4, name: 'БАЗА КАСПИЙ', type: '5v5 Оборона', img: ARENA_BG, size: 'Большая', time: 'Рассвет', status: '' },
];

const CASES = [
  { id: 1, name: 'ОПЕРАЦИЯ ШТОРМ', price: 349, img: WEAPONS_IMG, items: 50 },
  { id: 2, name: 'ЭЛИТА СПЕЦНАЗА', price: 499, img: WEAPONS_IMG, items: 35 },
  { id: 3, name: 'МИФИЧЕСКИЙ АРСЕНАЛ', price: 799, img: WEAPONS_IMG, items: 20 },
];

const CASE_ITEMS = [
  { id: 1, name: 'AK-74 | Пустыня', rarity: 'common', chance: '45%' },
  { id: 2, name: 'MP5 | Тигр', rarity: 'rare', chance: '25%' },
  { id: 3, name: 'SVD | Хром', rarity: 'epic', chance: '15%' },
  { id: 4, name: 'Desert Eagle | Золото', rarity: 'legendary', chance: '10%' },
  { id: 5, name: 'AK-74 | Карбон', rarity: 'common', chance: '45%' },
  { id: 6, name: 'M249 | Пламя', rarity: 'legendary', chance: '10%' },
  { id: 7, name: 'SPAS | Ночной', rarity: 'rare', chance: '25%' },
  { id: 8, name: 'MP5 | Кобра', rarity: 'epic', chance: '15%' },
  { id: 9, name: 'SVD | Хром', rarity: 'mythic', chance: '5%' },
  { id: 10, name: 'AK-74 | Алмаз', rarity: 'mythic', chance: '5%' },
  { id: 11, name: 'Desert Eagle | Серебро', rarity: 'rare', chance: '25%' },
  { id: 12, name: 'M249 | Таймер', rarity: 'epic', chance: '15%' },
];

const INVENTORY_ITEMS = [
  { id: 1, name: 'AK-74 | Пустыня', type: 'Штурм', rarity: 'legendary', equipped: true },
  { id: 2, name: 'SVD | Хром', type: 'Снайпер', rarity: 'epic', equipped: false },
  { id: 3, name: 'MP5 | Тигр', type: 'ПП', rarity: 'rare', equipped: false },
  { id: 4, name: 'Агент: Призрак', type: 'Агент', rarity: 'epic', equipped: true },
  { id: 5, name: 'SPAS | Ночной', type: 'Дробовик', rarity: 'rare', equipped: false },
  { id: 6, name: 'M249 | Пламя', type: 'Пулемёт', rarity: 'legendary', equipped: false },
  { id: 7, name: 'Desert Eagle | Золото', type: 'Пистолет', rarity: 'epic', equipped: false },
  { id: 8, name: 'AK-74 | Карбон', type: 'Штурм', rarity: 'common', equipped: false },
];

const LEADERBOARD = [
  { rank: 1, name: 'PREDATOR_X', rating: 4820, kd: '4.2', wins: 342 },
  { rank: 2, name: 'GHOST_WOLF', rating: 4650, kd: '3.8', wins: 298 },
  { rank: 3, name: 'SHADOW_OPS', rating: 4410, kd: '3.5', wins: 276 },
  { rank: 4, name: 'НУРСУЛТАН99', rating: 4180, kd: '3.1', wins: 254 },
  { rank: 5, name: 'DARK_REAPER', rating: 3960, kd: '2.9', wins: 231 },
  { rank: 6, name: 'ALPHA_WOLF', rating: 3750, kd: '2.7', wins: 208 },
  { rank: 7, name: 'ВЫ', rating: 3480, kd: '2.4', wins: 187, isMe: true },
  { rank: 8, name: 'STEEL_FANG', rating: 3210, kd: '2.2', wins: 165 },
];

const MARKET_ITEMS = [
  { id: 1, name: 'AK-74 | Пустыня', type: 'Штурм', rarity: 'legendary', price: 8400, seller: 'GHOST_WOLF' },
  { id: 2, name: 'SVD | Хром Элит', type: 'Снайпер', rarity: 'mythic', price: 24000, seller: 'PREDATOR_X' },
  { id: 3, name: 'M249 | Пламя', type: 'Пулемёт', rarity: 'legendary', price: 6800, seller: 'ALPHA_WOLF' },
  { id: 4, name: 'Desert Eagle | Золото', type: 'Пистолет', rarity: 'epic', price: 3200, seller: 'SHADOW_OPS' },
  { id: 5, name: 'MP5 | Кобра', type: 'ПП', rarity: 'epic', price: 2100, seller: 'DARK_REAPER' },
  { id: 6, name: 'SPAS | Ночной', type: 'Дробовик', rarity: 'rare', price: 940, seller: 'НУРСУЛТАН99' },
];

// ─── Утилиты ─────────────────────────────────────────────────────────────────

const rarityLabel: Record<string, string> = {
  common: 'Обычное', rare: 'Редкое', epic: 'Эпическое', legendary: 'Легендарное', mythic: 'Мифическое'
};
const rarityColor: Record<string, string> = {
  common: '#9EA8B3', rare: '#4A8FD4', epic: '#9B59D4', legendary: '#C8A94A', mythic: '#D94040'
};

function StatBar({ value, color = '#C8A94A' }: { value: number; color?: string }) {
  return (
    <div className="xp-bar">
      <div className="xp-fill" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

function RarityBadge({ rarity }: { rarity: string }) {
  return (
    <span className="text-xs font-mono font-medium px-1.5 py-0.5 rounded-sm border"
      style={{ color: rarityColor[rarity], borderColor: rarityColor[rarity], background: `${rarityColor[rarity]}18` }}>
      {rarityLabel[rarity]}
    </span>
  );
}

// ─── Вкладки ─────────────────────────────────────────────────────────────────

function TabHome({ onPlay }: { onPlay: () => void }) {
  const [particles, setParticles] = useState<{ id: number; x: number; drift: number }[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(p => [
        ...p.filter(x => x.id > Date.now() - 3000),
        { id: Date.now(), x: Math.random() * 100, drift: (Math.random() - 0.5) * 40 }
      ]);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0 z-0">
        <img src={ARENA_BG} alt="Arena" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-[#080B10]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080B10] via-transparent to-[#080B10]" />
      </div>

      {particles.map(p => (
        <div key={p.id} className="particle absolute bottom-40 z-10 w-1 h-1 rounded-full bg-[#C8A94A]"
          style={{ left: `${p.x}%`, '--drift': `${p.drift}px` } as React.CSSProperties} />
      ))}

      <div className="absolute right-0 bottom-0 top-0 w-[50%] z-10 pointer-events-none">
        <img src={AGENT_IMG} alt="Agent" className="absolute bottom-0 right-0 h-[85%] object-contain object-bottom"
          style={{ filter: 'drop-shadow(-20px 0 60px rgba(200,169,74,0.3))' }} />
      </div>

      <div className="relative z-20 flex items-center justify-between px-8 pt-6">
        <div>
          <div className="text-xs font-mono text-[#C8A94A] tracking-[0.3em] mb-1">СТАТУС: ОНЛАЙН</div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#3DB87A] pulse-dot" />
            <span className="text-sm text-gray-400 font-mono">12,847 игроков онлайн</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs text-gray-500 font-mono">РЕЙТИНГ</div>
            <div className="text-gold font-bebas text-xl tracking-widest">ПЛАТИНА IV</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 font-mono">ОЧКИ</div>
            <div className="text-white font-bebas text-xl tracking-widest">3,480</div>
          </div>
        </div>
      </div>

      <div className="relative z-20 flex flex-col justify-end flex-1 px-8 pb-16">
        <div className="mb-2">
          <div className="text-xs font-mono tracking-[0.4em] text-[#C8A94A] mb-3">// ТАКТИЧЕСКИЙ ШУТЕР</div>
          <h1 className="font-bebas text-[clamp(60px,10vw,120px)] leading-none text-white glitch tracking-widest"
            data-text="SPECTRE">SPECTRE</h1>
          <div className="text-lg text-gray-400 font-light mt-2 max-w-sm">
            Реалистичная баллистика · Динамичный бой · Система урона по телу
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 mb-8">
          <div className="h-px w-12 bg-[#C8A94A]" />
          <span className="text-xs font-mono text-gray-500 tracking-widest">СЕЗОН 4 · ОПЕРАЦИЯ СТАЛЬНОЙ ШТОРМ</span>
          <div className="h-px flex-1 bg-[#C8A94A]/20" />
        </div>

        <div className="mb-8 max-w-xs">
          <div className="flex justify-between mb-1.5">
            <span className="text-xs font-mono text-gray-400">УРОВЕНЬ 47</span>
            <span className="text-xs font-mono text-[#C8A94A]">7,240 / 10,000 XP</span>
          </div>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: '72%' }} />
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <button onClick={onPlay}
            className="corner-dec relative px-10 py-4 bg-[#C8A94A] text-[#080B10] font-bebas text-xl tracking-[0.15em] hover:bg-[#E8C96A] transition-all duration-200 hover:shadow-[0_0_40px_rgba(200,169,74,0.5)] active:scale-95">
            НАЧАТЬ БОЙ
          </button>
          <button className="px-8 py-4 border border-white/20 text-white font-bebas text-xl tracking-[0.15em] hover:border-[#C8A94A]/60 hover:text-[#C8A94A] transition-all duration-200 active:scale-95">
            ТРЕНИРОВКА
          </button>
          <button className="px-8 py-4 border border-white/10 text-gray-400 font-bebas text-xl tracking-[0.15em] hover:border-white/30 hover:text-white transition-all duration-200 active:scale-95">
            ПОЛЬЗОВАТЕЛИ
          </button>
        </div>
      </div>

      <div className="relative z-20 flex items-center justify-between px-8 py-4 border-t border-white/5">
        <div className="flex gap-6">
          {[
            { label: 'К/Д', value: '2.4' },
            { label: 'ПОБЕД', value: '187' },
            { label: 'ТОЧНОСТЬ', value: '68%' },
            { label: 'ЧАСОВ', value: '420' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-[10px] text-gray-500 font-mono tracking-widest">{s.label}</div>
              <div className="text-white font-bebas text-lg tracking-wider">{s.value}</div>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-600 font-mono">v4.2.1 · BUILD 2024.04</div>
      </div>
    </div>
  );
}

function TabBattle() {
  const [selectedAgent, setSelectedAgent] = useState(0);
  const [selectedWeapon, setSelectedWeapon] = useState(0);
  const [selectedMap, setSelectedMap] = useState(0);
  const [view, setView] = useState<'modes' | 'agents' | 'weapons'>('modes');

  return (
    <div className="tab-panel min-h-screen p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500 font-mono tracking-widest mb-1">// БОЕВЫЕ РЕЖИМЫ</div>
          <h2 className="font-bebas text-4xl tracking-widest text-white">ПОДБОР МАТЧА</h2>
        </div>
        <div className="flex gap-2">
          {(['modes', 'agents', 'weapons'] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-4 py-1.5 text-sm font-mono tracking-widest border transition-all ${v === view ? 'border-[#C8A94A] text-[#C8A94A] bg-[#C8A94A]/10' : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'}`}>
              {v === 'modes' ? 'КАРТЫ' : v === 'agents' ? 'АГЕНТЫ' : 'ОРУЖИЕ'}
            </button>
          ))}
        </div>
      </div>

      {view === 'modes' && (
        <div className="grid grid-cols-2 gap-4">
          {MAPS.map((map, i) => (
            <div key={map.id} onClick={() => setSelectedMap(i)}
              className={`map-card relative rounded-sm overflow-hidden h-48 border-2 cursor-pointer transition-all ${selectedMap === i ? 'border-[#C8A94A]' : 'border-white/10'}`}>
              <img src={map.img} alt={map.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="map-overlay absolute inset-0 bg-black" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {map.status && (
                <div className="absolute top-3 right-3 px-2 py-0.5 text-xs font-mono font-bold tracking-widest rounded-sm"
                  style={{ background: map.status === 'hot' ? '#D94040' : '#3DB87A', color: '#fff' }}>
                  {map.status === 'hot' ? '🔥 ХИТ' : '✦ НОВАЯ'}
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4 map-label">
                <div className="font-bebas text-2xl tracking-widest text-white">{map.name}</div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-mono text-[#C8A94A]">{map.type}</span>
                  <span className="text-xs text-gray-400 font-mono">{map.size} · {map.time}</span>
                </div>
              </div>

              {selectedMap === i && (
                <div className="absolute inset-0 border-2 border-[#C8A94A] pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      )}

      {view === 'agents' && (
        <div className="grid grid-cols-4 gap-4">
          {AGENTS.map((agent, i) => (
            <div key={agent.id} onClick={() => setSelectedAgent(i)}
              className={`agent-card relative rounded-sm overflow-hidden border-2 transition-all ${selectedAgent === i ? 'border-[#C8A94A]' : 'border-white/10'}`}
              style={{ background: `linear-gradient(160deg, ${agent.color}15, #0D1117)` }}>
              <img src={agent.img} alt={agent.name} className="w-full h-52 object-cover object-top" />
              <div className="absolute inset-x-0 bottom-0 p-3" style={{ background: 'linear-gradient(to top, #080B10, transparent)' }}>
                <div className="font-bebas text-xl tracking-widest" style={{ color: agent.color }}>{agent.name}</div>
                <div className="text-xs text-gray-400 font-mono">{agent.role}</div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>HP</span><span className="text-white">{agent.hp}</span>
                  </div>
                  <StatBar value={(agent.hp / 200) * 100} color={agent.color} />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>СКОРОСТЬ</span><span className="text-white">{agent.speed}</span>
                  </div>
                  <StatBar value={agent.speed} color={agent.color} />
                </div>
              </div>
              {selectedAgent === i && (
                <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-sm bg-[#C8A94A]">
                  <Icon name="Check" size={14} className="text-black" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {view === 'weapons' && (
        <div className="grid grid-cols-3 gap-4">
          {WEAPONS.map((w, i) => (
            <div key={w.id} onClick={() => setSelectedWeapon(i)}
              className={`weapon-card rounded-sm border-2 p-4 transition-all ${selectedWeapon === i ? 'border-[#C8A94A] bg-[#C8A94A]/5' : 'border-white/10 bg-[#0D1117]'}`}>
              <img src={w.img} alt={w.name} className="w-full h-28 object-cover rounded-sm mb-3 opacity-90" />
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bebas text-lg tracking-widest text-white">{w.name}</div>
                  <div className="text-xs text-gray-500 font-mono">{w.type}</div>
                </div>
                <RarityBadge rarity={w.rarity} />
              </div>
              <div className="space-y-2 mt-3">
                {[
                  { label: 'УРОН', val: w.damage, color: '#D94040' },
                  { label: 'ДАЛЬНОСТЬ', val: w.range, color: '#4A8FD4' },
                  { label: 'ОТДАЧА', val: w.recoil, color: '#E07A30' },
                  { label: 'СКОРОСТЬ', val: w.rate, color: '#3DB87A' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-0.5">
                      <span>{s.label}</span><span style={{ color: s.color }}>{s.val}</span>
                    </div>
                    <StatBar value={s.val} color={s.color} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="text-sm text-gray-500 font-mono">
          Карта: <span className="text-[#C8A94A]">{MAPS[selectedMap].name}</span> ·{' '}
          Агент: <span className="text-[#C8A94A]">{AGENTS[selectedAgent].name}</span> ·{' '}
          Оружие: <span className="text-[#C8A94A]">{WEAPONS[selectedWeapon].name}</span>
        </div>
        <button className="corner-dec px-10 py-3 bg-[#C8A94A] text-[#080B10] font-bebas text-lg tracking-[0.15em] hover:bg-[#E8C96A] transition-all active:scale-95 hover:shadow-[0_0_30px_rgba(200,169,74,0.4)]">
          НАЙТИ МАТЧ
        </button>
      </div>
    </div>
  );
}

function TabCases() {
  const [selected, setSelected] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<typeof CASE_ITEMS[0] | null>(null);
  const [balance, setBalance] = useState(12500);

  const openCase = () => {
    if (selected === null) return;
    const price = CASES[selected].price;
    if (balance < price) return;
    setBalance(b => b - price);
    setSpinning(true);
    setResult(null);
    setTimeout(() => {
      setSpinning(false);
      const rand = Math.random();
      let item: typeof CASE_ITEMS[0];
      if (rand < 0.05) item = CASE_ITEMS.find(i => i.rarity === 'mythic') ?? CASE_ITEMS[0];
      else if (rand < 0.15) item = CASE_ITEMS.find(i => i.rarity === 'legendary') ?? CASE_ITEMS[0];
      else if (rand < 0.30) item = CASE_ITEMS.find(i => i.rarity === 'epic') ?? CASE_ITEMS[0];
      else if (rand < 0.55) item = CASE_ITEMS.find(i => i.rarity === 'rare') ?? CASE_ITEMS[0];
      else item = CASE_ITEMS.find(i => i.rarity === 'common') ?? CASE_ITEMS[0];
      setResult(item);
    }, 4800);
  };

  return (
    <div className="tab-panel min-h-screen p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500 font-mono tracking-widest mb-1">// СИСТЕМА КЕЙСОВ</div>
          <h2 className="font-bebas text-4xl tracking-widest text-white">ОТКРЫТИЕ КЕЙСОВ</h2>
        </div>
        <div className="flex items-center gap-3 border border-[#C8A94A]/30 px-4 py-2 rounded-sm bg-[#C8A94A]/5">
          <Icon name="Coins" size={18} className="text-[#C8A94A]" />
          <span className="font-bebas text-2xl tracking-widest text-[#C8A94A]">{balance.toLocaleString()}</span>
          <span className="text-xs text-gray-500 font-mono">SP</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {CASES.map((c, i) => (
          <div key={c.id} onClick={() => setSelected(i)}
            className={`relative rounded-sm overflow-hidden border-2 cursor-pointer transition-all hover:scale-[1.02] ${selected === i ? 'border-[#C8A94A]' : 'border-white/10'}`}>
            <img src={c.img} alt={c.name} className="w-full h-40 object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="font-bebas text-lg tracking-widest text-white">{c.name}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400 font-mono">{c.items} предметов</span>
                <span className="font-bebas text-lg text-[#C8A94A] tracking-widest">{c.price} SP</span>
              </div>
            </div>
            {selected === i && <div className="absolute inset-0 border-2 border-[#C8A94A] pointer-events-none" />}
          </div>
        ))}
      </div>

      {selected !== null && (
        <div className="border border-white/10 rounded-sm p-6 bg-[#0D1117] relative overflow-hidden">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#C8A94A] z-10" />
          <div className="absolute left-1/2 top-0 w-3 h-3 bg-[#C8A94A] transform -translate-x-1/2 rotate-45" />

          <div className="overflow-hidden">
            <div className={`flex gap-2 ${spinning ? 'case-spinning' : ''}`}
              style={{ width: `${CASE_ITEMS.length * 3 * 160}px` }}>
              {[...CASE_ITEMS, ...CASE_ITEMS, ...CASE_ITEMS].map((item, idx) => (
                <div key={idx} className="flex-shrink-0 w-36 h-32 border rounded-sm flex flex-col items-center justify-center p-2 text-center"
                  style={{ borderColor: rarityColor[item.rarity], background: `${rarityColor[item.rarity]}10` }}>
                  <div className="text-2xl mb-1">🔫</div>
                  <div className="text-xs font-mono leading-tight" style={{ color: rarityColor[item.rarity] }}>{item.name}</div>
                  <div className="text-[10px] text-gray-600 font-mono mt-1">{item.chance}</div>
                </div>
              ))}
            </div>
          </div>

          {result && !spinning && (
            <div className="mt-6 flex items-center justify-center">
              <div className="border-2 p-6 rounded-sm text-center"
                style={{ borderColor: rarityColor[result.rarity], background: `${rarityColor[result.rarity]}10` }}>
                <div className="text-3xl mb-2">🔫</div>
                <div className="font-bebas text-2xl tracking-widest" style={{ color: rarityColor[result.rarity] }}>{result.name}</div>
                <div className="mt-1"><RarityBadge rarity={result.rarity} /></div>
                <div className="text-xs text-gray-400 font-mono mt-2">Добавлено в инвентарь</div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-center gap-4">
        <button onClick={openCase}
          disabled={selected === null || spinning || balance < (selected !== null ? CASES[selected].price : 0)}
          className="corner-dec px-12 py-4 bg-[#C8A94A] text-[#080B10] font-bebas text-xl tracking-[0.15em] hover:bg-[#E8C96A] transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(200,169,74,0.4)]">
          {spinning ? 'ОТКРЫВАЕТСЯ...' : selected !== null ? `ОТКРЫТЬ ЗА ${CASES[selected].price} SP` : 'ВЫБЕРИТЕ КЕЙС'}
        </button>
      </div>

      <div>
        <div className="text-xs text-gray-500 font-mono tracking-widest mb-3">СОДЕРЖИМОЕ КЕЙСА</div>
        <div className="flex flex-wrap gap-2">
          {CASE_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-sm border text-xs font-mono"
              style={{ borderColor: `${rarityColor[item.rarity]}50`, color: rarityColor[item.rarity], background: `${rarityColor[item.rarity]}08` }}>
              <span>{item.name}</span>
              <span className="text-gray-600">{item.chance}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabInventory() {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'Штурм', 'Снайпер', 'ПП', 'Агент'];
  const filtered = INVENTORY_ITEMS.filter(i => filter === 'all' || i.type === filter);

  return (
    <div className="tab-panel min-h-screen p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500 font-mono tracking-widest mb-1">// ИНВЕНТАРЬ</div>
          <h2 className="font-bebas text-4xl tracking-widest text-white">МОЙ АРСЕНАЛ</h2>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 font-mono">СТОИМОСТЬ</div>
          <div className="font-bebas text-2xl text-[#C8A94A] tracking-widest">47,200 SP</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'ПРЕДМЕТОВ', value: '24', icon: 'Package' },
          { label: 'ЛЕГЕНД.', value: '3', icon: 'Star' },
          { label: 'МИФИЧЕСКИХ', value: '1', icon: 'Zap' },
          { label: 'НАДЕТЫ', value: '2', icon: 'Shield' },
        ].map(s => (
          <div key={s.label} className="border border-white/10 rounded-sm p-4 bg-[#0D1117] flex items-center gap-3">
            <Icon name={s.icon as string} size={20} className="text-[#C8A94A]" fallback="Package" />
            <div>
              <div className="font-bebas text-2xl text-white tracking-widest">{s.value}</div>
              <div className="text-[10px] text-gray-500 font-mono">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1 text-xs font-mono tracking-widest border rounded-sm transition-all ${filter === f ? 'border-[#C8A94A] text-[#C8A94A] bg-[#C8A94A]/10' : 'border-white/10 text-gray-500 hover:text-gray-300'}`}>
            {f === 'all' ? 'ВСЕ' : f.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filtered.map(item => (
          <div key={item.id}
            className={`weapon-card border-2 rounded-sm overflow-hidden relative ${item.equipped ? 'border-[#C8A94A]/50' : 'border-white/10'}`}
            style={{ background: `linear-gradient(160deg, ${rarityColor[item.rarity]}08, #0D1117)` }}>
            <img src={WEAPONS_IMG} alt={item.name} className="w-full h-28 object-cover opacity-70" />
            <div className="p-3">
              <div className="flex items-start justify-between gap-1 mb-1">
                <div className="font-bebas text-sm tracking-wider text-white leading-tight">{item.name}</div>
                {item.equipped && (
                  <span className="flex-shrink-0 text-[10px] font-mono text-[#3DB87A] border border-[#3DB87A]/30 px-1 rounded-sm">ВКЛ</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500 font-mono">{item.type}</span>
                <span className="text-[10px] font-mono font-medium" style={{ color: rarityColor[item.rarity] }}>
                  {rarityLabel[item.rarity].toUpperCase()}
                </span>
              </div>
            </div>
            <div className="absolute top-2 left-2 w-1 h-6 rounded-full" style={{ background: rarityColor[item.rarity] }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TabMarket() {
  const [search, setSearch] = useState('');
  const [rarityFilter, setRarityFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'price' | 'name'>('price');

  const items = MARKET_ITEMS.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) &&
    (rarityFilter === 'all' || i.rarity === rarityFilter)
  ).sort((a, b) => sortBy === 'price' ? a.price - b.price : a.name.localeCompare(b.name));

  return (
    <div className="tab-panel min-h-screen p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500 font-mono tracking-widest mb-1">// ТОРГОВАЯ ПЛОЩАДКА</div>
          <h2 className="font-bebas text-4xl tracking-widest text-white">МАРКЕТ</h2>
        </div>
        <div className="text-xs text-gray-500 font-mono">
          Комиссия: <span className="text-[#C8A94A]">5%</span>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск предметов..."
            className="w-full bg-[#0D1117] border border-white/10 rounded-sm pl-8 pr-3 py-2 text-sm font-mono text-white placeholder-gray-600 focus:border-[#C8A94A]/50 focus:outline-none" />
        </div>
        <select value={rarityFilter} onChange={e => setRarityFilter(e.target.value)}
          className="bg-[#0D1117] border border-white/10 rounded-sm px-3 py-2 text-sm font-mono text-gray-300 focus:outline-none focus:border-[#C8A94A]/50">
          <option value="all">ВСЕ РЕДКОСТИ</option>
          <option value="common">ОБЫЧНОЕ</option>
          <option value="rare">РЕДКОЕ</option>
          <option value="epic">ЭПИЧЕСКОЕ</option>
          <option value="legendary">ЛЕГЕНДАРНОЕ</option>
          <option value="mythic">МИФИЧЕСКОЕ</option>
        </select>
        <button onClick={() => setSortBy(s => s === 'price' ? 'name' : 'price')}
          className="border border-white/10 rounded-sm px-4 py-2 text-sm font-mono text-gray-400 hover:border-[#C8A94A]/30 hover:text-[#C8A94A] transition-all flex items-center gap-2">
          <Icon name="ArrowUpDown" size={14} />
          {sortBy === 'price' ? 'ПО ЦЕНЕ' : 'ПО ИМЕНИ'}
        </button>
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4 border border-white/10 rounded-sm p-4 bg-[#0D1117] hover:border-white/20 transition-all">
            <img src={WEAPONS_IMG} alt={item.name} className="w-16 h-16 object-cover rounded-sm opacity-80" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bebas text-lg tracking-wider text-white">{item.name}</span>
                <RarityBadge rarity={item.rarity} />
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                <span>{item.type}</span>
                <span>·</span>
                <span>Продавец: <span className="text-gray-300">{item.seller}</span></span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bebas text-2xl text-[#C8A94A] tracking-widest">{item.price.toLocaleString()}</div>
              <div className="text-xs text-gray-500 font-mono">SP</div>
            </div>
            <button className="px-5 py-2 bg-[#C8A94A] text-[#080B10] font-bebas tracking-widest hover:bg-[#E8C96A] transition-all active:scale-95 text-sm">
              КУПИТЬ
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-mono text-sm">Предметы не найдены</div>
        )}
      </div>
    </div>
  );
}

function TabRating() {
  return (
    <div className="tab-panel min-h-screen p-6 space-y-6">
      <div>
        <div className="text-xs text-gray-500 font-mono tracking-widest mb-1">// РЕЙТИНГ</div>
        <h2 className="font-bebas text-4xl tracking-widest text-white">ТАБЛИЦА ЛИДЕРОВ</h2>
      </div>

      <div className="border border-[#C8A94A]/30 rounded-sm p-5 bg-[#C8A94A]/5 relative overflow-hidden">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bebas text-[120px] text-[#C8A94A]/5 leading-none select-none">#7</div>
        <div className="flex items-center justify-between relative">
          <div>
            <div className="text-xs text-gray-500 font-mono mb-1">МОЙ РЕЙТИНГ</div>
            <div className="font-bebas text-3xl text-[#C8A94A] tracking-widest">ПЛАТИНА IV</div>
            <div className="text-sm text-gray-400 font-mono mt-1">3,480 очков · #7 в регионе</div>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { label: 'К/Д', value: '2.4' },
              { label: 'ПОБЕД', value: '187' },
              { label: 'ТОЧНОСТЬ', value: '68%' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-bebas text-2xl text-white tracking-widest">{s.value}</div>
                <div className="text-[10px] text-gray-500 font-mono">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 xp-bar">
          <div className="xp-fill" style={{ width: '62%' }} />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-gray-600 mt-1">
          <span>3,480 / 4,000 до ПЛАТИНА III</span>
          <span>520 очков</span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-4 px-4 py-2 text-[10px] text-gray-600 font-mono tracking-widest">
          <span className="w-8 text-center">#</span>
          <span className="flex-1">ИГРОК</span>
          <span className="w-20 text-center">РЕЙТИНГ</span>
          <span className="w-16 text-center">К/Д</span>
          <span className="w-16 text-center">ПОБЕД</span>
        </div>
        {LEADERBOARD.map(player => (
          <div key={player.rank}
            className={`flex items-center gap-4 px-4 py-3 rounded-sm border transition-all ${player.isMe ? 'border-[#C8A94A]/30 bg-[#C8A94A]/5' : 'border-white/5 bg-[#0D1117] hover:border-white/10'}`}>
            <div className="w-8 text-center">
              {player.rank <= 3 ? (
                <span className="font-bebas text-lg" style={{ color: ['#C8A94A', '#9EA8B3', '#E07A30'][player.rank - 1] }}>
                  {player.rank}
                </span>
              ) : (
                <span className="font-mono text-sm text-gray-500">{player.rank}</span>
              )}
            </div>
            <div className="flex-1 flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-[#1A2030] flex items-center justify-center text-sm">
                {player.isMe ? '👤' : '🪖'}
              </div>
              <span className={`font-bebas tracking-widest ${player.isMe ? 'text-[#C8A94A]' : 'text-white'}`}>
                {player.name}
                {player.isMe && <span className="text-xs font-mono ml-2 text-[#C8A94A]/60">(ВЫ)</span>}
              </span>
            </div>
            <div className="w-20 text-center font-bebas text-lg tracking-widest text-white">{player.rating.toLocaleString()}</div>
            <div className="w-16 text-center font-mono text-sm text-gray-300">{player.kd}</div>
            <div className="w-16 text-center font-mono text-sm text-gray-300">{player.wins}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Главный компонент ───────────────────────────────────────────────────────

type Tab = 'home' | 'battle' | 'cases' | 'inventory' | 'market' | 'rating';

const NAV_ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: 'home',      label: 'ГЛАВНАЯ',   icon: 'Home' },
  { id: 'battle',    label: 'БОЕВЫЕ',    icon: 'Crosshair' },
  { id: 'cases',     label: 'КЕЙСЫ',     icon: 'Package' },
  { id: 'inventory', label: 'ИНВЕНТАРЬ', icon: 'Shield' },
  { id: 'market',    label: 'МАРКЕТ',    icon: 'ShoppingCart' },
  { id: 'rating',    label: 'РЕЙТИНГ',   icon: 'Trophy' },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>('home');

  return (
    <div className="scanlines min-h-screen bg-[#080B10] text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 border-b border-white/5"
        style={{ background: 'rgba(8,11,16,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setTab('home')}>
          <div className="w-8 h-8 border-2 border-[#C8A94A] flex items-center justify-center">
            <Icon name="Crosshair" size={16} className="text-[#C8A94A]" />
          </div>
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.3em', color: '#C8A94A', fontSize: '1.5rem' }}>SPECTRE</span>
          <span className="text-xs text-gray-600 font-mono border border-gray-700 px-1 rounded-sm">S4</span>
        </div>

        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)}
              className={`nav-btn flex items-center gap-2 px-4 py-2 text-xs font-mono text-gray-400 hover:text-white transition-colors ${tab === n.id ? 'active' : ''}`}>
              <Icon name={n.icon as string} size={14} fallback="Home" />
              {n.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Coins" size={16} className="text-[#C8A94A]" />
            <span className="font-bebas text-lg tracking-widest text-[#C8A94A]">12,500</span>
            <span className="text-xs text-gray-500 font-mono">SP</span>
          </div>
          <button className="px-3 py-1.5 bg-[#C8A94A] text-[#080B10] font-bebas tracking-widest text-sm hover:bg-[#E8C96A] transition-all active:scale-95">
            + ПОПОЛНИТЬ
          </button>
          <div className="w-8 h-8 rounded-sm bg-[#1A2030] flex items-center justify-center border border-white/10">
            <Icon name="User" size={16} className="text-gray-400" />
          </div>
        </div>
      </nav>

      <main className="relative">
        {tab === 'home'      && <TabHome onPlay={() => setTab('battle')} />}
        {tab === 'battle'    && <TabBattle />}
        {tab === 'cases'     && <TabCases />}
        {tab === 'inventory' && <TabInventory />}
        {tab === 'market'    && <TabMarket />}
        {tab === 'rating'    && <TabRating />}
      </main>
    </div>
  );
}
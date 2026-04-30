import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

// ─── Данные ─────────────────────────────────────────────────────────────────

const ARENA_BG = "https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/19484eae-364b-44fe-8f5c-7ce9a6d69010.jpg";
const WEAPONS_IMG = "https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/509fbabf-2628-477c-a28a-411871fff985.jpg";

// Скины оружия
const WEAPON_SKINS: Record<number, { name: string; img: string; rarity: string }[]> = {
  1: [
    { name: 'Стандарт', img: WEAPONS_IMG, rarity: 'common' },
    { name: 'Кибер-Контур', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/c7403772-e4ef-43e1-9232-5ab0919dc369.jpg', rarity: 'epic' },
    { name: 'Золотой Дракон', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/82b53b2a-63c8-4c79-8b59-b1e64aa4666a.jpg', rarity: 'mythic' },
  ],
  2: [
    { name: 'Стандарт', img: WEAPONS_IMG, rarity: 'common' },
    { name: 'Красный Дракон', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/4ee38901-155b-4db1-9b9e-3b65581bea76.jpg', rarity: 'legendary' },
    { name: 'Хром Элит', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/7ea1fef2-53e2-4d09-b566-3f826cbf5f2b.jpg', rarity: 'epic' },
  ],
  3: [
    { name: 'Стандарт', img: WEAPONS_IMG, rarity: 'common' },
    { name: 'Лесной Камо', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/5abe1fab-db29-4496-ba20-fb927c7f7e07.jpg', rarity: 'rare' },
    { name: 'Тигр', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/f959ee55-9abb-47ef-bad7-cf6bb1605001.jpg', rarity: 'epic' },
  ],
  4: [
    { name: 'Стандарт', img: WEAPONS_IMG, rarity: 'common' },
    { name: 'Золотой Тигр', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/1a96cfc3-31a8-4b77-948c-68b579c9b468.jpg', rarity: 'legendary' },
    { name: '67 Six Seven', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/3739792f-d49a-4e7e-93c3-f3c748ce350e.jpg', rarity: 'mythic' },
  ],
  5: [
    { name: 'Стандарт', img: WEAPONS_IMG, rarity: 'common' },
    { name: 'Галактика', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/dc0d1659-2e41-40fa-ba64-ed726192dcb0.jpg', rarity: 'epic' },
    { name: 'Пламя', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/165def84-3e3b-4f8e-9252-6e144075bb2f.jpg', rarity: 'legendary' },
  ],
  6: [
    { name: 'Стандарт', img: WEAPONS_IMG, rarity: 'common' },
    { name: 'Огонь', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/bfa7b703-6c07-4142-9e08-b3f1a1339ba0.jpg', rarity: 'legendary' },
    { name: 'Карамбит', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/c4fe6d3a-1aad-456f-bfbd-f51c9f778b99.jpg', rarity: 'rare' },
  ],
};

// Скины агентов
const AGENT_SKINS: Record<number, { name: string; img: string; rarity: string }[]> = {
  1: [
    { name: 'Базовый', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/8ce671af-4090-460f-806f-bec011c83bca.jpg', rarity: 'common' },
    { name: 'Кровавый', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/8fce9d68-0079-4f4a-9ce2-698451df1672.jpg', rarity: 'legendary' },
  ],
  2: [
    { name: 'Базовый', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/be52eeab-a060-4704-b256-140f208fd40e.jpg', rarity: 'common' },
    { name: 'Полночь', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/693d84f8-8340-464f-afbe-80ba54c1f339.jpg', rarity: 'epic' },
  ],
  3: [
    { name: 'Базовый', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/022eba31-9440-418f-afac-047112acbf0d.jpg', rarity: 'common' },
    { name: 'Джунгли', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/cf2fbf66-838f-46de-91d8-a3b1beeaf258.jpg', rarity: 'rare' },
  ],
  4: [
    { name: 'Базовый', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/71edb878-7aa9-492b-8748-265e76f3a2d9.jpg', rarity: 'common' },
    { name: 'Теневой', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/046c6233-d255-469e-aa63-d038301be395.jpg', rarity: 'mythic' },
  ],
};

const AGENTS = [
  { id: 1, name: 'РЕЙДЕР', role: 'Штурм', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/8ce671af-4090-460f-806f-bec011c83bca.jpg', hp: 150, armor: 100, speed: 88, accuracy: 72, color: '#D94040' },
  { id: 2, name: 'ПРИЗРАК', role: 'Разведка', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/be52eeab-a060-4704-b256-140f208fd40e.jpg', hp: 120, armor: 80, speed: 96, accuracy: 90, color: '#4A8FD4' },
  { id: 3, name: 'СТРАЖ', role: 'Поддержка', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/022eba31-9440-418f-afac-047112acbf0d.jpg', hp: 180, armor: 130, speed: 70, accuracy: 68, color: '#3DB87A' },
  { id: 4, name: 'ТЕНЬ', role: 'Снайпер', img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/71edb878-7aa9-492b-8748-265e76f3a2d9.jpg', hp: 110, armor: 60, speed: 82, accuracy: 98, color: '#9B59D4' },
];

const WEAPONS = [
  { id: 1, name: 'AK-74M', type: 'Штурм', rarity: 'legendary', damage: 94, range: 78, recoil: 62, rate: 74, img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/c7403772-e4ef-43e1-9232-5ab0919dc369.jpg' },
  { id: 2, name: 'SVD', type: 'Снайпер', rarity: 'epic', damage: 99, range: 98, recoil: 45, rate: 28, img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/4ee38901-155b-4db1-9b9e-3b65581bea76.jpg' },
  { id: 3, name: 'MP5-SD', type: 'ПП', rarity: 'rare', damage: 65, range: 52, recoil: 80, rate: 92, img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/5abe1fab-db29-4496-ba20-fb927c7f7e07.jpg' },
  { id: 4, name: 'Desert Eagle', type: 'Пистолет', rarity: 'epic', damage: 88, range: 55, recoil: 55, rate: 42, img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/1a96cfc3-31a8-4b77-948c-68b579c9b468.jpg' },
  { id: 5, name: 'M249', type: 'Пулемёт', rarity: 'legendary', damage: 82, range: 70, recoil: 40, rate: 98, img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/dc0d1659-2e41-40fa-ba64-ed726192dcb0.jpg' },
  { id: 6, name: 'SPAS-12', type: 'Дробовик', rarity: 'epic', damage: 96, range: 30, recoil: 50, rate: 35, img: 'https://cdn.poehali.dev/projects/cbf40ccd-6010-4f80-a7ce-64a12b747650/files/bfa7b703-6c07-4142-9e08-b3f1a1339ba0.jpg' },
];

const MAPS = [
  { id: 1, name: 'ПОЛИГОН АЛЬФА', type: '5v5 Тактика', img: ARENA_BG, size: 'Средняя', time: 'День', status: 'hot' },
  { id: 2, name: 'ЗАБЫТЫЙ ЗАВОД', type: '5v5 Захват', img: ARENA_BG, size: 'Большая', time: 'Ночь', status: 'new' },
  { id: 3, name: 'ГОРОДСКОЙ КВАРТАЛ', type: '5v5 Штурм', img: ARENA_BG, size: 'Малая', time: 'Сумерки', status: '' },
  { id: 4, name: 'БАЗА КАСПИЙ', type: '5v5 Оборона', img: ARENA_BG, size: 'Большая', time: 'Рассвет', status: '' },
];

const CASES = [
  { id: 1, name: 'ОПЕРАЦИЯ ШТОРМ', price: 349, img: WEAPONS_IMG, items: 50, type: 'weapons' },
  { id: 2, name: 'ЭЛИТА СПЕЦНАЗА', price: 499, img: WEAPONS_IMG, items: 35, type: 'weapons' },
  { id: 3, name: 'МИФИЧЕСКИЙ АРСЕНАЛ', price: 799, img: WEAPONS_IMG, items: 20, type: 'weapons' },
  { id: 4, name: 'ЭЛИТНЫЕ АГЕНТЫ', price: 10000, img: AGENT_IMG, items: 5, type: 'agents' },
];

const AGENT_CASE_ITEMS = [
  { id: 1, name: 'Агент: РЕЙДЕР АЛЬФА', rarity: 'legendary', chance: '25%', emoji: '🪖' },
  { id: 2, name: 'Агент: ПРИЗРАК НОЧИ', rarity: 'mythic', chance: '10%', emoji: '👻' },
  { id: 3, name: 'Агент: СТРАЖ СТАЛИ', rarity: 'epic', chance: '30%', emoji: '🛡️' },
  { id: 4, name: 'Агент: ТЕНЬ ВОЙНЫ', rarity: 'legendary', chance: '25%', emoji: '🌑' },
  { id: 5, name: 'Агент: КОМАНДИР', rarity: 'mythic', chance: '10%', emoji: '⭐' },
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
  const [agentSkins, setAgentSkins] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const [weaponSkins, setWeaponSkins] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  const [skinModal, setSkinModal] = useState<{ type: 'agent' | 'weapon'; id: number } | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchDone, setSearchDone] = useState(false);

  const startSearch = () => {
    setSearching(true);
    setTimeout(() => { setSearching(false); setSearchDone(true); }, 3000);
    setTimeout(() => setSearchDone(false), 6000);
  };

  const getSkinImg = (weaponId: number) => {
    const skins = WEAPON_SKINS[weaponId];
    const idx = weaponSkins[weaponId] ?? 0;
    return skins?.[idx]?.img ?? WEAPONS_IMG;
  };
  const getAgentSkinImg = (agentId: number) => {
    const skins = AGENT_SKINS[agentId];
    const idx = agentSkins[agentId] ?? 0;
    return skins?.[idx]?.img ?? AGENTS.find(a => a.id === agentId)?.img ?? '';
  };

  return (
    <div className="tab-panel min-h-screen p-6 space-y-6">
      {/* Скин-модалка */}
      {skinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setSkinModal(null)}>
          <div className="bg-[#0D1117] border border-[#C8A94A]/30 rounded-sm p-6 w-96 max-w-[90vw]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-bebas text-xl tracking-widest text-white">ВЫБОР СКИНА</span>
              <button onClick={() => setSkinModal(null)} className="text-gray-500 hover:text-white"><Icon name="X" size={18} /></button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(skinModal.type === 'weapon' ? WEAPON_SKINS[skinModal.id] : AGENT_SKINS[skinModal.id])?.map((skin, idx) => {
                const isSelected = skinModal.type === 'weapon'
                  ? (weaponSkins[skinModal.id] ?? 0) === idx
                  : (agentSkins[skinModal.id] ?? 0) === idx;
                return (
                  <div key={idx} onClick={() => {
                    if (skinModal.type === 'weapon') setWeaponSkins(s => ({ ...s, [skinModal.id]: idx }));
                    else setAgentSkins(s => ({ ...s, [skinModal.id]: idx }));
                  }}
                    className={`cursor-pointer rounded-sm border-2 overflow-hidden transition-all ${isSelected ? 'border-[#C8A94A]' : 'border-white/10 hover:border-white/30'}`}>
                    <img src={skin.img} alt={skin.name} className="w-full h-20 object-cover" />
                    <div className="p-2">
                      <div className="text-xs font-mono text-white truncate">{skin.name}</div>
                      <div className="text-[10px] font-mono mt-0.5" style={{ color: rarityColor[skin.rarity] }}>
                        {rarityLabel[skin.rarity]}
                      </div>
                    </div>
                    {isSelected && <div className="absolute inset-0 border-2 border-[#C8A94A]" />}
                  </div>
                );
              })}
            </div>
            <button onClick={() => setSkinModal(null)}
              className="w-full mt-4 py-2 bg-[#C8A94A] text-[#080B10] font-bebas tracking-widest hover:bg-[#E8C96A] transition-all">
              ПРИМЕНИТЬ
            </button>
          </div>
        </div>
      )}

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
              {selectedMap === i && <div className="absolute inset-0 border-2 border-[#C8A94A] pointer-events-none" />}
            </div>
          ))}
        </div>
      )}

      {view === 'agents' && (
        <div className="grid grid-cols-4 gap-4">
          {AGENTS.map((agent, i) => {
            const skinIdx = agentSkins[agent.id] ?? 0;
            const skin = AGENT_SKINS[agent.id]?.[skinIdx];
            const currentImg = skin?.img ?? agent.img;
            return (
              <div key={agent.id} onClick={() => setSelectedAgent(i)}
                className={`agent-card relative rounded-sm overflow-hidden border-2 transition-all ${selectedAgent === i ? 'border-[#C8A94A]' : 'border-white/10'}`}
                style={{ background: `linear-gradient(160deg, ${agent.color}15, #0D1117)` }}>
                <img src={currentImg} alt={agent.name} className="w-full h-52 object-cover object-top" />
                {/* Скин-бейдж */}
                {skinIdx > 0 && skin && (
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-sm"
                    style={{ background: rarityColor[skin.rarity], color: '#080B10' }}>
                    {skin.name}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-3" style={{ background: 'linear-gradient(to top, #080B10, transparent)' }}>
                  <div className="font-bebas text-xl tracking-widest" style={{ color: agent.color }}>{agent.name}</div>
                  <div className="text-xs text-gray-400 font-mono mb-2">{agent.role}</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                      <span>HP</span><span className="text-white">{agent.hp}</span>
                    </div>
                    <StatBar value={(agent.hp / 200) * 100} color={agent.color} />
                    <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                      <span>СКОРОСТЬ</span><span className="text-white">{agent.speed}</span>
                    </div>
                    <StatBar value={agent.speed} color={agent.color} />
                  </div>
                  {/* Кнопка скина */}
                  <button onClick={e => { e.stopPropagation(); setSkinModal({ type: 'agent', id: agent.id }); }}
                    className="mt-2 w-full py-1 text-[10px] font-mono border border-white/20 text-gray-400 hover:border-[#C8A94A]/50 hover:text-[#C8A94A] transition-all rounded-sm">
                    🎨 СКИНЫ ({AGENT_SKINS[agent.id]?.length ?? 1})
                  </button>
                </div>
                {selectedAgent === i && (
                  <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-sm bg-[#C8A94A]">
                    <Icon name="Check" size={14} className="text-black" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {view === 'weapons' && (
        <div className="grid grid-cols-3 gap-4">
          {WEAPONS.map((w, i) => {
            const skinIdx = weaponSkins[w.id] ?? 0;
            const skin = WEAPON_SKINS[w.id]?.[skinIdx];
            return (
              <div key={w.id} onClick={() => setSelectedWeapon(i)}
                className={`weapon-card rounded-sm border-2 p-4 transition-all ${selectedWeapon === i ? 'border-[#C8A94A] bg-[#C8A94A]/5' : 'border-white/10 bg-[#0D1117]'}`}>
                <div className="relative mb-3">
                  <img src={getSkinImg(w.id)} alt={w.name} className="w-full h-28 object-cover rounded-sm opacity-90" />
                  {skinIdx > 0 && skin && (
                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-sm"
                      style={{ background: rarityColor[skin.rarity], color: '#080B10' }}>
                      {skin.name}
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bebas text-lg tracking-widest text-white">{w.name}</div>
                    <div className="text-xs text-gray-500 font-mono">{w.type}</div>
                  </div>
                  <RarityBadge rarity={w.rarity} />
                </div>
                <div className="space-y-2 mt-2">
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
                <button onClick={e => { e.stopPropagation(); setSkinModal({ type: 'weapon', id: w.id }); }}
                  className="mt-3 w-full py-1 text-[10px] font-mono border border-white/20 text-gray-400 hover:border-[#C8A94A]/50 hover:text-[#C8A94A] transition-all rounded-sm">
                  🎨 СКИНЫ ({WEAPON_SKINS[w.id]?.length ?? 1})
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="text-sm text-gray-500 font-mono">
          Карта: <span className="text-[#C8A94A]">{MAPS[selectedMap].name}</span> ·{' '}
          Агент: <span className="text-[#C8A94A]">{AGENTS[selectedAgent].name}</span> ·{' '}
          Оружие: <span className="text-[#C8A94A]">{WEAPONS[selectedWeapon].name}</span>
        </div>
        {searchDone ? (
          <div className="flex items-center gap-3 px-6 py-3 border border-[#3DB87A]/40 bg-[#3DB87A]/10 rounded-sm">
            <div className="w-2 h-2 rounded-full bg-[#3DB87A] pulse-dot" />
            <span className="font-bebas text-lg tracking-widest text-[#3DB87A]">МАТЧ НАЙДЕН!</span>
          </div>
        ) : (
          <button onClick={startSearch} disabled={searching}
            className="corner-dec relative overflow-hidden px-10 py-3 bg-[#C8A94A] text-[#080B10] font-bebas text-lg tracking-[0.15em] hover:bg-[#E8C96A] transition-all active:scale-95 disabled:opacity-70 hover:shadow-[0_0_30px_rgba(200,169,74,0.4)]">
            {searching ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#080B10]/40 border-t-[#080B10] rounded-full animate-spin" />
                ПОИСК...
              </span>
            ) : 'НАЙТИ МАТЧ'}
          </button>
        )}
      </div>
    </div>
  );
}

function TabCases({ balance, setBalance }: { balance: number; setBalance: React.Dispatch<React.SetStateAction<number>> }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{ name: string; rarity: string; chance: string; emoji?: string } | null>(null);

  const currentCase = selected !== null ? CASES[selected] : null;
  const isAgentCase = currentCase?.type === 'agents';
  const poolItems = isAgentCase ? AGENT_CASE_ITEMS : CASE_ITEMS;

  const openCase = () => {
    if (selected === null || !currentCase) return;
    if (balance < currentCase.price) return;
    setBalance(b => b - currentCase.price);
    setSpinning(true);
    setResult(null);
    setTimeout(() => {
      setSpinning(false);
      const rand = Math.random();
      let item: typeof poolItems[0];
      if (isAgentCase) {
        if (rand < 0.20) item = poolItems.find(i => i.rarity === 'mythic') ?? poolItems[0];
        else if (rand < 0.50) item = poolItems.find(i => i.rarity === 'legendary') ?? poolItems[0];
        else item = poolItems.find(i => i.rarity === 'epic') ?? poolItems[0];
      } else {
        if (rand < 0.05) item = poolItems.find(i => i.rarity === 'mythic') ?? poolItems[0];
        else if (rand < 0.15) item = poolItems.find(i => i.rarity === 'legendary') ?? poolItems[0];
        else if (rand < 0.30) item = poolItems.find(i => i.rarity === 'epic') ?? poolItems[0];
        else if (rand < 0.55) item = poolItems.find(i => i.rarity === 'rare') ?? poolItems[0];
        else item = poolItems.find(i => i.rarity === 'common') ?? poolItems[0];
      }
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

      <div className="grid grid-cols-4 gap-4">
        {CASES.map((c, i) => {
          const isElite = c.type === 'agents';
          return (
            <div key={c.id} onClick={() => { setSelected(i); setResult(null); }}
              className={`relative rounded-sm overflow-hidden border-2 cursor-pointer transition-all hover:scale-[1.02] ${selected === i ? 'border-[#C8A94A]' : isElite ? 'border-[#D94040]/50' : 'border-white/10'}`}>
              <img src={c.img} alt={c.name} className="w-full h-40 object-cover opacity-60" />
              <div className="absolute inset-0" style={{ background: isElite ? 'linear-gradient(to top, rgba(80,0,0,0.95), rgba(40,0,0,0.5) 60%, transparent)' : 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }} />
              {isElite && (
                <div className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest rounded-sm bg-[#D94040] text-white">
                  👑 ЭКСКЛЮЗИВ
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="font-bebas text-base tracking-widest text-white leading-tight">{c.name}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400 font-mono">{c.items} предм.</span>
                  <span className={`font-bebas text-lg tracking-widest ${isElite ? 'text-[#D94040]' : 'text-[#C8A94A]'}`}>{c.price.toLocaleString()} SP</span>
                </div>
              </div>
              {selected === i && <div className="absolute inset-0 border-2 border-[#C8A94A] pointer-events-none" />}
            </div>
          );
        })}
      </div>

      {selected !== null && (
        <div className={`border rounded-sm p-6 relative overflow-hidden ${isAgentCase ? 'border-[#D94040]/30 bg-[#1A0505]' : 'border-white/10 bg-[#0D1117]'}`}>
          <div className={`absolute left-1/2 top-0 bottom-0 w-0.5 z-10 ${isAgentCase ? 'bg-[#D94040]' : 'bg-[#C8A94A]'}`} />
          <div className={`absolute left-1/2 top-0 w-3 h-3 transform -translate-x-1/2 rotate-45 ${isAgentCase ? 'bg-[#D94040]' : 'bg-[#C8A94A]'}`} />

          <div className="overflow-hidden">
            <div className={`flex gap-2 ${spinning ? 'case-spinning' : ''}`}
              style={{ width: `${poolItems.length * 3 * 160}px` }}>
              {[...poolItems, ...poolItems, ...poolItems].map((item, idx) => (
                <div key={idx} className="flex-shrink-0 w-36 h-32 border rounded-sm flex flex-col items-center justify-center p-2 text-center"
                  style={{ borderColor: rarityColor[item.rarity], background: `${rarityColor[item.rarity]}10` }}>
                  <div className="text-2xl mb-1">{'emoji' in item ? item.emoji : '🔫'}</div>
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
                <div className="text-4xl mb-2">{'emoji' in result ? (result as { emoji?: string }).emoji ?? '🔫' : '🔫'}</div>
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
          disabled={selected === null || spinning || balance < (currentCase?.price ?? 0)}
          className="corner-dec px-12 py-4 bg-[#C8A94A] text-[#080B10] font-bebas text-xl tracking-[0.15em] hover:bg-[#E8C96A] transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(200,169,74,0.4)]">
          {spinning ? 'ОТКРЫВАЕТСЯ...' : currentCase ? `ОТКРЫТЬ ЗА ${currentCase.price.toLocaleString()} SP` : 'ВЫБЕРИТЕ КЕЙС'}
        </button>
      </div>

      {selected !== null && (
        <div>
          <div className="text-xs text-gray-500 font-mono tracking-widest mb-3">СОДЕРЖИМОЕ КЕЙСА</div>
          <div className="flex flex-wrap gap-2">
            {poolItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-sm border text-xs font-mono"
                style={{ borderColor: `${rarityColor[item.rarity]}50`, color: rarityColor[item.rarity], background: `${rarityColor[item.rarity]}08` }}>
                {'emoji' in item && <span>{(item as { emoji?: string }).emoji}</span>}
                <span>{item.name}</span>
                <span className="text-gray-600">{item.chance}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Донат (только для создателя) ────────────────────────────────────────────

const CREATOR_CODE = 'spectre2024';

const DONATE_PACKS = [
  { label: '500 SP', amount: 500, price: '79₽', bonus: '' },
  { label: '1 500 SP', amount: 1500, price: '199₽', bonus: '+200 БОНУС' },
  { label: '3 000 SP', amount: 3000, price: '349₽', bonus: '+500 БОНУС' },
  { label: '6 500 SP', amount: 6500, price: '699₽', bonus: '+1 000 БОНУС' },
  { label: '13 500 SP', amount: 13500, price: '1 299₽', bonus: '+2 500 БОНУС' },
  { label: '30 000 SP', amount: 30000, price: '2 499₽', bonus: '+7 000 БОНУС' },
];

function TabDonate({ balance, setBalance }: { balance: number; setBalance: React.Dispatch<React.SetStateAction<number>> }) {
  const [isCreator, setIsCreator] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const tryCode = () => {
    if (codeInput.trim().toLowerCase() === CREATOR_CODE) {
      setIsCreator(true);
      setCodeError(false);
    } else {
      setCodeError(true);
      setTimeout(() => setCodeError(false), 1500);
    }
  };

  const addCustom = () => {
    const n = parseInt(customAmount.replace(/\D/g, ''), 10);
    if (!n || n <= 0) return;
    setBalance(b => b + n);
    showToast(`+${n.toLocaleString()} SP добавлено на баланс`);
    setCustomAmount('');
  };

  const buyPack = (amount: number, label: string) => {
    setBalance(b => b + amount);
    showToast(`+${amount.toLocaleString()} SP — ${label} зачислено!`);
  };

  return (
    <div className="tab-panel min-h-screen p-6 space-y-6">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-sm bg-[#3DB87A] text-white font-bebas text-lg tracking-widest shadow-lg animate-fade-in">
          ✓ {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500 font-mono tracking-widest mb-1">// ПОПОЛНЕНИЕ</div>
          <h2 className="font-bebas text-4xl tracking-widest text-white">ДОНАТ</h2>
        </div>
        <div className="flex items-center gap-3 border border-[#C8A94A]/30 px-4 py-2 rounded-sm bg-[#C8A94A]/5">
          <Icon name="Coins" size={18} className="text-[#C8A94A]" />
          <span className="font-bebas text-2xl tracking-widest text-[#C8A94A]">{balance.toLocaleString()}</span>
          <span className="text-xs text-gray-500 font-mono">SP</span>
        </div>
      </div>

      {/* Стандартные пакеты */}
      <div className="grid grid-cols-3 gap-4">
        {DONATE_PACKS.map(pack => (
          <div key={pack.amount} className="border border-white/10 rounded-sm p-5 bg-[#0D1117] hover:border-[#C8A94A]/30 transition-all group relative overflow-hidden">
            {pack.bonus && (
              <div className="absolute top-0 right-0 px-2 py-0.5 text-[10px] font-mono font-bold bg-[#3DB87A] text-white tracking-widest">
                {pack.bonus}
              </div>
            )}
            <div className="font-bebas text-3xl text-[#C8A94A] tracking-widest mb-1">{pack.label}</div>
            <div className="text-xs text-gray-500 font-mono mb-4">SPECTRE POINTS</div>
            <button onClick={() => buyPack(pack.amount, pack.label)}
              className="w-full py-2 bg-[#C8A94A] text-[#080B10] font-bebas tracking-widest hover:bg-[#E8C96A] transition-all active:scale-95 text-sm">
              {pack.price}
            </button>
          </div>
        ))}
      </div>

      {/* Панель создателя */}
      <div className={`border rounded-sm p-6 transition-all ${isCreator ? 'border-[#D94040]/50 bg-[#D94040]/5' : 'border-white/10 bg-[#0D1117]'}`}>
        {!isCreator ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Lock" size={16} className="text-gray-500" />
              <span className="text-xs text-gray-500 font-mono tracking-widest">ДОСТУП ОГРАНИЧЕН</span>
            </div>
            <div className="text-sm text-gray-400 font-mono mb-4">Введите код создателя для получения расширенного доступа</div>
            <div className="flex gap-3">
              <input
                type="password"
                value={codeInput}
                onChange={e => setCodeInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && tryCode()}
                placeholder="Код создателя..."
                className={`flex-1 bg-[#080B10] border rounded-sm px-4 py-2 text-sm font-mono text-white placeholder-gray-600 focus:outline-none transition-all ${codeError ? 'border-[#D94040] animate-pulse' : 'border-white/10 focus:border-[#C8A94A]/50'}`}
              />
              <button onClick={tryCode}
                className="px-6 py-2 border border-white/20 text-gray-300 font-bebas tracking-widest text-sm hover:border-[#C8A94A]/40 hover:text-[#C8A94A] transition-all">
                ВОЙТИ
              </button>
            </div>
            {codeError && <div className="text-xs text-[#D94040] font-mono mt-2">Неверный код</div>}
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-sm bg-[#D94040]/20 border border-[#D94040]/40 flex items-center justify-center">
                <Icon name="Crown" size={16} className="text-[#D94040]" />
              </div>
              <div>
                <div className="font-bebas text-lg tracking-widest text-[#D94040]">РЕЖИМ СОЗДАТЕЛЯ</div>
                <div className="text-xs text-gray-500 font-mono">Полный доступ активирован</div>
              </div>
              <button onClick={() => setIsCreator(false)} className="ml-auto text-xs text-gray-600 hover:text-gray-400 font-mono">выйти</button>
            </div>

            <div className="text-xs text-gray-500 font-mono tracking-widest mb-3">ПРОИЗВОЛЬНОЕ ПОПОЛНЕНИЕ</div>
            <div className="flex gap-3 mb-4">
              <input
                type="number"
                value={customAmount}
                onChange={e => setCustomAmount(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustom()}
                placeholder="Введите сумму SP..."
                min={1}
                className="flex-1 bg-[#080B10] border border-[#D94040]/30 rounded-sm px-4 py-3 text-lg font-bebas tracking-widest text-[#C8A94A] placeholder-gray-700 focus:outline-none focus:border-[#D94040]/60"
              />
              <button onClick={addCustom}
                className="px-8 py-3 bg-[#D94040] text-white font-bebas text-lg tracking-widest hover:bg-[#F05050] transition-all active:scale-95">
                + ДОБАВИТЬ
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {[1000, 5000, 10000, 50000, 100000, 999999].map(n => (
                <button key={n} onClick={() => { setBalance(b => b + n); showToast(`+${n.toLocaleString()} SP добавлено`); }}
                  className="px-4 py-1.5 border border-[#D94040]/30 rounded-sm text-sm font-bebas tracking-wider text-[#D94040] hover:bg-[#D94040]/10 transition-all active:scale-95">
                  +{n.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        )}
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

// ─── Настройки ───────────────────────────────────────────────────────────────

function TabSettings() {
  const [graphics, setGraphics] = useState<'low' | 'medium' | 'high' | 'ultra'>('high');
  const [sounds, setSounds] = useState(true);
  const [music, setMusic] = useState(true);
  const [vibro, setVibro] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [crosshair, setCrosshair] = useState<'dot' | 'cross' | 'circle' | 'dynamic'>('cross');
  const [sensitivity, setSensitivity] = useState(65);
  const [aimSens, setAimSens] = useState(40);
  const [fov, setFov] = useState(90);
  const [volume, setVolume] = useState(80);
  const [musicVolume, setMusicVolume] = useState(50);
  const [lang, setLang] = useState<'ru' | 'en'>('ru');
  const [theme, setTheme] = useState<'dark' | 'darker'>('dark');
  const [autoReload, setAutoReload] = useState(true);
  const [showHitmarkers, setShowHitmarkers] = useState(true);
  const [showMinimap, setShowMinimap] = useState(true);
  const [showFps, setShowFps] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [installState, setInstallState] = useState<'idle' | 'available' | 'installed' | 'unsupported'>('idle');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallState('available');
    };
    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstallState('installed');
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const [downloading, setDownloading] = useState(false);
  const [dlProgress, setDlProgress] = useState(0);

  const handleInstall = async () => {
    // Сначала пробуем нативный PWA prompt
    if (deferredPrompt) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const prompt = deferredPrompt as any;
      prompt.prompt();
      const result = await prompt.userChoice;
      if (result.outcome === 'accepted') {
        setInstallState('installed');
        setDeferredPrompt(null);
        showToast('SPECTRE установлен на рабочий стол!');
      }
      return;
    }

    // Запускаем скачивание APK/shortcut через браузер
    setDownloading(true);
    setDlProgress(0);

    // Анимируем прогресс
    const steps = [5, 15, 28, 44, 61, 75, 88, 96, 100];
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 300 + Math.random() * 400));
      setDlProgress(steps[i]);
    }

    // Создаём HTML-файл ярлыка, который браузер скачивает в папку «Загрузки»
    const shortcutHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SPECTRE — Tactical Combat</title>
<meta http-equiv="refresh" content="0; url=${window.location.href}">
<style>
  body { margin:0; background:#080B10; display:flex; align-items:center; justify-content:center; min-height:100vh; font-family:'Roboto',sans-serif; }
  .wrap { text-align:center; color:#fff; }
  .logo { font-size:64px; font-weight:900; letter-spacing:0.3em; color:#C8A94A; margin-bottom:8px; }
  .sub { color:#555; font-size:13px; margin-bottom:24px; }
  a { display:inline-block; padding:14px 40px; background:#C8A94A; color:#080B10; text-decoration:none; font-weight:700; font-size:16px; letter-spacing:0.1em; }
</style>
</head>
<body>
<div class="wrap">
  <div class="logo">SPECTRE</div>
  <div class="sub">Тактический шутер нового поколения</div>
  <a href="${window.location.href}">▶ ЗАПУСТИТЬ ИГРУ</a>
</div>
</body>
</html>`;

    const blob = new Blob([shortcutHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SPECTRE-Game.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloading(false);
    setInstallState('installed');
    showToast('Файл скачан! Открой из «Загрузок» на телефоне.');
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-all ${value ? 'bg-[#C8A94A]' : 'bg-[#2A3040]'}`}>
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${value ? 'left-6' : 'left-1'}`} />
    </button>
  );

  const SliderRow = ({ label, value, onChange, min = 0, max = 100, unit = '' }: {
    label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; unit?: string;
  }) => (
    <div className="flex items-center gap-4">
      <span className="text-xs font-mono text-gray-400 w-36">{label}</span>
      <div className="flex-1 relative h-1 bg-[#2A3040] rounded-full">
        <div className="absolute left-0 top-0 h-full rounded-full bg-[#C8A94A]" style={{ width: `${((value - min) / (max - min)) * 100}%` }} />
        <input type="range" min={min} max={max} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full" />
      </div>
      <span className="text-sm font-bebas tracking-widest text-[#C8A94A] w-14 text-right">{value}{unit}</span>
    </div>
  );

  const Section = ({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) => (
    <div className="border border-white/10 rounded-sm bg-[#0D1117] overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5 bg-[#0A0E14]">
        <Icon name={icon as string} size={14} className="text-[#C8A94A]" fallback="Settings" />
        <span className="text-xs font-mono tracking-[0.2em] text-gray-400">{title}</span>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );

  const Row = ({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="text-sm text-white font-mono">{label}</div>
        {desc && <div className="text-xs text-gray-500 mt-0.5">{desc}</div>}
      </div>
      {children}
    </div>
  );

  return (
    <div className="tab-panel min-h-screen p-6 space-y-6 max-w-3xl mx-auto">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-sm bg-[#C8A94A] text-[#080B10] font-bebas text-base tracking-widest shadow-2xl" style={{ animation: 'tabFadeIn 0.3s ease-out' }}>
          {toast}
        </div>
      )}

      <div>
        <div className="text-xs text-gray-500 font-mono tracking-widest mb-1">// КОНФИГУРАЦИЯ</div>
        <h2 className="font-bebas text-4xl tracking-widest text-white">НАСТРОЙКИ</h2>
      </div>

      {/* ══ УСТАНОВКА PWA ══ */}
      <div className="relative rounded-sm overflow-hidden border-2 border-[#C8A94A]/40 bg-[#0D1117]">
        <div className="absolute inset-0 opacity-10">
          <img src={ARENA_BG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 border-2 border-[#C8A94A] flex items-center justify-center rounded-sm">
                  <Icon name="Smartphone" size={20} className="text-[#C8A94A]" />
                </div>
                <div>
                  <div className="font-bebas text-xl tracking-widest text-white">SPECTRE — МОБИЛЬНАЯ ВЕРСИЯ</div>
                  <div className="text-xs text-[#C8A94A] font-mono">Запускай прямо с рабочего стола</div>
                </div>
              </div>
              <div className="text-sm text-gray-400 mb-4 max-w-sm">
                Установи игру на телефон — запускай без браузера, как обычное приложение. Без AppStore и Google Play.
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-mono text-gray-500">
                {['Без рекламы', 'Работает офлайн', 'Иконка на экране', 'Быстрый запуск'].map(f => (
                  <span key={f} className="flex items-center gap-1">
                    <span className="text-[#3DB87A]">✓</span> {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 flex-shrink-0">
              {installState === 'installed' && !downloading ? (
                <div className="flex items-center gap-2 px-6 py-3 border border-[#3DB87A]/40 rounded-sm bg-[#3DB87A]/10">
                  <Icon name="CheckCircle" size={18} className="text-[#3DB87A]" />
                  <span className="font-bebas tracking-widest text-[#3DB87A]">СКАЧАНО ✓</span>
                </div>
              ) : downloading ? (
                <div className="w-56">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-gray-400">SPECTRE-Game.html</span>
                    <span className="font-bebas text-lg text-[#C8A94A] tracking-widest">{dlProgress}%</span>
                  </div>
                  <div className="h-2 bg-[#1A2030] rounded-full overflow-hidden">
                    <div className="h-full bg-[#C8A94A] rounded-full transition-all duration-300"
                      style={{ width: `${dlProgress}%`, boxShadow: '0 0 8px rgba(200,169,74,0.6)' }} />
                  </div>
                  <div className="text-[10px] text-gray-600 font-mono mt-1.5">
                    {dlProgress < 100 ? '⬇ Скачивание...' : '✓ Готово!'}
                  </div>
                </div>
              ) : (
                <button onClick={handleInstall} disabled={downloading}
                  className="corner-dec relative overflow-hidden flex items-center gap-3 px-8 py-4 bg-[#C8A94A] text-[#080B10] font-bebas text-lg tracking-[0.15em] hover:bg-[#E8C96A] transition-all active:scale-95 hover:shadow-[0_0_30px_rgba(200,169,74,0.5)] disabled:opacity-50">
                  <Icon name="Download" size={20} />
                  СКАЧАТЬ ИГРУ
                </button>
              )}
              <div className="text-[10px] text-gray-600 font-mono text-right">
                {installState === 'available' ? '🟢 PWA: готово к установке' :
                 installState === 'installed' ? '🟢 Файл в папке «Загрузки»' :
                 '📱 Файл появится в «Загрузках»'}
              </div>
            </div>
          </div>

          {/* Шаги для мобильного */}
          <div className="mt-5 pt-4 border-t border-white/5 grid grid-cols-3 gap-3">
            {[
              { step: '01', text: 'Нажми «СКАЧАТЬ ИГРУ»', icon: 'Download' },
              { step: '02', text: 'Разреши установку в браузере', icon: 'Smartphone' },
              { step: '03', text: 'Открывай с рабочего стола', icon: 'Play' },
            ].map(s => (
              <div key={s.step} className="flex items-center gap-2">
                <span className="font-bebas text-[#C8A94A]/40 text-2xl leading-none">{s.step}</span>
                <span className="text-xs text-gray-500 font-mono leading-tight">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ ГРАФИКА ══ */}
      <Section title="ГРАФИКА И ПРОИЗВОДИТЕЛЬНОСТЬ" icon="Monitor">
        <Row label="Качество графики" desc="Влияет на плавность и детализацию">
          <div className="flex gap-1">
            {(['low', 'medium', 'high', 'ultra'] as const).map(q => (
              <button key={q} onClick={() => setGraphics(q)}
                className={`px-3 py-1 text-xs font-mono rounded-sm border transition-all ${graphics === q ? 'border-[#C8A94A] text-[#C8A94A] bg-[#C8A94A]/10' : 'border-white/10 text-gray-500 hover:text-gray-300'}`}>
                {q === 'low' ? 'НИЗКОЕ' : q === 'medium' ? 'СРЕДНЕЕ' : q === 'high' ? 'ВЫСОКОЕ' : 'ULTRA'}
              </button>
            ))}
          </div>
        </Row>
        <SliderRow label="Поле зрения (FOV)" value={fov} onChange={setFov} min={60} max={120} unit="°" />
        <Row label="Показывать FPS" desc="Счётчик кадров в углу экрана">
          <Toggle value={showFps} onChange={setShowFps} />
        </Row>
      </Section>

      {/* ══ УПРАВЛЕНИЕ ══ */}
      <Section title="УПРАВЛЕНИЕ" icon="Gamepad2">
        <SliderRow label="Чувствительность" value={sensitivity} onChange={setSensitivity} unit="" />
        <SliderRow label="Прицеливание (ADS)" value={aimSens} onChange={setAimSens} unit="" />
        <Row label="Тип прицела">
          <div className="flex gap-1">
            {(['dot', 'cross', 'circle', 'dynamic'] as const).map(c => (
              <button key={c} onClick={() => setCrosshair(c)}
                className={`px-2 py-1 text-xs font-mono rounded-sm border transition-all ${crosshair === c ? 'border-[#C8A94A] text-[#C8A94A] bg-[#C8A94A]/10' : 'border-white/10 text-gray-500'}`}>
                {c === 'dot' ? '·' : c === 'cross' ? '+' : c === 'circle' ? '○' : '⊕'}
              </button>
            ))}
          </div>
        </Row>
        <Row label="Автоматическая перезарядка">
          <Toggle value={autoReload} onChange={setAutoReload} />
        </Row>
        <Row label="Вибрация при попадании">
          <Toggle value={vibro} onChange={setVibro} />
        </Row>
      </Section>

      {/* ══ ЗВУК ══ */}
      <Section title="ЗВУК" icon="Volume2">
        <Row label="Звуковые эффекты">
          <Toggle value={sounds} onChange={setSounds} />
        </Row>
        <SliderRow label="Громкость эффектов" value={volume} onChange={setVolume} unit="%" />
        <Row label="Музыка">
          <Toggle value={music} onChange={setMusic} />
        </Row>
        <SliderRow label="Громкость музыки" value={musicVolume} onChange={setMusicVolume} unit="%" />
      </Section>

      {/* ══ HUD ══ */}
      <Section title="ИНТЕРФЕЙС (HUD)" icon="Layout">
        <Row label="Хитмаркеры" desc="Значок при попадании в противника">
          <Toggle value={showHitmarkers} onChange={setShowHitmarkers} />
        </Row>
        <Row label="Мини-карта">
          <Toggle value={showMinimap} onChange={setShowMinimap} />
        </Row>
        <Row label="Язык интерфейса">
          <div className="flex gap-1">
            {(['ru', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-4 py-1 text-xs font-mono rounded-sm border transition-all ${lang === l ? 'border-[#C8A94A] text-[#C8A94A] bg-[#C8A94A]/10' : 'border-white/10 text-gray-500'}`}>
                {l === 'ru' ? '🇷🇺 RU' : '🇺🇸 EN'}
              </button>
            ))}
          </div>
        </Row>
        <Row label="Тема оформления">
          <div className="flex gap-1">
            {(['dark', 'darker'] as const).map(t => (
              <button key={t} onClick={() => setTheme(t)}
                className={`px-3 py-1 text-xs font-mono rounded-sm border transition-all ${theme === t ? 'border-[#C8A94A] text-[#C8A94A] bg-[#C8A94A]/10' : 'border-white/10 text-gray-500'}`}>
                {t === 'dark' ? 'ТЁМНАЯ' : 'ЧЁРНАЯ'}
              </button>
            ))}
          </div>
        </Row>
      </Section>

      {/* ══ УВЕДОМЛЕНИЯ ══ */}
      <Section title="УВЕДОМЛЕНИЯ" icon="Bell">
        <Row label="Push-уведомления" desc="События сезона, турниры, акции">
          <Toggle value={notifications} onChange={setNotifications} />
        </Row>
        <Row label="Уведомления о торгах" desc="Когда предмет на маркете продан">
          <Toggle value={true} onChange={() => {}} />
        </Row>
      </Section>

      {/* ══ АККАУНТ ══ */}
      <Section title="АККАУНТ" icon="User">
        <Row label="Никнейм">
          <div className="flex items-center gap-2">
            <span className="font-bebas text-lg tracking-widest text-white">КОМАНДИР_67</span>
            <button onClick={() => showToast('Изменение никнейма: скоро')}
              className="text-xs text-gray-500 border border-white/10 px-2 py-0.5 rounded-sm hover:border-[#C8A94A]/30 hover:text-[#C8A94A] transition-all">
              изменить
            </button>
          </div>
        </Row>
        <Row label="ID игрока" desc="Для добавления в друзья">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-[#C8A94A] bg-[#C8A94A]/10 border border-[#C8A94A]/20 px-3 py-1 rounded-sm">#SPX-67SIX</span>
            <button onClick={() => { navigator.clipboard.writeText('#SPX-67SIX'); showToast('ID скопирован!'); }}
              className="text-gray-500 hover:text-[#C8A94A] transition-all">
              <Icon name="Copy" size={14} />
            </button>
          </div>
        </Row>
        <Row label="Привязать аккаунт">
          <div className="flex gap-2">
            <button onClick={() => showToast('Привязка Google: скоро')}
              className="px-4 py-1.5 border border-white/10 text-gray-400 text-xs font-mono rounded-sm hover:border-white/30 hover:text-white transition-all">
              Google
            </button>
            <button onClick={() => showToast('Привязка Telegram: скоро')}
              className="px-4 py-1.5 border border-white/10 text-gray-400 text-xs font-mono rounded-sm hover:border-white/30 hover:text-white transition-all">
              Telegram
            </button>
          </div>
        </Row>
      </Section>

      {/* ══ ДАННЫЕ ══ */}
      <Section title="ДАННЫЕ И КОНФИДЕНЦИАЛЬНОСТЬ" icon="Database">
        <Row label="Сбор аналитики" desc="Помогает улучшать игру">
          <Toggle value={true} onChange={() => {}} />
        </Row>
        <Row label="Очистить кэш">
          <button onClick={() => showToast('Кэш очищен!')}
            className="px-4 py-1.5 border border-white/10 text-gray-400 text-xs font-mono rounded-sm hover:border-[#D94040]/40 hover:text-[#D94040] transition-all">
            ОЧИСТИТЬ
          </button>
        </Row>
        <Row label="Версия игры">
          <span className="text-xs font-mono text-gray-500">v4.2.1 · Сезон 4</span>
        </Row>
      </Section>

      {/* Сохранить */}
      <div className="flex justify-end">
        <button onClick={() => showToast('Настройки сохранены!')}
          className="corner-dec px-10 py-3 bg-[#C8A94A] text-[#080B10] font-bebas text-lg tracking-[0.15em] hover:bg-[#E8C96A] transition-all active:scale-95">
          СОХРАНИТЬ
        </button>
      </div>
    </div>
  );
}

// ─── Главный компонент ───────────────────────────────────────────────────────

type Tab = 'home' | 'battle' | 'cases' | 'inventory' | 'market' | 'rating' | 'donate' | 'settings';

const NAV_ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: 'home',      label: 'ГЛАВНАЯ',   icon: 'Home' },
  { id: 'battle',    label: 'БОЕВЫЕ',    icon: 'Crosshair' },
  { id: 'cases',     label: 'КЕЙСЫ',     icon: 'Package' },
  { id: 'inventory', label: 'ИНВЕНТАРЬ', icon: 'Shield' },
  { id: 'market',    label: 'МАРКЕТ',    icon: 'ShoppingCart' },
  { id: 'rating',    label: 'РЕЙТИНГ',   icon: 'Trophy' },
  { id: 'donate',    label: 'ДОНАТ',     icon: 'CreditCard' },
  { id: 'settings',  label: 'НАСТРОЙКИ', icon: 'Settings' },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>('home');
  const [balance, setBalance] = useState(12500);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

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
              className={`nav-btn flex items-center gap-2 px-4 py-2 text-xs font-mono hover:text-white transition-colors ${tab === n.id ? 'active text-[#C8A94A]' : n.id === 'donate' ? 'text-[#C8A94A]/70 hover:text-[#C8A94A]' : 'text-gray-400'}`}>
              <Icon name={n.icon as string} size={14} fallback="Home" />
              {n.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Coins" size={16} className="text-[#C8A94A]" />
            <span className="font-bebas text-lg tracking-widest text-[#C8A94A]">{balance.toLocaleString()}</span>
            <span className="text-xs text-gray-500 font-mono">SP</span>
          </div>
          <button onClick={() => setTab('donate')}
            className="px-3 py-1.5 bg-[#C8A94A] text-[#080B10] font-bebas tracking-widest text-sm hover:bg-[#E8C96A] transition-all active:scale-95">
            + ПОПОЛНИТЬ
          </button>
          <button onClick={() => setTab('settings')}
            className={`w-8 h-8 rounded-sm flex items-center justify-center border transition-all ${tab === 'settings' ? 'border-[#C8A94A]/50 bg-[#C8A94A]/10' : 'border-white/10 bg-[#1A2030] hover:border-white/30'}`}>
            <Icon name="Settings" size={16} className={tab === 'settings' ? 'text-[#C8A94A]' : 'text-gray-400'} />
          </button>
          <button onClick={toggleFullscreen}
            title={isFullscreen ? 'Выйти из полноэкранного режима' : 'На весь экран'}
            className={`w-8 h-8 rounded-sm flex items-center justify-center border transition-all hover:border-[#C8A94A]/50 hover:bg-[#C8A94A]/10 ${isFullscreen ? 'border-[#C8A94A]/50 bg-[#C8A94A]/10' : 'border-white/10 bg-[#1A2030]'}`}>
            <Icon name={isFullscreen ? 'Minimize' : 'Maximize'} size={15} className={isFullscreen ? 'text-[#C8A94A]' : 'text-gray-400'} />
          </button>
          <div className="w-8 h-8 rounded-sm bg-[#1A2030] flex items-center justify-center border border-white/10">
            <Icon name="User" size={16} className="text-gray-400" />
          </div>
        </div>
      </nav>

      <main className="relative">
        {tab === 'home'      && <TabHome onPlay={() => setTab('battle')} />}
        {tab === 'battle'    && <TabBattle />}
        {tab === 'cases'     && <TabCases balance={balance} setBalance={setBalance} />}
        {tab === 'inventory' && <TabInventory />}
        {tab === 'market'    && <TabMarket />}
        {tab === 'rating'    && <TabRating />}
        {tab === 'donate'    && <TabDonate balance={balance} setBalance={setBalance} />}
        {tab === 'settings'  && <TabSettings />}
      </main>
    </div>
  );
}
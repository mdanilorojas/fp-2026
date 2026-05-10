'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KEY_COLORS, type KeyColor } from '@/hooks/useHouseStore';

type Cell = { id: number; symbol: number } | null;
type Board = Cell[][]; // board[row][col]

const SIZE = 7;
const SYMBOLS = 7;
const MOVES = 24;
const GOAL = 18;

/** Deterministic-ish id generator — only used for React keys, not cryptography */
let idSeed = 1;
const nextId = () => idSeed++;

function randomSymbol() {
  return Math.floor(Math.random() * SYMBOLS);
}

function makeBoard(): Board {
  const b: Board = Array.from({ length: SIZE }, () => Array<Cell>(SIZE).fill(null));
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      let s = randomSymbol();
      // avoid starting matches of 3+
      let safety = 0;
      while (
        ((c >= 2 && b[r][c - 1]?.symbol === s && b[r][c - 2]?.symbol === s) ||
          (r >= 2 && b[r - 1][c]?.symbol === s && b[r - 2][c]?.symbol === s)) &&
        safety++ < 20
      ) {
        s = randomSymbol();
      }
      b[r][c] = { id: nextId(), symbol: s };
    }
  }
  return b;
}

function findMatches(b: Board): Set<string> {
  const matched = new Set<string>();
  // rows
  for (let r = 0; r < SIZE; r++) {
    let run = 1;
    for (let c = 1; c <= SIZE; c++) {
      const same = c < SIZE && b[r][c] && b[r][c - 1] && b[r][c]!.symbol === b[r][c - 1]!.symbol;
      if (same) {
        run++;
      } else {
        if (run >= 3) {
          for (let k = 0; k < run; k++) matched.add(`${r},${c - 1 - k}`);
        }
        run = 1;
      }
    }
  }
  // cols
  for (let c = 0; c < SIZE; c++) {
    let run = 1;
    for (let r = 1; r <= SIZE; r++) {
      const same = r < SIZE && b[r]?.[c] && b[r - 1]?.[c] && b[r]![c]!.symbol === b[r - 1]![c]!.symbol;
      if (same) {
        run++;
      } else {
        if (run >= 3) {
          for (let k = 0; k < run; k++) matched.add(`${r - 1 - k},${c}`);
        }
        run = 1;
      }
    }
  }
  return matched;
}

function applyGravity(b: Board): Board {
  const next: Board = b.map((row) => row.slice());
  for (let c = 0; c < SIZE; c++) {
    // collect non-null from bottom to top
    const column: Cell[] = [];
    for (let r = SIZE - 1; r >= 0; r--) {
      if (next[r][c]) column.push(next[r][c]);
    }
    // fill from bottom
    for (let r = SIZE - 1; r >= 0; r--) {
      const idxFromBottom = SIZE - 1 - r;
      if (idxFromBottom < column.length) {
        next[r][c] = column[idxFromBottom];
      } else {
        next[r][c] = { id: nextId(), symbol: randomSymbol() };
      }
    }
  }
  return next;
}

function adjacent(a: [number, number], b: [number, number]) {
  const [r1, c1] = a;
  const [r2, c2] = b;
  return (Math.abs(r1 - r2) === 1 && c1 === c2) || (Math.abs(c1 - c2) === 1 && r1 === r2);
}

type Props = {
  onWin: (color: KeyColor) => void;
};

export function KitchenMatch3({ onWin }: Props) {
  const [board, setBoard] = useState<Board>(() => makeBoard());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [moves, setMoves] = useState(MOVES);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [won, setWon] = useState(false);
  const [clearing, setClearing] = useState<Set<string>>(new Set());
  const wonRef = useRef(false);

  const triggerWin = useCallback(() => {
    if (wonRef.current) return;
    wonRef.current = true;
    setWon(true);
    const color = KEY_COLORS[Math.floor(Math.random() * KEY_COLORS.length)];
    // small delay so the last match animation finishes visibly
    setTimeout(() => onWin(color), 900);
  }, [onWin]);

  // Resolve cascading matches after any board change
  const resolveCascade = useCallback(
    async (startBoard: Board) => {
      let current = startBoard;
      let totalCleared = 0;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const matches = findMatches(current);
        if (matches.size === 0) break;
        setClearing(matches);
        totalCleared += matches.size;
        await new Promise((r) => setTimeout(r, 320));

        const afterClear: Board = current.map((row, r) =>
          row.map((cell, c) => (matches.has(`${r},${c}`) ? null : cell)),
        );
        current = applyGravity(afterClear);
        setBoard(current);
        setClearing(new Set());
        await new Promise((r) => setTimeout(r, 240));
      }

      if (totalCleared > 0) {
        setScore((s) => {
          const next = s + totalCleared;
          if (next >= GOAL) triggerWin();
          return next;
        });
      }
      return totalCleared;
    },
    [triggerWin],
  );

  const tryMove = useCallback(
    async (a: [number, number], b: [number, number]) => {
      if (locked || won) return;
      if (!adjacent(a, b)) {
        setSelected(b);
        return;
      }
      setLocked(true);
      // swap
      const swapped: Board = board.map((row) => row.slice());
      const [r1, c1] = a;
      const [r2, c2] = b;
      [swapped[r1][c1], swapped[r2][c2]] = [swapped[r2][c2], swapped[r1][c1]];
      setBoard(swapped);
      setSelected(null);
      await new Promise((r) => setTimeout(r, 180));

      const matches = findMatches(swapped);
      if (matches.size === 0) {
        // revert
        const reverted: Board = swapped.map((row) => row.slice());
        [reverted[r1][c1], reverted[r2][c2]] = [reverted[r2][c2], reverted[r1][c1]];
        setBoard(reverted);
        await new Promise((r) => setTimeout(r, 180));
        setLocked(false);
        return;
      }

      const cleared = await resolveCascade(swapped);
      if (cleared > 0) {
        setMoves((m) => {
          const next = m - 1;
          return next;
        });
      }
      setLocked(false);
    },
    [board, locked, resolveCascade, won],
  );

  // Generous fallback: if moves hit 0 and score under goal, grant win anyway
  useEffect(() => {
    if (moves <= 0 && !won && score < GOAL) {
      const t = setTimeout(() => triggerWin(), 600);
      return () => clearTimeout(t);
    }
  }, [moves, score, triggerWin, won]);

  const handleTap = (r: number, c: number) => {
    if (locked || won) return;
    if (!selected) {
      setSelected([r, c]);
      return;
    }
    if (selected[0] === r && selected[1] === c) {
      setSelected(null);
      return;
    }
    tryMove(selected, [r, c]);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* HUD */}
      <div className="flex justify-between items-baseline mb-3 border-b-2 border-border pb-3">
        <div>
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted">
            Partida — llave
          </span>
          <p
            className="font-display text-xl md:text-2xl leading-none mt-1"
            style={{ fontVariationSettings: '"opsz" 36, "SOFT" 80, "WONK" 1' }}
          >
            Encuentra <em>tres iguales</em>
          </p>
        </div>
        <div className="flex gap-4 md:gap-6 font-mono text-[11px] tracking-[0.14em] uppercase">
          <div className="text-right">
            <span className="block text-muted">Movidas</span>
            <span
              className="text-fg text-xl md:text-2xl tabular-nums"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {moves}
            </span>
          </div>
          <div className="text-right">
            <span className="block text-muted">Llevas</span>
            <span
              className="text-accent text-xl md:text-2xl tabular-nums"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {Math.min(score, GOAL)}/{GOAL}
            </span>
          </div>
        </div>
      </div>

      {/* progress bar */}
      <div className="h-1.5 w-full bg-bg border-2 border-border mb-4">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${Math.min(100, (score / GOAL) * 100)}%` }}
        />
      </div>

      {/* Board */}
      <div
        className="relative border-2 border-border bg-surface p-2 md:p-3"
        style={{ aspectRatio: '1 / 1' }}
      >
        <div
          className="grid w-full h-full gap-1 md:gap-1.5"
          style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => {
              const key = cell?.id ?? `empty-${r}-${c}`;
              const isSelected = selected && selected[0] === r && selected[1] === c;
              const isClearing = clearing.has(`${r},${c}`);
              return (
                <button
                  key={key}
                  onClick={() => handleTap(r, c)}
                  disabled={locked || won}
                  aria-label={`Celda ${r + 1},${c + 1}`}
                  className={`relative aspect-square flex items-center justify-center border transition-colors ${
                    isSelected ? 'border-accent bg-accent-weak' : 'border-border/30 bg-bg'
                  }`}
                >
                  <AnimatePresence mode="popLayout">
                    {cell && (
                      <motion.span
                        key={cell.id}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{
                          scale: isClearing ? 1.25 : 1,
                          opacity: isClearing ? 0 : 1,
                          rotate: isClearing ? 12 : 0,
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="w-[78%] h-[78%] inline-flex items-center justify-center"
                      >
                        <Symbol index={cell.symbol} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            }),
          )}
        </div>

        {won && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-bg/90 backdrop-blur-sm"
          >
            <div className="text-center px-6">
              <p
                className="font-display text-3xl md:text-4xl leading-none"
                style={{ fontVariationSettings: '"opsz" 72, "SOFT" 80, "WONK" 1' }}
              >
                La <em>encontraste</em>.
              </p>
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted mt-3">
                // la llave cae…
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/**
 * 6 "family face" symbols — each person gets a bold ring color so matches read
 * instantly, plus the initial as a fallback when a photo can't load.
 *
 * objectPosition lets us shift the crop toward a face in group photos.
 */
type FaceSymbol = {
  person: string;
  /** kept for typing compatibility; no longer rendered */
  initial?: string;
  src: string;
  /** CSS object-position for cropping the face out of the photo */
  pos: string;
  ring: string;
  rim: string;
};

/**
 * Faces are pre-cropped headshots placed by the user at /public/photos/caras/.
 * Seven distinct colored rings — one per face — so matches read instantly.
 * The ring color (not the person's identity) is what the game matches on;
 * the photos are icing.
 */
const FACES: readonly FaceSymbol[] = [
  { person: '1', initial: '', src: '/photos/caras/cara-1.png', pos: '50% 35%', ring: '#ff2d2d', rim: '#7a0000' }, // rojo neón
  { person: '2', initial: '', src: '/photos/caras/cara-2.png', pos: '50% 35%', ring: '#1da1ff', rim: '#033d73' }, // azul eléctrico
  { person: '3', initial: '', src: '/photos/caras/cara-3.png', pos: '50% 35%', ring: '#ffd000', rim: '#6b4b00' }, // amarillo canario
  { person: '4', initial: '', src: '/photos/caras/cara-4.png', pos: '50% 35%', ring: '#12d15b', rim: '#0a4c22' }, // verde lima
  { person: '5', initial: '', src: '/photos/caras/cara-5.png', pos: '50% 35%', ring: '#c13dff', rim: '#430c66' }, // violeta vivo
  { person: '6', initial: '', src: '/photos/caras/cara-6.png', pos: '50% 35%', ring: '#ff6a00', rim: '#6b2200' }, // naranja fuego
  { person: '7', initial: '', src: '/photos/caras/cara-7.png', pos: '50% 35%', ring: '#00dcd0', rim: '#003b38' }, // cyan eléctrico
] as const;

function Symbol({ index }: { index: number }) {
  const f = FACES[index];
  if (!f) return null;
  return (
    <span
      className="relative block w-full h-full rounded-full overflow-hidden"
      style={{
        boxShadow: `inset 0 0 0 6px ${f.ring}, inset 0 0 0 8px ${f.rim}`,
        background: f.ring,
      }}
      aria-label={f.person}
    >
      <img
        src={f.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-[8px] w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-full"
        style={{ objectPosition: f.pos }}
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
    </span>
  );
}

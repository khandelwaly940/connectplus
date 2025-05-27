import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const allMessages = [
  "Analyzing your skills...",
  "Matching learning time...",
  "Generating roadmap...",
  
  "Crunching numbers...",
  "Mapping your learning journey...",
  "Optimizing your brainwaves...",
  
  "Unlocking secret knowledge...",
  "Connecting the dots...",
  "Building your path to mastery...",
  "Scanning the matrix...",
  "Aligning your stars...",
  "Charging up creativity...",
  "Decoding your ambitions...",
  "Plotting your success...",
  "Mixing in some magic...",
  "Sharpening your focus...",
  "Leveling up your skills...",
  "Preparing your adventure...",
];

const TYPING_SPEED = 50; // ms per character
const MESSAGE_DELAY = 900; // ms to show full message before next
const MIN_DURATION = 15000;  // 15 seconds minimum for overlay
const MIN_VISIBLE_PER_MESSAGE = 1000; // 1 second per message after typing

function getRandomMessages(count = 4) {
  const arr = [...allMessages]; // make a copy
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

const DOT_COUNT = 6;
const WIDTH = 320;
const HEIGHT = 60;
const DOT_RADIUS = 7;
const CYCLE_DURATION = 2000; // ms for one cycle (dots appear, connect, pause, disappear)
const CYCLE_DELAY = 1000;    // 1 second delay before next set

function getRandomDots() {
  const minDist = 70; // More space between dots
  const dots = [];
  let attempts = 0;
  while (dots.length < DOT_COUNT && attempts < 1000) {
    const x = Math.random() * (WIDTH - 2 * DOT_RADIUS) + DOT_RADIUS;
    const y = Math.random() * (HEIGHT - 2 * DOT_RADIUS) + DOT_RADIUS;
    const tooClose = dots.some(dot => Math.hypot(dot.x - x, dot.y - y) < minDist);
    if (!tooClose) {
      dots.push({ x, y });
    }
    attempts++;
  }
  // If we can't find enough spaced-out dots, just return what we have
  return dots;
}

function ConnectingDots() {
  const [dots, setDots] = useState(getRandomDots());
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDots([]);
      setTimeout(() => {
        setDots(getRandomDots());
        setCycleKey(k => k + 1);
      }, CYCLE_DELAY); // 1 second delay before next set
    }, CYCLE_DURATION);
    return () => clearTimeout(timer);
  }, [cycleKey]);

  return (
    <svg width={WIDTH} height={HEIGHT} style={{ display: 'block', margin: '24px auto 0' }}>
      <AnimatePresence>
        {/* Lines */}
        {dots.slice(1).map((dot, i) => (
          <motion.line
            key={`line-${cycleKey}-${i}`}
            x1={dots[i].x}
            y1={dots[i].y}
            x2={dot.x}
            y2={dot.y}
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15 * i + 0.5, duration: 0.4 }}
          />
        ))}
        {/* Dots */}
        {dots.map((dot, i) => (
          <motion.circle
            key={`dot-${cycleKey}-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={DOT_RADIUS}
            fill="#fff"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.1 * i, type: 'spring', stiffness: 200, damping: 15 }}
            style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))' }}
          />
        ))}
      </AnimatePresence>
    </svg>
  );
}

const GeneratingOverlay = ({ open, onFinish }) => {
  const [messages, setMessages] = useState([]);
  const [currentMsg, setCurrentMsg] = useState(0);
  const [typed, setTyped] = useState('');
  const [show, setShow] = useState(open);

  useEffect(() => {
    if (!open) return;
    setShow(true);
    const randomMsgs = getRandomMessages(Math.floor(Math.random() * 3) + 3); // 3-5 messages
    setMessages(randomMsgs);
    setCurrentMsg(0);
    setTyped('');
    let msgIdx = 0;
    let charIdx = 0;
    let typingTimeout, messageTimeout, visibleTimeout;
    const startTime = Date.now();

    const typeNextChar = () => {
      if (charIdx < randomMsgs[msgIdx].length) {
        setTyped(randomMsgs[msgIdx].slice(0, charIdx + 1));
        charIdx++;
        typingTimeout = setTimeout(typeNextChar, TYPING_SPEED);
      } else {
        // Message fully typed, now wait at least MIN_VISIBLE_PER_MESSAGE
        visibleTimeout = setTimeout(() => {
          if (msgIdx < randomMsgs.length - 1) {
            msgIdx++;
            charIdx = 0;
            setCurrentMsg(msgIdx);
            setTyped('');
            typingTimeout = setTimeout(typeNextChar, TYPING_SPEED);
          } else {
            // All messages done, ensure minimum overlay duration
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(MIN_DURATION - elapsed, 0);
            setTimeout(() => {
              setShow(false);
              if (onFinish) onFinish();
            }, remaining + 700); // +700 for fade out
          }
        }, MIN_VISIBLE_PER_MESSAGE);
      }
    };

    typeNextChar();

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(messageTimeout);
      clearTimeout(visibleTimeout);
    };
  }, [open, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(20, 30, 50, 0.85)',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress size={64} thickness={5} sx={{ color: '#fff', mb: 4 }} />
          <Typography
            variant="h5"
            sx={{
              color: '#fff',
              fontFamily: 'monospace',
              letterSpacing: 1.5,
              mt: 2,
              minHeight: 40
            }}
          >
            {typed}
            <span className="blinking-cursor" style={{ opacity: 0.7 }}>|</span>
          </Typography>
          <ConnectingDots />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GeneratingOverlay; 
import React, { useState, useEffect } from 'react';
import { ClockIcon, MinusIcon, PlusIcon } from '@heroicons/react/outline';
import { useTransition, animated, config, useSpring } from 'react-spring';

interface AppProps {}

const defaultTimeLimit = 60;
const timeLimitInterval = 15;
const maxTimeLimit = 180;

function App({}: AppProps) {
  const [timeLimit, setTimeLimit] = useState(defaultTimeLimit);
  const [count, setCount] = useState(timeLimit);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count <= 0) return;
      setCount(count - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);

  const [styles, api] = useSpring(() => ({}));

  const onClick = () => {
    if (count !== 0) {
      api.start({
        from: { backgroundColor: '#FEF3C7' },
        to: { backgroundColor: 'white' },
      });
    }
    setCount(timeLimit);
  };

  const addTimeLimit = () => {
    setTimeLimit(Math.min(timeLimit + timeLimitInterval, maxTimeLimit));
  };

  const reduceTimeLimit = () => {
    setTimeLimit(Math.max(timeLimit - timeLimitInterval, 15));
  };

  return (
    <div
      className={classnames([
        'font-mono',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'h-full',
      ])}
    >
      <div
        className={classnames([
          'h-14',
          'w-full',
          'bg-white',
          'flex',
          'justify-between',
          'items-center',
        ])}
      >
        <MinusIcon
          className={classnames(['w-4', 'm-4'])}
          onClick={reduceTimeLimit}
        />
        <div className={classnames(['flex', 'justify-center', 'items-center'])}>
          <ClockIcon className={classnames(['w-5', 'm-1', 'text-gray-400'])} />
          <span className={classnames(['text-lg'])}>{timeLimit}</span>
        </div>
        <PlusIcon
          className={classnames(['w-4', 'm-4'])}
          onClick={addTimeLimit}
        />
      </div>

      <animated.div
          className={classnames([
            'w-full',
            'h-full',
          ])}
        onClick={onClick}
        style={styles}
      >
        <div
          className={classnames([
            'w-full',
            'font-mono',
            'flex',
            'justify-center',
            'items-center',
            'h-full',
            ['bg-red-600', count === 0],
          ])}
        >
          <div id="count" className={classnames([['text-white', count === 0]])}>
            {count}
          </div>
        </div>
      </animated.div>
    </div>
  );
}

const classnames = (pairs: (string | [string, boolean?])[]) =>
  pairs
    .map((stringOrPair) =>
      typeof stringOrPair === 'string'
        ? stringOrPair
        : stringOrPair[1]
        ? stringOrPair[0]
        : '',
    )
    .filter(Boolean)
    .join(' ');

export default App;

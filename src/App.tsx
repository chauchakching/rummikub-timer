import React, { useState, useEffect } from 'react'
import { ClockIcon, MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { animated, useSpring } from 'react-spring'
import GithubImgSrc from '../public/GitHub-Mark-64px.png'

const defaultTimeLimit = 60
const timeLimitInterval = 15
const maxTimeLimit = 180

function App () {
  const [timeLimit, setTimeLimit] = useState(defaultTimeLimit)
  const [count, setCount] = useState(timeLimit)
  const [resetToggle, setResetToggle] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((k) => Math.max(0, k - 1))
    }, 1000)
    return () => clearTimeout(timer)
  }, [resetToggle])

  const [styles, api] = useSpring(() => ({}))

  const onClick = () => {
    if (count !== 0) {
      api.start({
        from: { backgroundColor: '#FEF3C7' },
        to: { backgroundColor: 'white' }
      })
    }
    setCount(timeLimit)
    setResetToggle((x) => !x)
  }

  const addTimeLimit = () => {
    setTimeLimit(Math.min(timeLimit + timeLimitInterval, maxTimeLimit))
  }

  const reduceTimeLimit = () => {
    setTimeLimit(Math.max(timeLimit - timeLimitInterval, 15))
  }

  return (
    <div
      className={classnames([
        'font-mono',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'h-full'
      ])}
    >
      <TopBar
        timeLimit={timeLimit}
        reduceTimeLimit={reduceTimeLimit}
        addTimeLimit={addTimeLimit}
      />
      <animated.div
        className={classnames(['w-full', 'h-full'])}
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
            ['bg-red-600', count === 0]
          ])}
        >
          <div id="count" className={classnames([['text-white', count === 0]])}>
            {count}
          </div>
        </div>
      </animated.div>
      <div className={classnames(['absolute', 'left-3', 'bottom-3'])}>
        <a href="https://github.com/chauchakching/rummikub-timer">
          <img
            src={GithubImgSrc}
            alt="github"
            className={classnames(['w-10', 'text-gray-400', 'opacity-10'])}
          />
        </a>
      </div>
    </div>
  )
}

const TopBar = ({
  timeLimit,
  reduceTimeLimit,
  addTimeLimit
}: {
  timeLimit: number;
  reduceTimeLimit: () => void;
  addTimeLimit: () => void;
}) => (
  <div
    className={classnames([
      'h-14',
      'w-full',
      'bg-white',
      'flex',
      'justify-center',
      'items-center'
    ])}
  >
    <button>
      <MinusIcon
        className={classnames(['w-4', 'm-4'])}
        onClick={reduceTimeLimit}
      />
    </button>

    <div
      className={classnames(['flex', 'justify-center', 'items-center', 'm-12'])}
    >
      <ClockIcon className={classnames(['w-5', 'm-1', 'text-yellow-400'])} />
      <span className={classnames(['text-lg'])}>{timeLimit}</span>
    </div>

    <button>
      <PlusIcon className={classnames(['w-4', 'm-4'])} onClick={addTimeLimit} />
    </button>
  </div>
)

const classnames = (pairs: (string | [string, boolean?])[]) =>
  pairs
    .map((stringOrPair) =>
      typeof stringOrPair === 'string'
        ? stringOrPair
        : stringOrPair[1]
          ? stringOrPair[0]
          : ''
    )
    .filter(Boolean)
    .join(' ')

export default App

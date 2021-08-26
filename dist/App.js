import React, {useState, useEffect} from "../_snowpack/pkg/react.js";
import {ClockIcon, MinusIcon, PlusIcon} from "../_snowpack/pkg/@heroicons/react/outline.js";
import {animated, useSpring} from "../_snowpack/pkg/react-spring.js";
import GithubImgSrc from "../GitHub-Mark-64px.png.proxy.js";
const defaultTimeLimit = 60;
const timeLimitInterval = 15;
const maxTimeLimit = 180;
function App({}) {
  const [timeLimit, setTimeLimit] = useState(defaultTimeLimit);
  const [count, setCount] = useState(timeLimit);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (count <= 0)
        return;
      setCount(count - 1);
    }, 1e3);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  const [styles, api] = useSpring(() => ({}));
  const onClick = () => {
    if (count !== 0) {
      api.start({
        from: {backgroundColor: "#FEF3C7"},
        to: {backgroundColor: "white"}
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
  return /* @__PURE__ */ React.createElement("div", {
    className: classnames([
      "font-mono",
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "h-full"
    ])
  }, /* @__PURE__ */ React.createElement(TopBar, {
    timeLimit,
    reduceTimeLimit,
    addTimeLimit
  }), /* @__PURE__ */ React.createElement(animated.div, {
    className: classnames(["w-full", "h-full"]),
    onClick,
    style: styles
  }, /* @__PURE__ */ React.createElement("div", {
    className: classnames([
      "w-full",
      "font-mono",
      "flex",
      "justify-center",
      "items-center",
      "h-full",
      ["bg-red-600", count === 0]
    ])
  }, /* @__PURE__ */ React.createElement("div", {
    id: "count",
    className: classnames([["text-white", count === 0]])
  }, count))), /* @__PURE__ */ React.createElement("div", {
    className: classnames(["absolute", "left-3", "bottom-3"])
  }, /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/chauchakching/rummikub-timer"
  }, /* @__PURE__ */ React.createElement("img", {
    src: GithubImgSrc,
    alt: "github",
    className: classnames(["w-10", "text-gray-400", "opacity-10	"])
  }))));
}
const TopBar = ({
  timeLimit,
  reduceTimeLimit,
  addTimeLimit
}) => /* @__PURE__ */ React.createElement("div", {
  className: classnames([
    "h-14",
    "w-full",
    "bg-white",
    "flex",
    "justify-between",
    "items-center"
  ])
}, /* @__PURE__ */ React.createElement(MinusIcon, {
  className: classnames(["w-4", "m-4"]),
  onClick: reduceTimeLimit
}), /* @__PURE__ */ React.createElement("div", {
  className: classnames(["flex", "justify-center", "items-center"])
}, /* @__PURE__ */ React.createElement(ClockIcon, {
  className: classnames(["w-5", "m-1", "text-gray-400"])
}), /* @__PURE__ */ React.createElement("span", {
  className: classnames(["text-lg"])
}, timeLimit)), /* @__PURE__ */ React.createElement(PlusIcon, {
  className: classnames(["w-4", "m-4"]),
  onClick: addTimeLimit
}));
const classnames = (pairs) => pairs.map((stringOrPair) => typeof stringOrPair === "string" ? stringOrPair : stringOrPair[1] ? stringOrPair[0] : "").filter(Boolean).join(" ");
export default App;

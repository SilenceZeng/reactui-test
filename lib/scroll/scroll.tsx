import React, {
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getScrollbarWidth } from './scrollHelper';
import './scroll.scss';

const isTouchDevice = 'ontouchstart' in document.documentElement;

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Scroll: React.FC<Props> = (props) => {
  const [barHeight, setBarHeight] = useState(0);
  const [barTop, _setBarTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const firstYRef = useRef(0);
  const firstBarTopRef = useRef(0);
  const [barVisible, setBarVisible] = useState(isTouchDevice ? false : true);
  const timeoutIdRef = useRef(0);

  const setBarTop = (number: number) => {
    if (number < 0) {
      return;
    }
    const { current } = containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    const maxBarTop = ((scrollHeight - viewHeight) * viewHeight) / scrollHeight;
    if (number > maxBarTop) {
      return;
    }
    _setBarTop(number);
  };

  const onScroll: React.UIEventHandler = (e) => {
    const { current } = containerRef;
    const scrollHeight = current!.scrollHeight;
    const scrollTop = current!.scrollTop;
    const viewHeight = current!.getBoundingClientRect().height;
    setBarTop((viewHeight * scrollTop) / scrollHeight);
    if (!isTouchDevice) {
      return;
    }
    setBarVisible(true);
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = window.setTimeout(() => {
      setBarVisible(false);
    }, 300);
  };

  const onMouseDownBar: MouseEventHandler = (e) => {
    draggingRef.current = true;
    firstYRef.current = e.clientY;
    firstBarTopRef.current = barTop;
    // console.log('start');
  };

  const onMouseMoveBar = (e: MouseEvent) => {
    if (draggingRef.current) {
      const delta = e.clientY - firstYRef.current;
      const newBarTop = firstBarTopRef.current + delta;
      setBarTop(newBarTop);
      const scrollHeight = containerRef.current!.scrollHeight;
      const viewHeight = containerRef.current!.getBoundingClientRect().height;
      // ???????????????setBarTop ???????????????????????????????????? bug
      containerRef.current!.scrollTop = (newBarTop * scrollHeight) / viewHeight;
    }
  };

  const onMouseUpBar = (e: MouseEvent) => {
    draggingRef.current = false;
    // console.log('end');
  };

  const onSelect = (e: Event) => {
    if (draggingRef.current) {
      // ???????????????????????????
      e.preventDefault();
    }
  };

  useEffect(() => {
    // mounted ???????????????????????????
    const { current } = containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    setBarHeight((viewHeight * viewHeight) / scrollHeight);
  }, []);

  useEffect(() => {
    // ?????? document ????????????
    document.addEventListener('mouseup', onMouseUpBar);
    document.addEventListener('mousemove', onMouseMoveBar);
    document.addEventListener('selectstart', onSelect);
    return () => {
      document.removeEventListener('mouseup', onMouseUpBar);
      document.removeEventListener('mousemove', onMouseMoveBar);
      document.removeEventListener('selectstart', onSelect);
    };
  }, []);

  const [translateY, _setTranslateY] = useState(0);
  const setTranslateY = (y: number) => {
    if (y < 0) {
      y = 0;
    } else if (y > 150) {
      y = 150;
    }
    _setTranslateY(y);
  };
  const lastYRef = useRef(0);
  const moveCountRef = useRef(0);
  const pullingRef = useRef(false);

  // TODO mac ?????????????????????
  const onTouchStart: TouchEventHandler = (e) => {
    const scrollTop = containerRef.current!.scrollTop;
    if (scrollTop !== 0) {
      return;
    }
    pullingRef.current = true;
    lastYRef.current = e.touches[0].clientY;
    moveCountRef.current = 0;
  };

  const onTouchMove: TouchEventHandler = (e) => {
    const deltaY = e.touches[0].clientY - lastYRef.current;
    moveCountRef.current += 1;
    if (moveCountRef.current === 1 && deltaY < 0) {
      pullingRef.current = false;
      return;
    }
    setTranslateY(translateY + deltaY);
  };

  const onTouchEnd: TouchEventHandler = (e) => {
    setTranslateY(0);
  };

  const { children, ...rest } = props;
  return (
    <div className="aui-scroll" {...rest}>
      <div
        className="aui-scroll-inner"
        style={{
          right: -getScrollbarWidth(),
          transform: `translateY(${translateY}px)`,
        }}
        ref={containerRef}
        onScroll={onScroll}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </div>
      {barVisible && (
        <div className="aui-scroll-track">
          <div
            className="aui-scroll-bar"
            style={{ height: barHeight, transform: `translateY(${barTop}px)` }}
            onMouseDown={onMouseDownBar}
          />
        </div>
      )}
      {/* TODO ?????????????????? */}
      <div className="aui-scroll-pulling" style={{ height: translateY }}>
        {translateY === 150 ? (
          <span className="aui-scroll-pulling-text">????????????????????????</span>
        ) : (
          <span className="aui-scroll-pulling-icon">???</span>
        )}
      </div>
    </div>
  );
};

export default Scroll;

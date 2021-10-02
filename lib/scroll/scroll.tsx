import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
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
      // 同步更新，setBarTop 则是异步更新，可能有潜在 bug
      containerRef.current!.scrollTop = (newBarTop * scrollHeight) / viewHeight;
    }
  };

  const onMouseUpBar = (e: MouseEvent) => {
    draggingRef.current = false;
    // console.log('end');
  };

  const onSelect = (e: Event) => {
    if (draggingRef.current) {
      // 去除滚动时选中内容
      e.preventDefault();
    }
  };

  useEffect(() => {
    // mounted 的时候算滚动条高度
    const { current } = containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    setBarHeight((viewHeight * viewHeight) / scrollHeight);
  }, []);

  useEffect(() => {
    // 使用 document 扩大范围
    document.addEventListener('mouseup', onMouseUpBar);
    document.addEventListener('mousemove', onMouseMoveBar);
    document.addEventListener('selectstart', onSelect);
    return () => {
      document.removeEventListener('mouseup', onMouseUpBar);
      document.removeEventListener('mousemove', onMouseMoveBar);
      document.removeEventListener('selectstart', onSelect);
    };
  }, []);

  const { children, ...rest } = props;
  return (
    <div className="aui-scroll" {...rest}>
      <div
        className="aui-scroll-inner"
        style={{ right: -getScrollbarWidth() }}
        ref={containerRef}
        onScroll={onScroll}
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
    </div>
  );
};

export default Scroll;

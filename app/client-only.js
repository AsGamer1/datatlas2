"use client";

import { useEffect } from 'react';

export default function ClientOnly() {
  useEffect(() => {
    const preventZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventGestureZoom = (e) => {
      e.preventDefault();
    };

    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e) => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    const setViewport = (content) => {
      const viewport = document.querySelector("meta[name=viewport]");
      if (viewport) {
        viewport.setAttribute("content", content);
      }
    };

    const handleFocus = () => {
      setViewport("width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
    };

    const handleBlur = () => {
      setViewport("width=device-width, initial-scale=1.0, maximum-scale=10.0, user-scalable=yes");
    };

    const handleOrientationChange = () => {
      const inputs = document.querySelectorAll('input, textarea, select, button');
      inputs.forEach(input => {
        input.blur();
      });
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    document.addEventListener('touchmove', preventZoom, { passive: false });
    document.addEventListener('gesturestart', preventGestureZoom);
    document.addEventListener('gesturechange', preventGestureZoom);
    document.addEventListener('gestureend', preventGestureZoom);
    document.addEventListener('touchend', preventDoubleTapZoom, { passive: false });

    const inputs = document.querySelectorAll('input, textarea, select, button');
    inputs.forEach(input => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      document.removeEventListener('touchmove', preventZoom);
      document.removeEventListener('gesturestart', preventGestureZoom);
      document.removeEventListener('gesturechange', preventGestureZoom);
      document.removeEventListener('gestureend', preventGestureZoom);
      document.removeEventListener('touchend', preventDoubleTapZoom);

      inputs.forEach(input => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      });
    };
  }, []);

  return null;
}

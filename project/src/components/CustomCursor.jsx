import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trails, setTrails] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const updateScreenSize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Disable cursor effect on mobile

    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setTrails((prev) => [...prev.slice(-10), { x: e.clientX, y: e.clientY, id: Math.random() }]);
    };

    const addHoverEffect = () => setIsHovering(true);
    const removeHoverEffect = () => setIsHovering(false);

    document.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a, button, .hover-target").forEach((el) => {
      el.addEventListener("mouseenter", addHoverEffect);
      el.addEventListener("mouseleave", removeHoverEffect);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("a, button, .hover-target").forEach((el) => {
        el.removeEventListener("mouseenter", addHoverEffect);
        el.removeEventListener("mouseleave", removeHoverEffect);
      });
    };
  }, [isMobile]);

  if (isMobile) return null; // Don't render cursor on mobile

  return (
    <>
      {/* Main Cursor */}
      <div
        className={`custom-cursor ${isHovering ? "cursor-hover" : ""}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      ></div>

      {/* Trailing Effect */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="trail"
          style={{ left: `${trail.x}px`, top: `${trail.y}px`, opacity: 0.7 }}
        ></div>
      ))}
    </>
  );
};

export default CustomCursor;

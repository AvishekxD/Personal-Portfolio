const MouseDepthLayer = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%)`,
        mixBlendMode: "soft-light",
        transform: "scale(1.01)",
        willChange: 'background-image, transform'
      }}
    />
  );
};

export default MouseDepthLayer;
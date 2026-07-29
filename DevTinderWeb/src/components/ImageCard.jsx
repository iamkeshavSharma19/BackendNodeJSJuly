export const ImageCard = ({
  src,
  alt,
  aspectRatio,
  spanCol = false,
  children,
}) => (
  <div
    className={`relative group overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 shadow-xl ${aspectRatio} ${
      spanCol ? "col-span-1 md:col-span-2" : ""
    }`}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
    />
    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent group-hover:via-slate-950/40 transition-all" />
    {children && (
      <div className="absolute bottom-4 left-4 right-4 z-10">{children}</div>
    )}
  </div>
);

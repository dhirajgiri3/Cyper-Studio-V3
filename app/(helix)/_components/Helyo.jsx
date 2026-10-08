import Image from "next/image";
import manifest from "../../../public/helyo/manifest.json";

/**
 * Helyo, the HELIX companion. Brand surfaces only, never inside a tenant window.
 * Rough cutouts are swapped for final transparent renders by changing the file name in `poses` only.
 * @param {{ pose: keyof typeof poses, alt: string, sizes: string, priority?: boolean, className?: string,
 *           routeStart?: boolean, imgClassName?: string, style?: object }} props
 */
export const poses = {
  welcome: "helyo-hero-welcome-rough",
  concern: "helyo-problem-concern-rough",
  inspect: "helyo-journey-inspect-rough",
  parcel: "helyo-journey-parcel-rough",
  guide: "helyo-journey-guide-rough",
  reassure: "helyo-reassure-rough",
  present: "helyo-present-rough",
  celebrate: "helyo-celebrate-rough",
  delivered: "helyo-delivered-rough",
};

export function poseData(pose) {
  const m = manifest[poses[pose]];
  return { src: `/helyo/${m.name}.webp`, width: m.width, height: m.height, terminal: m.terminal };
}

/** How far up from Helyo's feet the inlay terminal sits, as a fraction of the rendered width. */
export function terminalLift(pose) {
  const p = poseData(pose);
  return p.terminal ? +((p.terminal.y / 100) * (p.height / p.width)).toFixed(4) : 0.8;
}

/** Rendered height divided by width. */
export function aspectOf(pose) {
  const p = poseData(pose);
  return +(p.height / p.width).toFixed(4);
}

/**
 * Helyo's silhouette, used only as a soft cast shadow on a surface behind it. Decorative.
 * Pass the same `sizes` and `priority` as the visible Helyo so both resolve to one fetch.
 */
export function HelyoCast({ pose, sizes, priority = false, className = "" }) {
  const p = poseData(pose);
  return <Image className={className} src={p.src} width={p.width} height={p.height} sizes={sizes} priority={priority} alt="" aria-hidden="true" draggable={false} />;
}

export default function Helyo({ pose, alt, sizes, priority = false, className = "", routeStart = false, imgClassName = "", style, children }) {
  const p = poseData(pose);
  return (
    <figure
      className={`helyo ${className}`}
      style={style}
      {...(routeStart && p.terminal
        ? { "data-route": "start", "data-tx": p.terminal.x, "data-ty": p.terminal.y }
        : {})}
    >
      <Image
        className={`helyo__img ${imgClassName}`}
        src={p.src}
        width={p.width}
        height={p.height}
        alt={alt}
        sizes={sizes}
        priority={priority}
        draggable={false}
      />
      {routeStart && p.terminal ? (
        <span className="helyo__stub" aria-hidden="true" style={{ left: `${p.terminal.x}%`, top: `${p.terminal.y}%` }} />
      ) : null}
      {children}
    </figure>
  );
}

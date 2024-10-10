import "./styles.css";

interface LoaderProps {
  hint?: string;
  variant?: "info" | "gray";
}

const variants = {
  info: {
    background: "#E2E8F0",
    foreground: "#60a5fa",
    text: "#60a5fa",
  },
  gray: {
    background: "#E2E8F0",
    foreground: "#94A3B8",
    text: "#cbd5e1",
  },
};

export function Loader({ hint, variant = "info" }: LoaderProps) {
  const color = variants[variant];

  return (
    <div className="loader__container">
      <div className="loader__spinner">
        <svg
          className="animate-spin"
          width="48"
          height="48"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32ZM8.12341 32C8.12341 45.1867 18.8133 55.8766 32 55.8766C45.1867 55.8766 55.8766 45.1867 55.8766 32C55.8766 18.8133 45.1867 8.12341 32 8.12341C18.8133 8.12341 8.12341 18.8133 8.12341 32Z"
            fill={color.background}
          />
          <path
            d="M61.9437 40.0234C62.4772 40.1663 63.0271 39.85 63.1533 39.3124C64.197 34.8662 64.2776 30.244 63.3851 25.7571C62.4275 20.943 60.3754 16.4137 57.3873 12.5196C54.3993 8.62554 50.5555 5.47101 46.1532 3.30007C42.0503 1.2767 37.5647 0.158313 32.9999 0.0156231C32.4479 -0.00163214 32 0.447715 32 1L32 7.12341C32 7.6757 32.4479 8.12122 32.9997 8.14435C36.3181 8.28341 39.575 9.11351 42.5603 10.5857C45.845 12.2056 48.7131 14.5593 50.9426 17.4649C53.1721 20.3704 54.7033 23.7499 55.4178 27.3419C56.0672 30.6066 56.0261 33.9673 55.3015 37.2086C55.1811 37.7476 55.4955 38.2956 56.0289 38.4385L61.9437 40.0234Z"
            fill={color.foreground}
          />
        </svg>
      </div>
      {hint && (
        <p className="loader__hint" style={{ color: color.text }}>
          {hint}
        </p>
      )}
    </div>
  );
}

import { Card } from "@components/card";
import { Divider } from "@components/divider";
import { Form } from "@components/form";
import { ReactNode } from "react";
import { PiX } from "react-icons/pi";
import "./styles.css";

interface ModalProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  visible?: boolean;
  onClose?(): void;
  footer?: ReactNode;
  form?: boolean;
  onSubmit?(values: Record<string, unknown>): void;
  onInvalid?(event: Record<string, boolean>): void;
  width?: string | number;
  maxWidth?: string | number;
  zIndex?: number;
}
function normalizeUnit(value?: number | string | null) {
  if (value == null) return;

  const parsedNumber = Number(value);
  if (isNaN(parsedNumber)) return value;

  return typeof value === "number" ? value + "px" : value;
}

export function Modal({
  children,
  title,
  subtitle,
  visible,
  footer,
  onClose,
  form,
  onSubmit,
  onInvalid,
  width = "460px",
  maxWidth,
  zIndex,
}: ModalProps) {
  const hasHeader = title || subtitle;

  if (!visible) return null;

  return (
    <div className="modal__backdrop" style={{ zIndex }}>
      <Card
        className="modal__container"
        style={{
          "--modal-width": normalizeUnit(width),
          "--modal-max-width": normalizeUnit(maxWidth),
        }}
      >
        <WithForm render={form} onSubmit={onSubmit} onInvalid={onInvalid}>
          {hasHeader && (
            <>
              <header className="modal__header">
                {title && <h3 className="modal__title">{title}</h3>}
                <button type="button" onClick={onClose}>
                  <PiX size={20} color="red" className="cursor-pointer" />
                </button>
              </header>
              {subtitle && <p className="modal__subtitle">{subtitle}</p>}
              <Divider />
            </>
          )}

          <div className="modal__content">{children}</div>

          {footer && (
            <>
              <Divider />
              <footer className="modal__footer">{footer}</footer>
            </>
          )}
        </WithForm>
      </Card>
    </div>
  );
}

interface WithFormProps {
  render?: boolean;
  onSubmit?(values: Record<string, unknown>): void;
  onInvalid?(values: Record<string, boolean>): void;
  children: ReactNode;
}

function WithForm({ render, onSubmit, onInvalid, children }: WithFormProps) {
  if (!render) return children;

  return (
    <Form onSubmit={onSubmit} onInvalid={onInvalid}>
      {children}
    </Form>
  );
}

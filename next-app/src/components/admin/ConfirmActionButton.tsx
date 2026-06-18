"use client";

import { useRef, useState } from "react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface ConfirmActionButtonProps {
  action: (formData: FormData) => void | Promise<void>;
  fieldName: string;
  fieldValue: string;
  buttonLabel: string;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
  className?: string;
}

export default function ConfirmActionButton({
  action,
  fieldName,
  fieldValue,
  buttonLabel,
  title,
  description,
  confirmLabel,
  cancelLabel,
  variant = "default",
  className,
}: ConfirmActionButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {buttonLabel}
      </button>

      <ConfirmDialog
        isOpen={isOpen}
        title={title}
        description={description}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        isLoading={isLoading}
        variant={variant}
        onCancel={() => {
          if (!isLoading) {
            setIsOpen(false);
          }
        }}
        onConfirm={() => {
          setIsLoading(true);
          formRef.current?.requestSubmit();
        }}
      />

      <form ref={formRef} action={action} className="hidden">
        <input type="hidden" name={fieldName} value={fieldValue} />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default function Loading() {
  return (
    <div
      className="mx-auto w-full max-w-container-semta px-gutter-desktop py-10"
      role="status"
      aria-label="Cargando página"
    >
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4">
        <span className="grid size-12 animate-spin place-items-center rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-body-md font-semibold text-on-surface-variant">
          Cargando…
        </p>
      </div>
    </div>
  );
}
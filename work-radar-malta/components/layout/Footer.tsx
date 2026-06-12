export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-ink/60 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <p>© 2026 WorkRadar Malta. Built for transparent career decisions.</p>
        <div className="flex gap-5">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}

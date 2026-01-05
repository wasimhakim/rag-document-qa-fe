type HeaderProps = {
  title: string
  subtitle?: string
  badge?: string
}

function Header({ title, subtitle, badge }: HeaderProps) {
  return (
    <header className="relative z-10 flex flex-col items-center gap-3 text-center">
      {badge ? <span className="badge">{badge}</span> : null}
      <h1 className="app-title">{title}</h1>
      {subtitle ? <p className="app-subtitle">{subtitle}</p> : null}
    </header>
  )
}

export default Header

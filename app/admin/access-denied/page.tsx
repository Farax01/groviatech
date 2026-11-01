import { signOutAction } from '../actions'

export default function AdminAccessDeniedPage() {
  return (
    <main className="adm-center">
      <section className="adm-card adm-auth">
        <h1>Admin access required</h1>
        <p className="adm-muted">This account is not on the Groviatech admin allowlist. Contact an owner if you need access.</p>
        <form action={signOutAction}>
          <button className="adm-btn" type="submit">Sign out</button>
        </form>
      </section>
    </main>
  )
}

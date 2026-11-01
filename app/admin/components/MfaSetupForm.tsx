'use client'

import Image from 'next/image'
import { useActionState } from 'react'
import {
  enrollMfaAction,
  verifyMfaAction,
  type MfaEnrollmentState,
  type MfaVerificationState,
} from '../actions'

export function MfaSetupForm({ verifiedFactorId }: Readonly<{ verifiedFactorId: string | null }>) {
  const [enrollment, enrollAction, enrolling] = useActionState<MfaEnrollmentState, FormData>(enrollMfaAction, {})
  const [verification, verifyAction, verifying] = useActionState<MfaVerificationState, FormData>(verifyMfaAction, {})
  const factorId = verifiedFactorId ?? enrollment.factorId

  return (
    <div className="adm-card adm-auth">
      <h1>Verify your identity</h1>
      {verifiedFactorId ? (
        <p className="adm-muted">Enter the current code from your registered authenticator app.</p>
      ) : enrollment.qrCode ? (
        <>
          <p className="adm-muted">Scan this QR code with an authenticator app, then enter the generated code.</p>
          <Image className="adm-qr" src={enrollment.qrCode} alt="Authenticator setup QR code" width={190} height={190} unoptimized />
          <p>
            Can’t scan it? Enter this setup key manually: <code className="adm-code">{enrollment.secret}</code>
          </p>
        </>
      ) : (
        <>
          <p className="adm-muted">Set up a time-based one-time password (TOTP) authenticator to secure your admin account.</p>
          <form action={enrollAction}>
            <button className="adm-btn" type="submit" disabled={enrolling}>
              {enrolling ? 'Preparing…' : 'Set up authenticator'}
            </button>
          </form>
        </>
      )}

      {factorId && (
        <form className="adm-form" action={verifyAction}>
          <input type="hidden" name="factorId" value={factorId} />
          <label>
            Authenticator code
            <input name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6,8}" required />
          </label>
          {verification.error && <p className="adm-error" role="alert">{verification.error}</p>}
          <button className="adm-btn" type="submit" disabled={verifying}>
            {verifying ? 'Verifying…' : 'Verify and continue'}
          </button>
        </form>
      )}
      {enrollment.error && <p className="adm-error" role="alert">{enrollment.error}</p>}
      <a className="adm-link" href="/admin/login">Return to sign in</a>
    </div>
  )
}

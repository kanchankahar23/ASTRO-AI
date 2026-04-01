import { SignIn } from '@clerk/clerk-react'

export default function SignInPage() {
  return (
    <div style={{ display: 'flex', backgroundColor:'pink', justifyContent: 'center', marginTop: '50px' }}>
      <SignIn routing="path" path="/sign-in" />
    </div>
  )
}
import { SignIn } from '@clerk/clerk-react'

export default function SignInPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            
            headerTitle: {
              color: "#e96817"
            },
            formButtonPrimary: {
              backgroundColor: "#e96817",
              outline:"none",
              border:"none",
              "&:hover": {
                backgroundColor: "#e96817"
              }
            }
          }
        }}
      />
    </div>
  )
}
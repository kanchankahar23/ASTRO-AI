import { SignUp } from '@clerk/clerk-react'

export default function SignUpPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        appearance={{
          elements: {
          
            headerTitle: {
              color: "#e96817",
            },
            formButtonPrimary: {
              backgroundColor: "#e96817",
              "&:hover": {
                backgroundColor: "#e96817"
              }
            },
            formFieldInput: {
              borderColor: "#e96817",
              
            },
            footerActionLink: {
              color: "#e96817"
            }
          }
        }}
      />
    </div>
  )
}
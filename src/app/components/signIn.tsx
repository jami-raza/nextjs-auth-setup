import { signIn, signOut } from "@/auth"
import { userLogout } from "../actions"

export function SignIn({
  provider,
  ...props
}: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn('credentials', {
          email: 'abcdef@email.com',
          password: '1234',
          redirect: false,
        })
      }}
    >
      <button {...props}>Sign In</button>

    </form>
  )
}
export function GoogleSignIn({
  provider,
  ...props
}: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn('google')
      }}
    >
      <button {...props}>Sign In</button>

    </form>
  )
}
export function SignOut({
  provider,
  ...props
}: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server"
        await userLogout()
        await signOut()
      }}
    >
      <button {...props}>Sign Out</button>

    </form>
  )
}
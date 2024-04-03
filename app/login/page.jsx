import styles from '@/app/ui/login/login.module.css'
import { authenticate } from '../lib/actions'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form} action={authenticate}>
        <h1>Login</h1>
        <input type='text' placeholder='username' name='username'/>
        <input type='password' placeholder='password' name='password'/>
        <button>Login</button>
        <Link href="/signup">Sign Up</Link>
      </form>
    </div>
    
  )
}

export default LoginPage
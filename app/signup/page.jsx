

import styles from '@/app/ui/signup/signup.module.css';
import Link from 'next/link';
import { signup } from '../lib/actions';

const SignUpPage = () => {

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={signup}>
        <h1>Sign Up</h1>
        <input type='text' placeholder='Username' name='username' required />
        <input type='email' placeholder='Email' name='email' required />
        <input type='password' placeholder='Password' name='password' required />
        <input type='tel' placeholder='Phone' name='phone' />
        <input type='text' placeholder='Address' name='address' />
        <div>
          <label htmlFor='isAdmin'>Admin:</label>
          <input type='checkbox' id='isAdmin' name='isAdmin' />
        </div>
        <div>
          <label htmlFor='isActive'>Active:</label>
          <input type='checkbox' id='isActive' name='isActive' defaultChecked />
        </div>
        <button type='submit'>Sign Up</button>
        <p>Already have an account? <Link href="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default SignUpPage;

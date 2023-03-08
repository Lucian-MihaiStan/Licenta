import type { NextPage } from 'next'
import Head from 'next/head'
import {RegisterForm} from '../components/register/register-form'

import { Utils } from '@/components/utils/utils'
import { LoginForm } from '@/components/login/login-form'


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Login Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="vh-100 d-flex justify-content-center align-items-center">
        <RegisterForm/>
        <LoginForm/>
        <button onClick={Utils.getUsers}> AllUsers </button>
      </main>
    </div>
  )
}

export default Home
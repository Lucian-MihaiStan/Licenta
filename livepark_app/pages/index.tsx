import type { NextPage } from 'next'
import Head from 'next/head'
import {RegisterForm} from '../components/login_pages/register/register-form'

import { Utils } from '@/components/utils/utils'
import { LoginForm } from '@/components/login_pages/login/login-form'
import { GlobalConstants } from '@/components/globalc_namespace/global-constants'
import { useRouter } from 'next/router'

const Home: NextPage = () => {

  const routerUtils = useRouter();
    const routeToPage = async (event: any, path: string) => {
        event.preventDefault();
        routerUtils.push(path);
    }

  return (
    <div>
      <Head>
        <title>Login Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="vh-100 d-flex justify-content-center align-items-center">

        <div>
          <button onClick={(e) => routeToPage(e, GlobalConstants.LOGIN_FRONTEND_APP_LINK)}> Sign In </button>
        </div>

        <div>
          <button onClick={(e) => routeToPage(e, GlobalConstants.REGISTER_FRONTEND_APP_LINK)}> Sign Up </button>
        </div>        

        <div>
          <button onClick={Utils.getUsers}> AllUsers </button>
        </div>

      </main>
    </div>
  )
}

export default Home
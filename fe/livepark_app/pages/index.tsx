import type { NextPage } from 'next'
import Head from 'next/head'

import { Utils } from '@/components/utils/utils'
import { GlobalConstants } from '@/components/globalc_namespace/global-constants'
import { useRouter } from 'next/router'
import { NavigationBar } from '@/components/navigation_bar/navigation-bar'
import { useEffect } from 'react'
import classNames from 'classnames'

const Home: NextPage = () => {

  const routerUtils = useRouter();
  const routeToPage = async (event: any, path: string) => {
      event.preventDefault();
      routerUtils.push(path);
  }

  return (
    <>
    <Head>
        <link rel="icon" href="public/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
    </Head>

    <div>
      
      <div className={classNames("container-fluid")}>
        <div className={classNames("row")}>

          <h1>ParkLive</h1>

        </div>

        <div className={classNames("row")}>
          <div className={classNames("col")}>
            <button className="btn btn-primary" onClick={(e) => routeToPage(e, GlobalConstants.LOGIN)}>Login</button>
          </div>
          <div className={classNames("col")}>
            <button className="btn btn-primary" onClick={(e) => routeToPage(e, GlobalConstants.REGISTER_FRONTEND_APP_LINK)}>Register</button>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default Home
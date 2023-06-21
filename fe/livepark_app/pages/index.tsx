import type { NextPage } from 'next'
import Head from 'next/head'

import { Utils } from '@/components/utils/utils'
import { GlobalConstants } from '@/components/globalc_namespace/global-constants'
import { useRouter } from 'next/router'
import { NavigationBar } from '@/components/navigation_bar/navigation-bar'
import { useEffect } from 'react'

const Home: NextPage = () => {

  const routerUtils = useRouter();
  const routeToPage = async (event: any, path: string) => {
      event.preventDefault();
      routerUtils.push(path);
  }

  useEffect(() => {
    routerUtils.push(GlobalConstants.LOGIN_FRONTEND_APP_LINK);
  }, [routerUtils]);

  return (
    <div>
      
    </div>
  )
}

export default Home
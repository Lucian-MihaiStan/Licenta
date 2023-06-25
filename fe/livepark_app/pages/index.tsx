import type { NextPage } from 'next'
import Head from 'next/head'

import { GlobalConstants } from '@/components/globalc_namespace/global-constants'
import { useRouter } from 'next/router'
import dashboardStyle from '@/components/dashboard_page/dashboard_style/dashboard.module.css'
import classNames from 'classnames'
import { SupportForm } from '@/components/support/support-form'

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

    <div className={classNames("container-fluid")}>
        <div className={classNames("row", )}>
            <div className={classNames("col", dashboardStyle.title_bar)}>
                <div className={dashboardStyle.title_div}>
                      ParkLive
                </div>
            </div>
        </div>
        <div className={classNames("row")}>
            <div className={classNames("col", dashboardStyle.center_dcontent, dashboardStyle.left_div)}>
                <div className={classNames("bold", dashboardStyle.words_left)}>YOU WANT TO</div>
                <div className={classNames("bold", dashboardStyle.words_left)}>FIND PARKING?</div>
                <button className={classNames("btn btn-light", dashboardStyle.show_button)} onClick={event => routeToPage(event, GlobalConstants.LOGIN)}>
                    SHOW ME PARKING AREAS
                </button>
            </div>

            <div className={classNames("col", dashboardStyle.center_dcontent, dashboardStyle.right_div)}>
                <div className={classNames("bold", dashboardStyle.words_right)}>YOU WANT TO</div>
                <div className={classNames("bold", dashboardStyle.words_right)}>STORE DOCUMENTS?</div>
                <button className={classNames("btn btn-light", dashboardStyle.show_button)} onClick={event => routeToPage(event, GlobalConstants.LOGIN)}>
                    SHOW ME MY CARS
                </button>
            </div>
        </div>

        <div className={classNames("row", dashboardStyle.form_support)}>
            <SupportForm/>
        </div>

        <div className={classNames("row")}>
          <div className={classNames("col", dashboardStyle.bottom_div)}>
                Thanks for using ParkLive!
          </div>
        </div>  
    </div>

    
    </>
  )
}

export default Home
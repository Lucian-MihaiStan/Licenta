import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";

export const CarsForm = () => {

    const routerUtils = useRouter();
    function routeToPage(e: any, path: string): void {
        e.preventDefault();
        routerUtils.push(path);
    }

    // export async function getStaticProps() {
    //     const res = await fetch(GlobalConstants.CARS)
    //     const posts = await res.json()
      
    //     return {
    //       props: {
    //         posts,
    //       },
    //     }
    //   }
    // }

    return (
        <div>

            <button onClick={(e) => routeToPage(e, GlobalConstants.ADD_CAR_PAGE)}> Add car </button>

        </div>
    );

}
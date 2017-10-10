import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {LinearProgress} from "material-ui";

const PrivateRoute = ({component: Component, usuario, fetched,  ...rest}) => {
    return (
        <div>
            {fetched ?
                <Route {...rest} render={props => (
                    typeof usuario !== 'undefined' && usuario !== null ?
                        (
                            <Component {...props} />
                        ) : (
                            <div>
                                <Redirect to={{
                                    pathname: '/login',
                                    state: {from: props.location}
                                }}/>
                            </div>
                        )

                )}/>
                :
                <LinearProgress style={{marginTop: 300, width: '50vw'}} mode="indeterminate"/>
            }
        </div>

    );
};

// {fetched ?
//     <Route {...rest} render={props => (
//         typeof usuario !== 'undefined' && usuario !== null ?
//             (
//                 <Component {...props} />
//             ) : (
//                 <div>
//                     <Redirect to={{
//                         pathname: '/login',
//                         state: {from: props.location}
//                     }}/>
//                 </div>
//             )
//
//     )}/> :
//     <div>
//         <LinearProgress style={{marginTop: 300, width: '50vw'}} mode="indeterminate"/>
//     </div>
// }


export default PrivateRoute;
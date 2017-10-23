import React, {Component} from 'react';
//import {Doughnut, Pie} from 'react-chartjs-2';
import ChartCard from './ChartCard';
import BarChartCard from './BarChartCard';
import PieChartCard from './PieChartCard';
import LineChartCard from './LineChartCard';



//
// const data = {
//     labels: [
//         'Red',
//         'Green',
//         'Yellow'
//     ],
//     datasets: [{
//         data: [300, 50, 100],
//         backgroundColor: [
//             '#FE6384',
//             '#33A2EB',
//             '#FACE56'
//         ],
//         hoverBackgroundColor: [
//             '#FE6120',
//             '#36F2AB',
//             '#0FBE51'
//         ]
//     }]
// };
//
// const data2 = {
//     labels: [
//         'Ingresos',
//         'Gastos',
//         'Caja y Bancos',
//         'Flujo'
//     ],
//     datasets: [{
//         data: [500, 400, 100, 350],
//         backgroundColor: [
//             '#FF6384',
//             '#36A2EB',
//             '#FFCE56'
//         ],
//         hoverBackgroundColor: [
//             '#FF6384',
//             '#36A2EB',
//             '#FFCE56'
//         ]
//     }]
// };


class Resumen extends Component{
    render(){
        return(
            <div style={{display:'flex', flexWrap:'wrap', flexGrow:2}}>

                <div style={{minWidth:'400px'}}>
                    <BarChartCard/>
                </div>

                <div style={{minWidth:'400px'}}>
                    <ChartCard/>
                </div>

                <div style={{minWidth:'400px'}}>
                    <PieChartCard/>
                </div>

                <div style={{minWidth:'400px'}}>
                    <LineChartCard/>
                </div>

            </div>
        );
    }
}

export default Resumen;
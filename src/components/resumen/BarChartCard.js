import React, {Component} from 'react';
import {Card} from 'material-ui';
//import {Icon} from 'antd';
import {Bar} from 'react-chartjs-2';


const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Historico diario',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 2,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

class BarChartCard extends Component{
    render(){

        return(
            <Card style={{width:400, maxHeight:400, textAlign:'center', padding:15}}>
                <div >
                    <h3>Ingresos</h3>
                    <p>Gráfica</p>
                </div>
                <Bar
                    data={data}
                    width={100}
                    height={60}
                    options={{
                        maintainAspectRatio: true
                    }}
                />

            </Card>
        );
    }
};

export default BarChartCard;
import React, {Component} from 'react';
import {Card} from 'material-ui';
import {Icon} from 'antd';
import {Bar, Pie} from 'react-chartjs-2';


const data = {
    labels: [
        'Caja',
        'Banco',
        'Otro'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

class PieChartCard extends Component{
    render(){

        return(
            <Card style={{width:400, maxHeight:400, textAlign:'center', padding:15}}>
                <div >
                    <h3>Caja y Banco</h3>
                    <p>Gráfica</p>
                </div>
                <Pie
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

export default PieChartCard;
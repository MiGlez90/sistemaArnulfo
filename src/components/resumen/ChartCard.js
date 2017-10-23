import React, {Component} from 'react';
import {Card} from 'material-ui';
//import {Icon} from 'antd';
import {Doughnut} from 'react-chartjs-2';


const data = {
    labels: [
        'Animales',
        'Semilla',
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

class ChartCard extends Component{
    render(){

        return(
            <Card style={{width:400, height:300, textAlign:'center', padding:15}}>
                <div >
                    <h3>Gastos</h3>
                    <p>Gráfica</p>
                </div>
                <Doughnut
                    data={data}
                    options={{
                        maintainAspectRatio: true
                    }}
                />

            </Card>
        );
    }
};

export default ChartCard;
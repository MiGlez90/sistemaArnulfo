import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {Card} from 'material-ui';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 0]
        }
    ]
};

class LineChartCard extends Component{
    render(){
        return(


            <Card style={{width:400, maxHeight:400, textAlign:'center', padding:15}}>
                <div >
                    <h3>Flujo de efectivo</h3>
                    <p>Gráfica</p>
                </div>
                <Line
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
}

export default LineChartCard;
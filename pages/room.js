import React from 'react';
import dynamic from 'next/dynamic';

const Flex = dynamic(() => import('../components/Flex'));
const Card = dynamic(() => import('../components/Card'));

const rows =  [
    [ "potato", "tomato", "carrot", "cauliflower" ],
    [ "corn", "pee" ]
];

export default class extends React.Component {
    static async getInitialProps({ query }) {
        return { campus: query.campus };
    }

    state = { rows };

    render() {
        return (
            <Flex direction={'vertical'} style={{ height: '100vh' }}>
                {this.state.rows.map((row, index) => (
                    <Flex key={index}>
                        {row.map((cadet) =>
                            <Flex key={cadet} direction={'vertical'}>
                                <Card>
                                    <div>
                                        <img src="/static/chair.png" style={{height: '65%'}}/>
                                        <div style={{height: '35%'}}>{cadet}</div>
                                    </div>
                                </Card>
                            </Flex>
                        )}
                    </Flex>
                ))}
            </Flex>
        );
    }
};
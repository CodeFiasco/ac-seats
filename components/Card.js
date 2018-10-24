import React from 'react';
import Flex from './Flex';

const styles = {
    card: {
        width: '120px',
        height: '120px',
        textAlign: 'center'
    },
    image: {
        height: '65%',
    },
    description: {
        height: '35%'
    }
}

const Card = ({children}) => {
    return (
        <Flex direction={Flex.DIRECTION.VERTICAL} style={styles.card}>
            {children}
        </Flex>
    )
};

export default Card;
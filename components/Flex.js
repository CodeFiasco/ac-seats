import React from 'react';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

const Flex = ({ children, direction, style = {} }) => {
    return (
        <div style={{
            ...styles.container,
            flexFlow: `${direction === Flex.DIRECTION.VERTICAL ? 'column' : 'row'} nowrap`,
            ...style
        }}>
            {children}
        </div>
    );
};

Flex.DIRECTION = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
};

export default Flex;
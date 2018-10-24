import React from 'react';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center'
    }
};

const Flex = ({ children, direction, style = {} }) => {
    return (
        <div style={{
            ...styles.container,
            ...style,
            flexFlow: `${direction === Flex.DIRECTION.VERTICAL ? 'column' : 'row'} nowrap`
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
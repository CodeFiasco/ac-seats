import React from 'react';

const styles = {
    container: {
        display: 'grid',
    },
    row: {

    }
};

const Grid = ({ children }) => {
    return (
        <div style={{
            ...styles.container,
            gridTemplateColumns: `repeat(${children.length}, 1fr)`,
            gridTemplateRows: 100
        }}>
            {children}
        </div>
    );
};

Grid.Cell = ({ children }) => {
    return (
        <div style={{
        }}>
            {children}
        </div>
    );
};

export default Grid;
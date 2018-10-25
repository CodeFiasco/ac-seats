
export default {
    rowsToCadets: (rows) => {
        const cadets = [];

        rows.forEach((row, rowIndex) => {
            row.forEach((cadet, seatIndex) => {
                cadets.push({
                    name: cadet,
                    row: rowIndex,
                    seat: seatIndex
                })
            });
        });

        return cadets;
    },

    cadetsToRows: (cadets) => {
        const rows = [];

        cadets.forEach(c => {
            if (!rows[c.row]) {
                rows[c.row] = [];
            }
    
            rows[c.row][c.seat] = c.name;
        });
    
        return rows;
    }
}
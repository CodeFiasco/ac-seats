export default (cadets) => {
    const rows = [];

    cadets.forEach(c => {
        if (!rows[c.row]) {
            rows[c.row] = [];
        }

        rows[c.row][c.seat] = c.name;
    });

    return rows;
}
// Returns the matrix that maps a plane with the co-ordinates start onto a
// plane with the co-oridinates end.
//
// Co-ordinates are expected in the form of an array of co-ordinate points
// where element 0 is top left, 1 top right, 2 bottom left and 3 bottom right.
//
// Co-ordinate points are objects with an x and y number field.
// eg. {"x": 5, "y": 6}
function getTransform3D(start, end) {
    // Solve by representing the points as homogeneous coordinates
    // eg. solve for H:
    //
    //     |startXs|      |endXs|
    // H o |startYs| = Ks |endYs|
    //     |   1   |      |  1  |

    p1 = start[0];
    p2 = start[1];
    p3 = start[2];
    p4 = start[3];

    q1 = end[0];
    q2 = end[1];
    q3 = end[2];
    q4 = end[3];

    m1 = []; // the 8x8 matrix for solving for H
    m2 = [];

    // For each of the 4 co-ordinate points
    for (i=0; i<4; i++) {
        x = start[i].x;
        y = start[i].y;

        p = end[i].x;
        q = end[i].y;

        row1 = [
            x, y, 1, 0, 0, 0,
            ((-p) * x), ((-p) * y)
        ];

        row2 = [
            0, 0, 0, x, y, 1,
            ((-q) * x), ((-q) * y)
        ];

        m1.push(row1);
        m1.push(row2);

        m2.push(p);
        m2.push(q);
    }

    h = numeric.solve(m1,m2)

    //return as 4x4
    return [
        [h[0], h[1], 0, h[2]],
        [h[3], h[4], 0, h[5]],
        [   0,    0, 1,    0],
        [h[6], h[7], 0,    1]
    ];


}

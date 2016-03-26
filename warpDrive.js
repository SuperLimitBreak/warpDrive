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

    var m1 = []; // the 8x8 matrix for solving for H
    var m2 = []; // the 8x1 matrix for solving for H

    // Loop vars --------------------------------------------------------------
    var x;
    var y;
    var p;
    var q;
    var i;

    var row1;
    var row2;
    // ------------------------------------------------------------------------

    // For each of the 4 co-ordinate points
    for (i = 0; i < 4; i++) {
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

    var h = numeric.solve(m1,m2);

    //as 4x4
    var m3D = [
        [h[0], h[1], 0, h[2]],
        [h[3], h[4], 0, h[5]],
        [   0,    0, 1,    0],
        [h[6], h[7], 0,    1]
    ];

    // CSS3 expects in collumn major form
    var rtnString = "";
    var j;

    for (i = 0; i < 4; i++){
        for (j = 0; i < 4; j++){
            rtnString += m3D[j][i];
            rtnString += ",";
        }
    }
}

function getCoOrds(elm) {
    var rtn = [];

    var pos = elm.offset();
    var x = pos.left;
    var y = pos.right;

    rtn[0] = {"x": x, "y": y};
    rtn[1] = {"x": x + elm.width, "y": y};
    rtn[2] = {"x": x, "y": y + elm.height};
    rtn[3] = {"x": x + elm.width, "y": y + elm.height};

    return rtn;
}

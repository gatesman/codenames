var A = 65;

// 0 = First team, 1 = Second team, 2 = neutral, 3 = assassin
var NORMAL_COLORS = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3 ]
var NORMAL_TEAMS = [ "red", "blue" ];

// 0 = Blk/Grn, 1 = Bge/Grn, 2 = Grn/Grn, 3 = Grn/Bge, 4 = Grn/Blk, 5 = Bge/Blk, 6 = Blk/Blk, 7 = Bge/Bge, 8 = Blk/Bge
var DUET_COLORS = [ 0, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 5, 6, 7, 7, 7, 7, 7, 7, 7, 8 ]
var DUET_COLORS_0 = [ "black", "beige", "green", "green", "green", "beige", "black", "beige", "black" ]
var DUET_COLORS_1 = [ "green", "green", "green", "beige", "black", "black", "black", "beige", "beige" ]

var randomCharacter = function() {
    return String.fromCharCode(A + (Math.floor(Math.random() * 26)));
}

var randomString = function() {
    return randomCharacter() + randomCharacter() + randomCharacter() + randomCharacter();
};

var codeValue = function(str) {
    var char1 = str.charCodeAt(0) - A;
    var char2 = str.charCodeAt(1) - A;
    var char3 = str.charCodeAt(2) - A;
    var char4 = str.charCodeAt(3) - A;
    return (26 * 26 * 26 * char1) + (26 * 26 * char2) + (26 * char3) + char4;
};

var assignNormalColors = function(str) {
    var codeHash = codeValue(str);
    var startingTeamIndex = codeHash % 2;
    var teamOneColor = NORMAL_TEAMS[startingTeamIndex];
    var teamTwoColor = NORMAL_TEAMS[1 - startingTeamIndex];

    $("#borderdiv").removeClass();
    $("#borderdiv").addClass(teamOneColor);

    var colorsLeft = NORMAL_COLORS.slice(0);
    var colorIndex = [ teamOneColor, teamTwoColor, "beige", "black" ];

    for (i = 0; i < 25; i++) {
        var randomValue = Math.floor(Math.random() * colorsLeft.length);
        $("td").eq(i).removeClass();
        $("td").eq(i).addClass(colorIndex[colorsLeft[randomValue]]);
        colorsLeft.splice(randomValue, 1);
    }
};

var assignDuetColors = function(player, code) {
    var codeHash = codeValue(code);

    $("#borderdiv").removeClass();
    $("#borderdiv").addClass("green");

    var colorsLeft = DUET_COLORS.slice(0);
    var colorIndex = player === 0 ? DUET_COLORS_0 : DUET_COLORS_1;

    for (i = 0; i < 25; i++) {
        var randomValue = Math.floor(Math.random() * colorsLeft.length);
        $("td").eq(i).removeClass();
        $("td").eq(i).addClass(colorIndex[colorsLeft[randomValue]]);
        colorsLeft.splice(randomValue, 1);
    }
};

var fetchCode = function() {
    code = document.getElementById("code").value.toUpperCase();
    if (code === "") {
        code = randomString();
        document.getElementById("code").placeholder = code;
    }
    return code;
}

var generateCodenames = function() {
    code = fetchCode();
    Math.seedrandom(code);
    assignNormalColors(code);
}

var generateDuet = function(player) {
    code = fetchCode();
    Math.seedrandom(code);
    assignDuetColors(player, code);
}
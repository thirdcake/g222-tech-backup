'use strict';
// ホーリーナンバー
const number = {
    a: 38,
    b: 41.5,
    c: 39.3,
    d: 40.1,
    e: 55.8,
    f: 39.4,
    g: 36.7,
    h: 65.7,
    i: 49,
    j: 50,
    k: 61.9,
    l: 7.8,
    m: 15,
}
// Canvas要素の取得
const canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d');

// 制御用
const config = {
    start: false,
    animationID: undefined,
    prevTimestamp: undefined,
    angle: 0,
}

// 点の位置
const pointsL = {
    rotate: 1,
    A0: { x: 112, y: 50 },
    M0: {},
    M1: {},
    B1: {},
    C1: {},
    D1: {},
    F1: {},
    H1: {},
},
    pointsR = {
        rotate: -1,
        A0: { x: 188, y: 50 },
        M0: {},
    };
pointsL.M0 = { x: pointsL.A0.x + number.a, y: pointsL.A0.y - number.l }
pointsR.M0 = { x: pointsR.A0.x - number.a, y: pointsR.A0.y - number.l };

//点Aと点Bの座標と辺AC,BCの長さから点Cを求める。
function triangle(pointA, pointB, AC, BC, rotate = 1) {
    const dx = pointB.x - pointA.x,
        dy = pointB.y - pointA.y,
        AB = Math.sqrt(dx ** 2 + dy ** 2);

    const cosA = (AB ** 2 + AC ** 2 - BC ** 2) / (2 * AC * AB),
        sinA = Math.sqrt(1 - cosA ** 2) * rotate;

    const pointC = {
        x: (cosA * dx - sinA * dy) * AC / AB + pointA.x,
        y: (sinA * dx + cosA * dy) * AC / AB + pointA.y,
    }
    return pointC;
}
// 機構を描画
function drawFrame(points, angle, color = 'red') {
    points.M1 = { x: points.M0.x + Math.cos(angle) * number.m, y: points.M0.y + Math.sin(angle) * number.m };
    points.B1 = triangle(points.M1, points.A0, number.j, number.b, points.rotate);
    points.C1 = triangle(points.A0, points.M1, number.c, number.k, points.rotate);
    points.D1 = triangle(points.B1, points.A0, number.e, number.d, points.rotate);
    points.F1 = triangle(points.D1, points.C1, number.f, number.g, points.rotate);
    points.H1 = triangle(points.F1, points.C1, number.h, number.i, points.rotate);

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(points.M0.x, points.M0.y);
    ctx.lineTo(points.M1.x, points.M1.y);
    ctx.lineTo(points.B1.x, points.B1.y);
    ctx.lineTo(points.A0.x, points.A0.y);
    ctx.lineTo(points.C1.x, points.C1.y);
    ctx.lineTo(points.M1.x, points.M1.y);
    ctx.moveTo(points.B1.x, points.B1.y);
    ctx.lineTo(points.D1.x, points.D1.y);
    ctx.lineTo(points.A0.x, points.A0.y);
    ctx.moveTo(points.D1.x, points.D1.y);
    ctx.lineTo(points.F1.x, points.F1.y);
    ctx.lineTo(points.C1.x, points.C1.y);
    ctx.lineTo(points.H1.x, points.H1.y);
    ctx.lineTo(points.F1.x, points.F1.y);
    ctx.closePath();
    ctx.stroke();
}
function drawCanvas(angle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(pointsL, angle, 'skyblue');
    drawFrame(pointsR, angle, 'skyblue');
    drawFrame(pointsL, angle - Math.PI, 'red');
    drawFrame(pointsR, angle - Math.PI, 'red');
}
function step(timestamp) {
    config.angle += (config.prevTimestamp - timestamp) / 500;
    config.angle %= 2 * Math.PI;
    drawCanvas(config.angle);
    config.prevTimestamp = timestamp;
    config.animationID = window.requestAnimationFrame(step);
}
function startStop() {
    if (config.start === false) {
        config.start = true;
        config.prevTimestamp = performance.now();
        step(performance.now());
    } else {
        cancelAnimationFrame(config.animationID);
        config.start = false;
    }
}
// 実行
drawCanvas(0);
document.getElementById('myButton').addEventListener('click', startStop, false);
var canvas = document.getElementById("jd__canvas");
var ctx = canvas.getContext("2d");
var _d = document.getElementById("jd__day");
var _m = document.getElementById("jd__mon");
var _y = document.getElementById("jd__year");
var _hr = document.getElementById("jd__hour");
var _mn = document.getElementById("jd__min");
var _sc = document.getElementById("jd__sec");

var color = "rgba(0,108,255,.9)",
    obj = [],
    maxBall = 250,
    maxRadius = 3,
    lineColor = "rgba(0,108,255,.4)";


function initClock(){
    var d = new Date().getDate(),
        m = new Date().getMonth(),
        y = new Date().getFullYear(),
        hr = new Date().getHours(),
        mn = new Date().getMinutes(),
        sc = new Date().getSeconds(),
        fullMonth = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    
    if(d < 10){d = '0' + d}else{d = d};
    if(hr < 10){hr = '0' + hr}else{hr = hr};
    if(mn < 10){mn = '0' + mn}else{mn = mn};
    if(sc < 10){sc = '0' + sc}else{sc = sc};
    
    _d.innerHTML = d;
    _m.innerHTML = fullMonth[m];
    _y.innerHTML = y;
    _hr.innerHTML = hr;
    _mn.innerHTML = mn;
    _sc.innerHTML = sc;
}

window.setInterval(initClock, 1000);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function Ball(x, y, radius, vx, vy){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    
    this.draw = function (){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    
    this.update = function (){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.vx = - this.vx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.vy = - this.vy;
        }
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.draw();
    }
}

function init(){
    for(var i = 0; i < maxBall; i++){
        var radius = Math.floor(1 + Math.random() * maxRadius),
            x = Math.random() * (innerWidth - radius * 2) - radius,
            y = Math.random() * (innerHeight - radius * 2) - radius,
            vx = (Math.random() - 0.5),
            vy = (Math.random() - 0.5);
        
        obj.push(new Ball(x, y, radius, vx, vy));
    }
    
}

function loop(){
    requestAnimationFrame(loop);
    
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for(var i in obj){
        var ball = obj[i];
        ball.update();
    }
    connect();
}

function connect(){
    for(var j = 0; j < obj.length; j++){
        for(var l = j; l < obj.length; l++){
            var dist = ((obj[j].x - obj[l].x) * (obj[j].x - obj[l].x)) + 
                ((obj[j].y - obj[l].y) * (obj[j].y - obj[l].y));
            if(dist < (innerWidth/15) * (innerHeight/15)){
                ctx.strokeStyle = lineColor;
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.moveTo(obj[j].x, obj[j].y);
                ctx.lineTo(obj[l].x, obj[l].y);
                ctx.stroke();
            }
        }
    }
}

init();
loop();

let data = {
   screen : {
    height:600,
    width:800,
    halfWidth: 400,
    halfHeight: 300,
    scale: 4
},
projection: {
    width: null,
    height: null,
    halfWidth: null,
    halfHeight: null
},
raycasting:{incrementAngle: 0},
player: {
    fov: 60,
    x: 2,
    y: 2,
    angle: 90,
    speed: {movement: 0.5,rotation: 5.0}
},
key:{up:"KeyW",down:"KeyS",left:"KeyA",right:"KeyD"},
map: [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,1,0,0,1],
    [1,0,0,1,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,1,1,1,0,0,1],
    [1,0,0,0,1,0,0,1,0,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1],
]
}
data.raycasting.incrementAngle = data.player.fov / data.screen.width;
const screen = document.createElement('canvas');
screen.width = data.screen.width;
screen.height = data.screen.height;
screen.style.border = "1px solid black";
document.body.appendChild(screen);
const screenContext = screen.getContext("2d");
function DegreeToRadian(degree) {
    return degree * Math.PI / 180;
}
function DrawLine(x1,y1,x2,y2,colorb){
    screenContext.strokeStyle=colorb;
    screenContext.beginPath();
    screenContext.moveTo(x1, y1);
    screenContext.lineTo(x2, y2);
    screenContext.stroke();
}
function raycasting(){
    let ra = 60;
    for(let rc=0;rc<data.screen.width;rc++){
        let r = {x:data.player.x,y:data.player.y}
        let rcos = Math.cos(DegreeToRadian(ra))/64;
        let rsin = Math.sin(DegreeToRadian(ra))/64;
        let w=0;
        while(w==0){
            r.x+=rcos;
            r.y+=rsin;
            w=data.map[Math.floor(r.x)][Math.floor(r.y)];
        }
    let d = Math.sqrt(Math.pow(data.player.x - r.x, 2) + Math.pow(data.player.y - r.y, 2));
    d = d * Math.cos(DegreeToRadian(ra - data.player.angle));
    let wh = Math.floor(data.screen.halfHeight/d);
    DrawLine(rc, 0, rc, data.screen.halfHeight - wh, "black");
    DrawLine(rc, data.screen.halfHeight - wh, rc, data.screen.halfHeight + wh, "crimson");
    DrawLine(rc, data.screen.halfHeight + wh, rc, data.screen.height, "goldenrod");
        ra+=3/40;
    }

}
function clearscreen(){screenContext.clearRect(0,0,data.screen.width,data.screen.height);}
main()
function main(){
    setInterval(function(){clearscreen();raycasting();},30)
}
document.addEventListener('keydown', (event) => {
    let keyCode = event.code;

    if(keyCode === data.key.up) {
        let playerCos = Math.cos(DegreeToRadian(data.player.angle)) * data.player.speed.movement;
        let playerSin = Math.sin(DegreeToRadian(data.player.angle)) * data.player.speed.movement;
        let newX = data.player.x + playerCos;
        let newY = data.player.y + playerSin;

        // Collision test
        if(data.map[Math.floor(newY)][Math.floor(newX)] == 0) {
            data.player.x = newX;
            data.player.y = newY;
        }
    } else if(keyCode === data.key.down) {
        let playerCos = Math.cos(DegreeToRadian(data.player.angle)) * data.player.speed.movement;
        let playerSin = Math.sin(DegreeToRadian(data.player.angle)) * data.player.speed.movement;
        let newX = data.player.x - playerCos;
        let newY = data.player.y - playerSin;

        // Collision test
        if(data.map[Math.floor(newY)][Math.floor(newX)] == 0) {
            data.player.x = newX;
            data.player.y = newY;
        }
    } else if(keyCode === data.key.left) {
        data.player.angle -= data.player.speed.rotation;
    } else if(keyCode === data.key.right) {
        data.player.angle += data.player.speed.rotation;
    } 
});

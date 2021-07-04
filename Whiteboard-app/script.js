    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth-60;
    canvas.height = 400;

    let context = canvas.getContext("2d");
    let background_color="white"
    context.fillStyle =background_color;
    context.fillRect(0,0 ,canvas.width, canvas.height);

    let draw_color = "black";
    let draw_width = "2";
    let is_drawing = false;

    let restore_array =[];
    let index =-1;

    function change_color(element){
        draw_color= element.style.background;
    }

    canvas.addEventListener("touchstart",start, false);
    canvas.addEventListener("touchmove",draw, false);
    canvas.addEventListener("mousedown",start, false);
    canvas.addEventListener("mousemove",draw, false);

    canvas.addEventListener("touchend",stop, false);
    canvas.addEventListener("mouseup",stop, false);
    canvas.addEventListener("mouseout",stop, false);

    function start(event){
        is_drawing =true;
    }

    function draw(event){
        if(is_drawing){
        ctx.strokeStyle = ctx.fillStyle = draw_color
        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
        ctx.lineWidth = radius*2
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop, radius, 0, Math.PI*2)
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        }
    }

    function stop(event){
        if(is_drawing){
            is_drawing = false
            ctx.beginPath()
        }
        event.preventDefault();
        
        if(event.type !='mouseout'){
            restore_array.push(context.getImageData(0,0 ,canvas.width, canvas.height));
            index+=1;
        }
    }
    
    function clear_canvas(){
        context.fillStyle=background_color;
        // context.clearRect(0,0 ,canvas.width, canvas.height);
        context.fillRect(0,0 ,canvas.width, canvas.height);
        restore_array=[];
        index=-1;
    }

    function undo_last(){
        if(index<=0){
            clear_canvas();
        }else{
            index-=1;
            restore_array.pop();
            context.putImageData(restore_array[index],0,0);
        }
    }
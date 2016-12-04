$(document).ready(function(){
     $(".header").css("display","none")
	list=$(".list")
	var add=$(".header .add");
	var add1=$(".header .icon.add1");
	var input=$(".header input")
	$(".zhezhao").css("display","none")
	add.css("display","none")
	input.css("display","none")
	var all=$(".footer .all")
	var del=$(".delete");
	all.css({"background":"deepskyblue","color":"white"})
	ul=$("#ul")
	ul.css("display","none")
	$(".gd").css("display","none")
	list.css("display","none")
	//初始化
	$(".main .yuan").on("touchend",function(){
		$(".main").css("display","none")
		$(".header").css("display","block")
		$(".footer").css("display","block")
		$("body").css("background","#eee")
		ul.css("display","block")
		list.css("display","block")
		if($("#ul li").length>0){
			$(".gd").css("display","none")
		}else{
			$(".gd").css("display","block")
		}
	})
	$(".return").on("touchend",function(){
		$(".main").css("display","block")
		$(".header").css("display","none")
		$(".footer").css("display","none")
		$("body").css("background","none")
		ul.css("display","none")
		$(".gd").css("display","none")
		list.css("display","none")
	})
	//进入页面
	
	
	add1.on("touchend",function(){
		
		$(".zhezhao").css("display","block")
		add.css("display","block");
	   input.css("display","block")
	   
	})
	add.on("touchend",function(){
		$(".zhezhao").css("display","none")
		$(this).css("display","none")
		input.css("display","none")
		if($("#ul li").length>0){
			$(".gd").css("display","none")
		}else{
			$(".gd").css("display","block")
		}
		
		
	})
	//list
	var clear1=$("#clear")
	clear1.css("display","none")
	
	
	list.on("touchend",function(){
		clear1.css("display","block")
	})
//	$(body).on("touchend","list",function(){
// 	
// })
	
	var pos;
	var nodes=[];
	$("#ul").on("touchstart","li",function(e){
    	 pos=e.originalEvent.changedTouches[0].clientX
    })
    
    $("#ul").on("touchend","li",function(e){
    	 var y=e.originalEvent.changedTouches[0].clientX
    	 var index=$(this).index()
    	 if(y-pos<=-30){
    	 	$(this).addClass("done")
    	 	nodes[$(this).index()].state=1;
    	 	localStorage.nodes=JSON.stringify(nodes);
    	 	$(".delete").eq(index).addClass("move")
    	 }
    	 if(y-pos>=30){
    	 	$(this).removeClass("done")
    	 	nodes[$(this).index()].state=0;
    	 	localStorage.nodes=JSON.stringify(nodes)
    	 	$(".delete").removeClass("move")
    	 }
    })
	
	if(localStorage.nodes){
		nodes=[]
		nodes=JSON.parse(localStorage.nodes);
		move();
		
	}
	
	add.on("touchend",function(){
		
		var v=input.val()
		if(!v){
			return
		}
		input.val("")
		var node={
			name:v,
			state:0
		}
		
		nodes.push(node)
		localStorage.nodes=JSON.stringify(nodes);
		$('<li><div class="content"><span></span>'+node.name+'</div><div class="delete">删除</div></li>').appendTo($("#ul"))
	   
	})
	function move(){
		for(i=0;i<nodes.length;i++){
			var done=(nodes[i].state===1)?"done":"";
			$('<li class="'+done+'"><div class="content"><span></span>'+nodes[i].name+'</div><div class="delete">删除</div></li>').appendTo($("#ul"))
		}
	}

  $(".footer").on("touchend",".all",function(){
  	$("li").show()
  	$(".footer div").css({"background":"white","color":"deepskyblue"})
  	$(this).css({"background":"deepskyblue","color":"white"})
  	
  })
   $(".footer").on("touchend",".yiwc",function(){
  	$("li").hide()
  	$(".done").show()
  	$(".footer div").css({"background":"white","color":"deepskyblue"})
  	$(this).css({"background":"deepskyblue","color":"white"})
  })
   $(".footer").on("touchend",".weiwc",function(){
  	$("li").show()
  	$(".done").hide()
  	$(".footer div").css({"background":"white","color":"deepskyblue"})
  	$(this).css({"background":"deepskyblue","color":"white"})
  })
   
   $("#ul").on("touchend",".delete",function(){
   	  var dli=$(this).closest("li")
		dli.remove();
		var num=$(this).index()
		nodes.splice(num,1);
		localStorage.nodes=JSON.stringify(nodes);
		if($("#ul li").length>0){
			$(".gd").css("display","none")
		}else{
			$(".gd").css("display","block")
		}
   })
   //清除
   
   $(".clear").on("touchend",function(){
    	
   	 $(".done").remove()
   	 var newarr1=[];
		for(var i=0;i<nodes.length;i++){
			if(nodes[i].state ==0){
				newarr1.push(nodes[i])
			}
			nodes=newarr1;
		}
		localStorage.nodes=JSON.stringify(nodes);
		if($("#ul li").length>0){
			$(".gd").css("display","none")
		}else{
			$(".gd").css("display","block")
		}
		return false;
   })
   $("#clear div").on("touchend",function(){
   	$("#clear div").css({"color":"#333"})
   	$(this).css({"color":"deepskyblue"})
   })
   
})

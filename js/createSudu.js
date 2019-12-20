 function Sudu(){
	this.blockData = [];
	this.init = function(black){
		this.clearSudu();
		this.creatSudu();
		this.addBlack(black);
		return  this.blockData;
	}
	this.clearSudu = function(){
	 	for(var i=0;i<9;i++){
	 		this.blockData[i] = [0,0,0,0,0,0,0,0,0];
	 	} 
	 	
	}
	this.creatBlock = function(a,b){
	 	var arr = [1,2,3,4,5,6,7,8,9];
	 	var temp = arr.sort(this.random);
	 	var flag = 0;
	 	for(var i=a;i<a+3;i++){
	 		for(var j=b;j<b+3;j++){
	 			this.blockData[i][j] = temp[flag];
	 			flag ++;
	 		}
	 	}
	}
	this.addBlack = function(num){
		num = Number(num);
		var x = 0,
			y = 0,
			block=0,
			blackArr = [];
			
		for(var i=0;i<num;i++){
			do{
				x = this.randomNum()-1;
				y = this.randomNum()-1;
			    block =Math.floor(x/3)*3+ Math.floor(y/3);
				var flag = 0;
			}while(blackArr.some(function(data){
				if(data.block == block){
					flag ++;
					if(flag>Math.ceil(num/9)-1){
						return true;
					}
				}
				return data.x == x && data.y == y;
			}) )
			
			blackArr[i] = {
				x,y,block
			}
		}
		for(var i=0;i<num;i++){
			var z = blackArr[i]["x"],
			    w = blackArr[i]["y"];
			this.blockData[z][w] = "0";
		}
		return true;
	}
	this.randomNum = function(){
	 	return Math.floor(Math.random()*9) + 1;
	}
	this.random = function(){
	 	var temp = Math.random();
	 	if(temp >.5){
	 		return -1
	 	}else{
	 		return 1
	 	}
	}
	this.compareX = function(i,val){
		for(var k = 0; k < 9; k++) {
			if(val === this.blockData[i][k]) {
				return true;
			}
		}
		return false;
	}
	this.compareY = function(j, val){
		for(var k = 0; k < 9; k++) {
			if(val === this.blockData[k][j]) {
				return true;
			}
		}
		return false;
	}
	this.compareTH = function(i, j, val) {
		var x = Math.floor(i / 3);
		var y = Math.floor(j / 3);
		for(var k = x * 3; k < x * 3 + 3; k++) {
			for(var h = y * 3; h < y * 3 + 3; h++) {
				if(val === this.blockData[k][h]) {
					return true;
				}
			}
		}
		return false;
	}
	this.creatSudu = function(){
		var arr = [1,2,3,4,5,6,7,8,9];
		this.creatBlock(0,0);
		this.creatBlock(3,3);
		this.creatBlock(6,6);
		for(var i=0;i<9;i++){
			for( var j=0;j<9;j++){
				if(this.blockData[i][j] == 0){
					var temp = arr.sort(this.random);
					var flag = 0;
					
					while(this.compareX(i,temp[flag]) || this.compareY(j,temp[flag]) || this.compareTH(i,j,temp[flag])){
						flag++;
						if(flag == 9){
							break;
						}
					}
					if(flag<9){
						this.blockData[i][j] = temp[flag];
					}else if(flag == 9){
						this.clearSudu();
						this.creatSudu();
						return;
					}
				}
			}
		}
		
	}
}
 const quickSort = (array) => {
	 const sort = (arr,left=0,right=arr.length-1)=>{
		if(left>=right){
			return;
		}
	 	let i=left;
	 	let j=right;
	 	const baseVal = arr[j];
	 	while(i<j){
	 		while(i<j && arr[i]<=baseVal){
	 			i++;
	 		}
	 		arr[j] = arr[i];
	 		while(j>i && arr[j] >= baseVal){
	 			j--
	 		}
	 		arr[i] = arr[j];
	 	}
	 	arr[j] = baseVal;
	 	sort(arr,left,j-1);
	 	sort(arr,j+1,right);
	 }
	 const newArr = array.concat();
	 sort(newArr)
	 return newArr;
 }





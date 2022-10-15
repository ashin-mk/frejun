module.exports=function modify(data){
data=data.split(" ")
    let output=[]
    for(let i=0;i<data.length;i++){
        
        
      if(data[i].charAt(0)==="a" || data[i].charAt(0)==="A"){
        output.push(data[i])
        let j=0
        let letters= data[i].split("")
        while(j<letters.length){
            if(letters[j]<65 && letters[j]>122 ){ 
                j++
                break
            }else{
                j++
            }
        }
        j--
        let k=j-3
        while(j>=0 && j>k){
letters[j]="*"
j--
        }
        letters=letters.join("")
        data[i]=letters
      }
     
    }
   data=data.join(" ")
    // console.log(output)
    return [output,data]
}
export  function calculate(mails,incTime){
    let prev=[];
    let future=[];
    let time=0;
    let date;
    let counter=0;
    mails.map((mail)=>{
       if(typeof(mail.createdAt)!=="undefined"){
        date=new Date(mail.createdAt);
        while(counter<6){
        let newMail=Object.assign({},mail);
        date.setSeconds(date.getSeconds()+time);
        newMail.time=time;
        if(typeof(date)!=="undefined"){
            if(new Date().toISOString()>=date.toISOString()){
                prev.push(newMail);
            }
            else{
                future.push(newMail);
            }
        }
        time+=incTime;
        counter++;
    }
       }
    })
    console.log("prev mails",prev);
    console.log("future mails",future);
    return{
        prev,future
    }
}
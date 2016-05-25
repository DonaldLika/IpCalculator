var module=angular.module('myApp',[]);
 module.controller('myctr', ['$scope', function($scope)
 {
     $scope.changeip=function()
     {
        var pat= /^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)$/;
         $scope.shw=pat.test($scope.ip);
         if(!$scope.shw)
         {
           $scope.ErrorIp="Ip-ja e Futur nuk eshte e sakte";
         }
         else
         {
           $scope.ErroIp="";
         }
         if($scope.shw==$scope.net==true)
         {
           $scope.ok=true;
         }
         else
          {
           $scope.ok=false;
         }

     }
     $scope.changesubnet=function()
     {
       if($scope.netmask<1 || $scope.netmask>32)
       {
         $scope.errorS="NetMaska e futur eshte e gabuar";
         $scope.net=false;
       }
       else
       {
             $scope.errorS="";
             $scope.net=true;
       }
       if($scope.shw==$scope.net==true)
       {
         $scope.ok=true;
       }
       else
        {
         $scope.ok=false;
       }
     }

     function decTobin(number)
     {
         var result = Math.floor(number / 2);
       var mod = String(number % 2);

       while(result != 0){
         mod = String(result % 2)+mod
         result = Math.floor(result / 2);
       }

       while(mod.length != 8){
         mod = "0"+mod
       }

       return mod;
     }

     function binTodec(binary){   //Binar to decimal

      //reverse binay string
      binary = binary.split("").reverse().join("");
      decimal = 0;

      for(i=0;i<binary.length;i++)
      {
        if(binary[i] == 1)
        {
          decimal = decimal + Math.pow(2,i)
        }
      }

      return decimal;
    }


    function dottedDecToBin()    //DECIMAL ME PIKE TO BINAR
    {
      dottedArray = $scope.ip.split(".");
      finalres = "";
      for (var i = 0; i < dottedArray.length; i++) {
        if(i < dottedArray.length -1){
          finalres = finalres+decTobin(dottedArray[i])+".";
        }else{
          finalres = finalres+decTobin(dottedArray[i]);
        }
      }
    return finalres;
    }

 function dottedBinToDe(binary)
 {  //bINAR ME PIKE TO DECIMAL

     dottedArray =binary.split(".");
     finalres = "";
     for (var i = 0; i < dottedArray.length; i++) {
       if(i < dottedArray.length -1){
         finalres = finalres+binTodec(dottedArray[i])+".";
       }else{
         finalres = finalres+binTodec(dottedArray[i]);
       }
     }

     return finalres;
   }

 function netmaskbin()   //netMask
   {
     var valuedOne=$scope.netmask;
     var netmaskbin = "";
      var i=0;
     while(netmaskbin.length < 34)
     {
        i++;
       if(valuedOne > 0){
         netmaskbin = netmaskbin+"1"
       }else{
         netmaskbin = netmaskbin+"0"
       }
       valuedOne = valuedOne -1;
       if(i>0 && i%8==0)
       {
         netmaskbin=netmaskbin+".";
       }
     }

     $scope.netm=dottedBinToDe(netmaskbin)+"  => "+netmaskbin;
   }

 function getBroadcast(){  //BROADCAST ADRESS
  var broadcast = "";
  var netbinary=dottedDecToBin().replace(/\./g,'');
  var netmask=$scope.netmask;
  for(i=0;i<netbinary.length;i++)
  {
    if(i>0 && i%8==0)
    {
      broadcast=broadcast+".";
    }
    if(i < (32-(32-netmask))){
      broadcast = broadcast+netbinary[i];
    }else{
      broadcast = broadcast+"1";
    }
  }

  $scope.broadcast=dottedBinToDe(broadcast)+"  => "+broadcast;
}



function getFirstHost()
{  //HOSTI I PARE
  var firsthost = "";
  var netbinary=dottedDecToBin().replace(/\./g,'');
  var netmask=$scope.netmask;
  for(i=0;i<netbinary.length;i++)
  {
    if(i>0 && i%8==0)
    {
      firsthost=firsthost+".";
    }
    if(i < (32-(32-netmask))){
      firsthost = firsthost+netbinary[i];
    }else{
      if(i == netbinary.length-1){
        firsthost = firsthost+"1";
      }else{
        firsthost = firsthost+"0";
      }
    }
  }
  $scope.firsthost=dottedBinToDe(firsthost)+"  => "+firsthost;
}

  function getLastHost(){  //HOSTI I FUNDIT
    var lasthost = "";
    var netbinary="11000000101010000000000100000001";
    var netmask=21;
    for(i=0;i<netbinary.length;i++)
    {
      if(i>0 && i%8==0)
      {
        lasthost=lasthost+".";
      }
                  if(i < (32-(32-netmask))){
          lasthost = lasthost+netbinary[i];
        }else{
          if(i == netbinary.length-1){
            lasthost = lasthost+"0";
          }else{
            lasthost = lasthost+"1";
          }
        }
      }
      $scope.lasthost=dottedBinToDe(lasthost)+"  => "+lasthost;
  }

function checkNetClass()  //klasa e ip-se
{
  var netbin=dottedDecToBin().replace(/\./g,'');
  var a;
      if(netbin.charAt(0) == '0'){
      //networks belongs to class A
      a="A";
    }
    else
    {
      if(netbin.charAt(1) == '0'){
        //networks belongs to class B
       a="B";
      }
      else
      {
        if(netbin.charAt(2) == '0'){
          //networks belongs to class C
          a="C";
        }
        else{
          if(netbin.charAt(3) == '0'){
            //networks belongs to class B
            a="D";
          }
          else{
            //networks belongs to class E
           a="E";
          }
        }
      }
    }
    $scope.clas=a;
}

     $scope.afishim=function()
     {
       $scope.af=true;
       $scope.hosts=Math.pow(2,(32-$scope.netmask)) - 2;
       getBroadcast();
       getFirstHost();
       getLastHost();
       checkNetClass();
       netmaskbin(21);
     }

 }]);

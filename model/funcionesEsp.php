<?php

    class funcionesEsp{
        public $numordinales = [1=>"Primera",2=>"Segunda",3=>"Tercera",4=>"Cuarta",5=>"Quinta",6=>"Sexta",7=>"Séptima",8=>"Octava",9=>"Novena",10=>"Décima",11=>"Décima primera",12=>"Duoécima",13=>"Décima tercera",14=>"Décima cuarta",15=>"Décima quinta",16=>"Décima sexta",17=>"Décima séptima",18=>"Décima octava",19=>"Décima novena",
        20=>"Vigésima",21=>"Vigésima primera",22=>"Vigésima segunda",23=>"Vigésima tercera",24=>"Vigésima cuarta",25=>"Vigésima quinta",26=>"Vigésima sexta",27=>"Vigésima séptima",28=>"Vigésima octava",29=>"Vigésima novena",30=>"Trigésima",31=>"Trigésima primera",32=>"Trigésima segunda",33=>"Trigésima tercera",
        34=>"Trigésima cuarta",35=>"Trigésima quinta",36=>"Trigésima sexta",37=>"Trigésima séptima",38=>"Trigésima octava",39=>"Trigésima novena",40=>"Cuadragésima",41=>"Cuadragésima primera",42=>"Cuadragésima segunda",43=>"Cuadragésima tercera",44=>"Cuadragésima cuarta",45=>"Cuadragésima quinta",
        46=>"Cuadragésima sexta",47=>"Cuadragésima séptima",48=>"Cuadragésima octava",49=>"Cuadragésima novena",50=>"Quincuagésima",51=>"Quincuagésima primera",52=>"Quincuagésima segunda",53=>"Quincuagésima tercera",54=>"Quincuagésima cuarta",55=>"Quincuagésima quinta",56=>"Quincuagésima sexta",
        57=>"Quincuagésima séptima",58=>"Quincuagésima octava",59=>"Quincuagésima novena",60=>"Sexagésima",61=>"Sexagésima primera",62=>"Sexagésima segunda",63=>"Sexagésima tercera",64=>"Sexagésima cuarta",65=>"Sexagésima quinta",66=>"Sexagésima sexta",67=>"Sexagésima séptima",68=>"Sexagésima octava",
        69=>"Sexagésima novena",70=>"Septuagésima",71=>"Septuagésima primera",72=>"Septuagésima segunda",73=>"Septuagésima tercera",74=>"Septuagésima cuarta",75=>"Septuagésima quinta"];

        public function numordinales($numentrega){
            $numordinalEntrega = $this->numordinales[$numentrega[0]];
            return $numordinalEntrega; 
        }
    }
    

?>
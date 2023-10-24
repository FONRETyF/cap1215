<?php

    class formularioTram 
    {

        public function validaVigencia($fechBajaMae,$fechRecibido){
            $diasValid = $this->calculaDifFechas($fechBajaMae,$fechRecibido);      
            return $diasValid;
        }

        public function calculaDifFechas($fechIni,$fechFin){
            $FechaI = date_create($fechIni);
            $FechaF = date_create($fechFin);
            $difFechas = date_diff($FechaI,$FechaF);
            return $difFechas->format("%a");
        }

        public function validaFchFallIniJuic($fechaFallec,$fechaIniJuicio){
            $diasValid = $this->validaVigencia($fechaFallec,$fechaIniJuicio);
            
            return $diasValid;
        }
    
    }
    

 
?>